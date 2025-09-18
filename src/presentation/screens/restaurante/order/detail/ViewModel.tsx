import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entities/Order'
import { GetDeliveryMenUserUseCase } from '../../../../../domain/useCases/user/GetDeliveryMenUser'
import { User } from '../../../../../domain/entities/User';
import { UpdateToDispatchedUseCase } from '../../../../../domain/useCases/order/UpdateToDispatched';
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
    const { updateToDispatched } = useContext(OrderContext);

    useEffect(() => {
        setDropDownItems();
    }, [deliveryMen]);

    const distpatchOrder = async () => {

        if (value !== null) {
            const orderToUpdate = {
                ...order,
                id_delivery: value!
            };
            const result = await updateToDispatched(orderToUpdate);
            setResponseMessage(result.message!);
        } else {
            setResponseMessage('Selecciona un repartidor');
        }

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
        deliveryMen,
        value,
        open,
        items,
        responseMessage,
        setResponseMessage,
        setOpen,
        setValue,
        setItems,
        distpatchOrder,
        getDeliveryMen,
        getTotal,
    }

}

export default RestauranteDetailViewModel;