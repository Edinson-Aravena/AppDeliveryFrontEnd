import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Order } from '../../domain/entities/Order';
import { OrderProvider } from '../context/OrderContext';

import { DeliveryOrderDetailScreen } from '../screens/delivery/order/detail/OrderDetail';
import { DeliveryOrderListScreen } from '../screens/delivery/order/list/OrderList';


export type DeliveryOrderStackParamList = {
    DeliveryOrderListScreen: undefined;
    DeliveryOrderDetailScreen: { order: Order };
}
const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>();

export const DeliveryOrderStackNavigator = () => {
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
                    name="DeliveryOrderListScreen"
                    component={DeliveryOrderListScreen}
                />
                <Stack.Screen
                    name="DeliveryOrderDetailScreen"
                    component={DeliveryOrderDetailScreen}
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