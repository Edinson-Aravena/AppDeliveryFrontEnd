import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { CreateCategoryUseCase } from '../../../../../domain/useCases/category/CreateCategory';


const RestaurantCategoryViewModel = () => {

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const createCategory = async () => {
        setLoading(true)
        const response = await CreateCategoryUseCase(values, file!)
        setLoading(false)
        setResponseMessage(response.message)
        resetForm()
    }

    const resetForm = async () => {
        setValues({
            name: '',
            description: '',
            image: ''
        })
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
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

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        loading,
        responseMessage,
        createCategory
    }
}

export default RestaurantCategoryViewModel;
