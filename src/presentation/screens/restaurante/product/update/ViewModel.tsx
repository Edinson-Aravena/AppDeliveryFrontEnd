import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { Category } from '../../../../../domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../domain/entities/Product';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';


const RestaurantProductUpdateViewModel = ( product: Product, category: Category) => {


    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    const { update, updateWithImage } = useContext(ProductContext)

    const [values, setValues] = useState(product);
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>();
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>();
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>();

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const updateProduct = async () => {
        console.log('Producto Formulario', JSON.stringify(values))

        let files = []

        files.push(file1!);
        files.push(file2!);
        files.push(file3!);

        setLoading(true)
        let response = {} as ResponseAPIDelivery;
        if(values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')){ 
            response = await update(values)
        }else{
            response = await updateWithImage(values, files)
        }
        setLoading(false)
        setResponseMessage(response.message)
        
    }


    const pickImage = async (numberImage: number) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {


            if (numberImage === 1) {
                onChange('image1', result.assets[0].uri);
                setFile1(result.assets[0]);
            } else if (numberImage === 2) {
                onChange('image2', result.assets[0].uri);
                setFile2(result.assets[0]);
            } else if (numberImage === 3) {
                onChange('image3', result.assets[0].uri);
                setFile3(result.assets[0]);
            }
        }
    };

    const takePhoto = async (numberImage: number) => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            if (numberImage === 1) {
                onChange('image1', asset.uri);
                setFile1(asset);
            } else if (numberImage === 2) {
                onChange('image2', asset.uri);
                setFile2(asset);
            } else if (numberImage === 3) {
                onChange('image3', asset.uri);
                setFile3(asset);
            }
        }
    };

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        loading,
        responseMessage,
        updateProduct
    }
}

export default RestaurantProductUpdateViewModel;
