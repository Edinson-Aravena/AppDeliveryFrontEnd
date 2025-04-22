import React from 'react'
import { ProductReposiotryImple } from '../../../Data/repositories/ProductRepository'

const { getProductsByCategory} = new ProductReposiotryImple

export const GetProductsByCategoryUseCase = async (idCategory: string) => {
    return await getProductsByCategory(idCategory);
}
