import React from 'react'
import { Product } from '../../entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { ProductReposiotryImple } from '../../../Data/repositories/ProductRepository';
const {create} = new ProductReposiotryImple();

export const CreateProductUseCase = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
    return await create(product, files)
}
