import React, { useEffect, useState } from 'react'
import { RegisterAuthUseCase } from '../../../domain/useCases/auth/RegisterAuth';
import { ToastAndroid } from 'react-native';

export const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }

    }, [errorMessage])


    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async () => {
        if (isValidForm()) {
            const response = await (RegisterAuthUseCase(values));
            console.log("RESULT: " + JSON.stringify(response))
        }

    }

    const isValidForm = (): boolean => {
        if (values.name == '') {
            setErrorMessage('Ingresa tu nombre')
            return false;
        }
        if (values.lastname == '') {
            setErrorMessage('Ingresa tus apellidos')
            return false;
        }
        if (values.email == '') {
            setErrorMessage('Ingresa tu correo electronico')
            return false;
        }
        if (values.phone == '') {
            setErrorMessage('Ingresa tu telefóno')
            return false;
        }
        if (values.password == '') {
            setErrorMessage('Ingresa tu contraseña')
            return false;
        }
        if (values.repeatPassword == '') {
            setErrorMessage('Ingresa tu confirmación de la contraseña')
            return false;
        }
        if (values.password !== values.repeatPassword) {
            setErrorMessage('Las contraseña no coinciden')
            return false;
        }
        return true;
    }
    return {
        ...values,
        onChange,
        register,
        errorMessage,
    }
}

export default RegisterViewModel;