import { ProductReposiotryImple } from "../../../Data/repositories/ProductRepository";

const { remove } = new ProductReposiotryImple();

import React from 'react'
import { Product } from "../../entities/Product";

export const DeleteProductUseCase = async (product: Product) => {
    return await remove(product);
}
