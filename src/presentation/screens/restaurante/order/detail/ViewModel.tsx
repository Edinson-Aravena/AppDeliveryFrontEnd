import React, { useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entities/Order'
import {GetDeliveryMenUserUseCase } from '../../../../../domain/useCases/user/GetDeliveryMenUser'
import { User } from '../../../../../domain/entities/User';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface DropDownProps{
    label: string;
    value: string;
}

const RestauranteDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0);
    const [deliveryMen, setDeliveryMen] = useState<User[]>([]);

    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<DropDownProps[]>([]);
    
    useEffect(() => {
        setDropDownItems();
    }, [deliveryMen]);

    const distpatchOrder = () => {
        console.log('Repartir pedido a: ' + value);
    }

    const setDropDownItems = () => {
        let itemsDeliveryMen: DropDownProps[] = [];
        deliveryMen.forEach(delivery => {
            itemsDeliveryMen.push({
                label: delivery.name + ' ' + delivery.lastname,
                value: delivery.id!
            });
        });
        setItems(itemsDeliveryMen);
    }

    const getDeliveryMen = async () => {
        const result = await GetDeliveryMenUserUseCase();
        console.log(JSON.stringify(result, null, 3));
        setDeliveryMen(result);
    }

    const getTotal = () => {
        let total = 0;
        order.products.forEach(product => {
            setTotal(product.price * product.quantity!)
        });
    }

    return {
        total,
        getTotal,
        deliveryMen,
        getDeliveryMen,
        value,
        open,
        items,
        setOpen,
        setValue,
        setItems,
        distpatchOrder,
    }

}

export default RestauranteDetailViewModel;