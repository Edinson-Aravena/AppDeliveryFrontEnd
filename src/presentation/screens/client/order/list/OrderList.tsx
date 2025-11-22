import React, { useContext } from 'react'
import { View, useWindowDimensions, Text, Platform, StatusBar,  FlatList, StyleSheet } from 'react-native'
import useViewModel from './ViewModel'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { globalColors } from '../../../../theme/GlobalTheme';
import { OrdenListItem } from './Item';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';
import { useCallback } from 'react';
import { OrderContext } from '../../../../context/OrderContext';
import { UserContext } from '../../../../context/UserContext';
import { IconComponent } from '../../../../components';

interface Props {
    status: string;
}

// Componente de estado vacío
const EmptyState = ({ status }: { status: string }) => {
    const messages = {
        'PAGADO': {
            icon: 'checkmark-circle-outline',
            title: 'No tienes pedidos pagados',
            message: 'Tus pedidos pagados aparecerán aquí'
        },
        'DESPACHADO': {
            icon: 'cube-outline',
            title: 'No tienes pedidos despachados',
            message: 'Cuando tu pedido sea despachado, aparecerá aquí'
        },
        'EN CAMINO': {
            icon: 'bicycle-outline',
            title: 'No tienes pedidos en camino',
            message: 'Los pedidos que están siendo entregados aparecerán aquí'
        },
        'ENTREGADO': {
            icon: 'checkmark-done-circle-outline',
            title: 'No tienes pedidos entregados',
            message: 'El historial de tus pedidos entregados aparecerá aquí'
        }
    };

    const content = messages[status as keyof typeof messages] || messages['PAGADO'];

    return (
        <View style={styles.emptyContainer}>
            <IconComponent icon={content.icon} size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>{content.title}</Text>
            <Text style={styles.emptyMessage}>{content.message}</Text>
        </View>
    );
};

const OrderListView = ({ status }: Props) => {

    const { getOrders, ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, user} = useViewModel();

    const navigation = useNavigation<StackNavigationProp<ClientOrderStackParamList, 'ClientOrderListScreen'>>();

    // Recargar pedidos cuando la pantalla recibe el foco
    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                getOrders(user.id, status);
            }
        }, [user?.id, status, getOrders])
    );

    const data = 
        status === 'PAGADO' 
        ? ordersPayed 
        : status === 'DESPACHADO' 
        ? ordersDispatched 
        : status === 'EN CAMINO' 
        ? ordersOnTheWay
        : status === 'ENTREGADO'
        ? ordersDelivery
        : [];

    return (
        <View style={{ flex: 1 }}>
            {data.length === 0 ? (
                <EmptyState status={status} />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id!.toString()}
                    renderItem={({ item }) => <OrdenListItem order={item} navigation={navigation}/>}
                />
            )}
        </View>
    )
}


const renderScene = ({ route }: any) => {
    switch (route.key) {
        case 'first':
            return <OrderListView status="PAGADO" />;
        case 'second':
            return <OrderListView status="DESPACHADO" />;
        case 'third':
            return <OrderListView status="EN CAMINO" />;
        case 'fourth':
            return <OrderListView status="ENTREGADO" />;
        default:
            return <OrderListView status="DESPACHADO" />;
    }
}

export const ClientOrderListScreen = () => {
    const layout = useWindowDimensions();
    const { getOrdersByClientAndStatus } = useContext(OrderContext);
    const { user } = useContext(UserContext);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'PAGADO' },
        { key: 'second', title: 'DESPACHADO' },
        { key: 'third', title: 'EN CAMINO' },
        { key: 'fourth', title: 'ENTREGADO' },
    ]);

    // Recargar todos los pedidos cuando la pantalla recibe el foco
    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                // Recargar todos los estados de pedidos
                getOrdersByClientAndStatus(user.id, 'PAGADO');
                getOrdersByClientAndStatus(user.id, 'DESPACHADO');
                getOrdersByClientAndStatus(user.id, 'EN CAMINO');
                getOrdersByClientAndStatus(user.id, 'ENTREGADO');
            }
        }, [user?.id, getOrdersByClientAndStatus])
    );

    return (
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: globalColors.buttons }}
                        indicatorStyle={{ backgroundColor: '#fff', height: 3 }}
                        scrollEnabled={true}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
        lineHeight: 20,
    },
});

