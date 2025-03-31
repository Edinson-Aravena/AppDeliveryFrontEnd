import React, { useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { SaveUserUseCase } from '../../../../domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { UpdateUserUseCase } from '../../../../domain/useCases/user/Updateuser';
import { UpdateWithImageUserUseCase } from '../../../../domain/useCases/user/UpdateWithImageUser';
import { User } from '../../../../domain/entities/User';
import { ResponseAPIDelivery } from '../../../../Data/sources/remote/models/ResponseApiDelivery';
import { UserContext } from '../../../context/UserContext';

export const profileUpdateViewModel = (user: User ) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setsuccessMessage] = useState('')

    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }

    }, [errorMessage])


    const [values, setValues] = useState(user);
    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    //const { getUserSession } = useUserLocal();
    const {saveUserSession} = useContext(UserContext)


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images', // Solo imágenes
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            onChange('image', asset.uri); 
            setFile(asset);
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

    const onChangeInfoUpdate = (name: string, lastName: string, phone:string) => {
        setValues({ ...values, name: name, lastname: lastName, phone: phone })
    }

    const update = async () => {
        if (isValidForm()) {
            setLoading(true)

            let response = {} as ResponseAPIDelivery;

            if(values.image?.includes('https://')){
                response = await (UpdateUserUseCase(values));
            }else{
                response = await UpdateWithImageUserUseCase(values, file!);
            }
            
            console.log("RESULT: " + JSON.stringify(response))
            setLoading(false)
            
            if(response.success){
                saveUserSession(response.data);
                setsuccessMessage(response.message);
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
        if (values.phone == '') {
            setErrorMessage('Ingresa tu telefóno')
            return false;
        }

        return true;
    }
    return {
        ...values,
        onChange,
        onChangeInfoUpdate,
        update,
        errorMessage,
        successMessage,
        pickImage,
        takePhoto,
        user,
        loading,
    }
}

export default profileUpdateViewModel;