import React, { useContext, useEffect, useState } from 'react'
import { CreateAddressUseCase } from '../../../../../domain/useCases/address/CreateAddress'
import { UserContext } from '../../../../context/UserContext';
import { ToastAndroid } from 'react-native';

const ClientAddressViewModel = () => {

    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const { user, saveUserSession, getUserSession } = useContext(UserContext)

    const [values, setValues] = useState({
        address: '',
        neighborhood: '',
        refPoint: '',
        lat: 0.0,
        lng: 0.0,
        id_user: user?.id || '',
    });




    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
        setValues({ ...values, refPoint: refPoint, lat: lat, lng: lng })
    }


    const createAddress = async () => {

        if (!user?.id) {
            setResponseMessage('Error: Usuario no identificado');
            return;
        }

        const addressData = {
            ...values,
            id_user: user.id
        };

        console.log('form:' + JSON.stringify(addressData));
        setLoading(true);
        const response = await CreateAddressUseCase(addressData);
        setLoading(false);
        setResponseMessage(response.message);
        if (response.success){
            resetForm();
            user.address = values;
            user.address.id = response.data;
            await saveUserSession(user);
            getUserSession()
        }
    }

    const resetForm = async () => {
        setValues({
            address: '',
            neighborhood: '',
            refPoint: '',
            lat: 0.0,
            lng: 0.0,
            id_user: user.id!,
        })
    }


    return {
        ...values,
        onChange,
        loading,
        responseMessage,
        createAddress,
        onChangeRefPoint
    }
}

export default ClientAddressViewModel;
