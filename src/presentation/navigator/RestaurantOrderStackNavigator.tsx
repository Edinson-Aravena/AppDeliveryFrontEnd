import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/orderList';
import { RestauranteOrderDetailScreen } from '../screens/restaurante/order/detail/OrderDetail';
import { Order } from '../../domain/entities/Order';
import { OrderProvider } from '../context/OrderContext';


export type RestaurantOrderStackParamList = {
    RestaurantOrderListScreen: undefined;
    RestauranteOrderDetailScreen: { order: Order };
}
const Stack = createNativeStackNavigator<RestaurantOrderStackParamList>();

export const RestaurantOrderStackNavigator = () => {
    return (
        <OrderStatus>
            <Stack.Navigator
                screenOptions={
                    {
                        headerShown: false,
                    }
                }
            >
                <Stack.Screen
                    name="RestaurantOrderListScreen"
                    component={RestaurantOrderListScreen}
                />
                <Stack.Screen
                    name="RestauranteOrderDetailScreen"
                    component={RestauranteOrderDetailScreen}
                    options={{
                        headerShown: true,
                        title: 'Detalle de la orden',
                    }}
                />
            </Stack.Navigator>
        </OrderStatus>
    )
}


const OrderStatus = ({ children }: any) => {
    return (
        <OrderProvider>
            {children}
        </OrderProvider>
    )
}