import React from 'react'
import { ProductReposiotryImple } from '../../../Data/repositories/ProductRepository'
import { Product } from '../../entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
const { updateWithImage } = new ProductReposiotryImple();

export const UpdateProductWithImageUseCase = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
    return await updateWithImage(product, files);
}
