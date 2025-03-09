import React, { useEffect, useState } from 'react'
import { RegisterAuthUseCase } from '../../../domain/useCases/auth/RegisterAuth';
import { ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

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
        image:'',
        password: '',
        repeatPassword: ''
    });

    const [file, setFile] = useState<ImagePicker.ImagePickerResult | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });
    
        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });
    
        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result);
        }
    };

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
        pickImage,
        takePhoto,
    }
}

export default RegisterViewModel;