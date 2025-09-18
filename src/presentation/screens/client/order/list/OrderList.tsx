import React, { useEffect } from 'react'
import { View, useWindowDimensions, Text, Platform, StatusBar,  FlatList } from 'react-native'
import useViewModel from './ViewModel'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { globalColors } from '../../../../theme/GlobalTheme';
import { OrdenListItem } from './Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';

interface Props {
    status: string;
}

const OrderListView = ({ status }: Props) => {

    const { getOrders, ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, user} = useViewModel();

    const navigation = useNavigation<StackNavigationProp<ClientOrderStackParamList, 'ClientOrderListScreen'>>();

    useEffect(() => {
        getOrders(user?.id!, status);
    }, [user]);

    return (
        <View>
            <FlatList
                data={
                    status === 'PAGADO' 
                    ? ordersDispatched 
                    : status === 'DESPACHADO' 
                    ? ordersDispatched 
                    : status === 'EN CAMINO' 
                    ? ordersOnTheWay
                    : status === 'ENTREGADO'
                    ? ordersDelivery
                    : []
                }
                keyExtractor={(item) => item.id!.toString()}
                renderItem={({ item }) => <OrdenListItem order={item} navigation={navigation}/>}
            />
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

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'PAGADO' },
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

