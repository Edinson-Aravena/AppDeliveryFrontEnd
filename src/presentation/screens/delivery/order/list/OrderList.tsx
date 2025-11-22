import React, { useEffect } from 'react'
import { View, useWindowDimensions, Text, Platform, StatusBar,  FlatList, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useViewModel from './ViewModel'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { globalColors } from '../../../../theme/GlobalTheme';
import { OrdenListItem } from './Item';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator';
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator';

interface Props {
    status: string;
}

const EmptyState = ({ status }: { status: string }) => {
    const getEmptyStateContent = () => {
        switch (status) {
            case 'DESPACHADO':
                return {
                    icon: 'cube-outline' as const,
                    title: 'No hay pedidos despachados',
                    message: 'Aquí aparecerán los pedidos listos para recoger y entregar'
                };
            case 'EN CAMINO':
                return {
                    icon: 'bicycle-outline' as const,
                    title: 'No tienes entregas en camino',
                    message: 'Los pedidos que estés entregando aparecerán aquí'
                };
            case 'ENTREGADO':
                return {
                    icon: 'checkmark-done-circle-outline' as const,
                    title: 'No tienes pedidos entregados',
                    message: 'Aquí verás el historial de tus entregas completadas'
                };
            default:
                return {
                    icon: 'albums-outline' as const,
                    title: 'No hay pedidos',
                    message: 'Aún no tienes pedidos en esta categoría'
                };
        }
    };

    const content = getEmptyStateContent();

    return (
        <View style={styles.emptyContainer}>
            <Ionicons name={content.icon} size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>{content.title}</Text>
            <Text style={styles.emptyMessage}>{content.message}</Text>
        </View>
    );
};

const OrderListView = ({ status }: Props) => {

    const { getOrders, ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, user} = useViewModel();

    const navigation = useNavigation<StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen'>>();

    useEffect(() => {
        if (user?.id) {
            getOrders(user.id, status);
        }
    }, [user]);

    // Actualizar la lista cada vez que la pantalla se enfoca
    useFocusEffect(
        React.useCallback(() => {
            if (user?.id) {
                getOrders(user.id, status);
            }
        }, [user, status])
    );

    const data = 
        status === 'DESPACHADO' 
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

export const DeliveryOrderListScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'second', title: 'DESPACHADO' },
        { key: 'third', title: 'EN CAMINO' },
        { key: 'fourth', title: 'ENTREGADO' },
    ]);

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
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

