import React, { useEffect, useState } from 'react'
import { RegisterAuthUseCase } from '../../../domain/useCases/auth/RegisterAuth';
import { ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { RegisterWithImageAuthUseCase } from '../../../domain/useCases/auth/RegisterWithImageAuth';
import { SaveUserUseCase } from '../../../domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

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
    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const {user, getUserSession} = useUserLocal();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images', // Solo imágenes
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            onChange('image', asset.uri); // Pasa la URI de la imagen seleccionada
            setFile(asset); // Puedes almacenar el asset completo si lo necesitas
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            quality: 1
        });
    
        if (!result.canceled) {
            const asset = result.assets[0];
            onChange('image', result.assets[0].uri);
            setFile(asset);
        }
    };

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async () => {
        if (isValidForm()) {
            setLoading(true)
            const response = await (RegisterWithImageAuthUseCase(values, file!));
            console.log("RESULT: " + JSON.stringify(response))
            setLoading(false)
            if(response.success){
                await SaveUserUseCase(response.data)
                getUserSession()
            }else{
                setErrorMessage(response.message);
            }
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
        if (values.image === '') {
            setErrorMessage('Selecciona una imágen')
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
        user,
        loading,
    }
}

export default RegisterViewModel;