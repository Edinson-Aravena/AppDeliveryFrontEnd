import React from 'react'
import { ProductReposiotryImple } from '../../../Data/repositories/ProductRepository'
import { Product } from '../../entities/Product';
const { update } = new ProductReposiotryImple();

export const UpdateProductUseCase = async (product: Product) => {
    return await update(product);
}
