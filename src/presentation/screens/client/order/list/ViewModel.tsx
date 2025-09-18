import React, { useContext, useState } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../domain/useCases/order/GetByStatusOrder';
import { Order } from '../../../../../domain/entities/Order';
import { OrderContext } from '../../../../context/OrderContext';
import { UserContext } from '../../../../context/UserContext';

const ClientOrderListViewModel = () => {

    //const [orders, setOrders] = useState<Order[]>([])
    const {ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByClientAndStatus} = useContext(OrderContext);
    const {user} = useContext(UserContext);

    const getOrders = async (idDelivery: string, status: string) => {
        const result = await getOrdersByClientAndStatus(idDelivery, status);
        //setOrders(result);
        console.log('Ordenes obtenidas:', JSON.stringify(result, null, 2));
    }

    return {
        getOrders,
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        user
    }
}

export default ClientOrderListViewModel;