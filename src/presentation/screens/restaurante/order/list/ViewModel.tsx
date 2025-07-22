import React, { useState } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../domain/useCases/order/GetByStatusOrder';
import { Order } from '../../../../../domain/entities/Order';

const RestaurantOrderListViewModel = () => {

    const [orders, setOrders] = useState<Order[]>([])
    
    const getOrders = async (status: string) => {
        const result = await GetByStatusOrderUseCase(status);
        setOrders(result);
        console.log('Ordenes obtenidas:', JSON.stringify(result, null, 2));
    }

    return {
        getOrders,
        orders
    }
}

export default RestaurantOrderListViewModel;