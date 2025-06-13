import React, { useContext, useEffect, useState } from 'react'
import { Address } from '../../../../../domain/entities/Address';
import { GetByUserAddressUseCase } from '../../../../../domain/useCases/address/GetByUserAddress';
import { UserContext } from '../../../../context/UserContext';



const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>([])
    const { user, saveUserSession, getUserSession } = useContext(UserContext);
    const [checked, setchecked] = useState('')

    useEffect(() => {
        getAddress();
        if (user.address !==null && user.address !== undefined){
            changeRadioValue(user.address!)
            console.log("User in Address List ViewModel: ", user);
        }   
    }, [user])
    
    const changeRadioValue = (address: Address) => {
        setchecked(address.id!);
        user.address = address;
        saveUserSession(user);
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!);
        setAddress(result);
    }

    return{
        address,
        checked,
        getAddress,
        changeRadioValue
    }
}

export default ClientAddressListViewModel;
