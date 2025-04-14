import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { UpdateCategoryUseCase } from '../../../../../domain/useCases/category/UpdateCategory';
import { UpdateWithImageCategoryUseCase } from '../../../../../domain/useCases/category/UpdateWithImageCategory';
import { Category } from '../../../../../domain/entities/Category';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';
import { CategoryContext } from '../../../../context/CategoryContext';

const RestaurantCategoryUpdateViewModel = (category: Category ) => {

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    const [values, setValues] = useState(category );

    const {update, updateWithImage} = useContext(CategoryContext)

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const updateCategory = async () => {
        setLoading(true)
        let response = {} as ResponseAPIDelivery;

        if(values.image?.includes('https://')){
            response = await update(values)
        }else{
            response = await updateWithImage(values, file!)
        }
        
        setLoading(false)
        setResponseMessage(response.message)
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
        updateCategory,
    }
}

export default RestaurantCategoryUpdateViewModel;
