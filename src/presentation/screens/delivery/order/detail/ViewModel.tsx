import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entities/Order'
import { User } from '../../../../../domain/entities/User';
import { OrderContext } from '../../../../context/OrderContext';


interface DropDownProps {
    label: string;
    value: string;
}

const RestauranteDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0);
    const [deliveryMen, setDeliveryMen] = useState<User[]>([]);
    const [responseMessage, setResponseMessage] = useState('')

    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<DropDownProps[]>([]);
    const { updateToOnTheWay } = useContext(OrderContext);

    const updateToOnTheWayOrder = async () => {
        const result = await updateToOnTheWay(order);
        setResponseMessage(result.message!);
    }

    const getTotal = () => {
        let total = 0;
        order.products.forEach(product => {
            setTotal(product.price * product.quantity!)
        });
    }

    return {
        total,
        deliveryMen,
        value,
        open,
        items,
        responseMessage,
        setResponseMessage,
        setOpen,
        setValue,
        setItems,
        getTotal,
        updateToOnTheWayOrder
    }

}

export default RestauranteDetailViewModel;