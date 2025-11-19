import React, { useContext, useEffect, useState } from 'react'
import { Address } from '../../../../../domain/entities/Address';
import { GetByUserAddressUseCase } from '../../../../../domain/useCases/address/GetByUserAddress';
import { DeleteAddressUseCase } from '../../../../../domain/useCases/address/DeleteAddress';
import { UserContext } from '../../../../context/UserContext';
import { CreateOrderUseCase } from '../../../../../domain/useCases/order/CreateOrder';
import { Order } from '../../../../../domain/entities/Order';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';


const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>([])
    const { user, saveUserSession, getUserSession } = useContext(UserContext);
    const {shoppingBag} = useContext(ShoppingBagContext)
    const [checked, setchecked] = useState('');
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        getAddress();
        if (user.address !==null && user.address !== undefined){
            changeRadioValue(user.address!)
            console.log("Usuario de sesion : ", JSON.stringify(user));
        }   
    }, [user])

    const createOrder = async () => {

        const order: Order = {
            id_client: user.id!,
            id_address: user.address?.id!,
            products: shoppingBag
        }
        const result = await CreateOrderUseCase(order);

        setResponseMessage(result.message);
        
    }
    
    const changeRadioValue = (address: Address) => {
        setchecked(address.id!);
        user.address = address;
        saveUserSession(user);
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!);
        setAddress(result);
    }

    const deleteAddress = async (id: string) => {
        const result = await DeleteAddressUseCase(id);
        setResponseMessage(result.message);
        
        // Si la dirección eliminada era la seleccionada, limpiar la selección
        if (checked === id) {
            setchecked('');
            user.address = undefined;
            saveUserSession(user);
        }
        
        // Recargar la lista de direcciones
        await getAddress();
    }

    return{
        address,
        checked,
        responseMessage,
        createOrder,
        getAddress,
        changeRadioValue,
        deleteAddress
    }
}

export default ClientAddressListViewModel;
