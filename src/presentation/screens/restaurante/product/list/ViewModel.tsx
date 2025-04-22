import React, { useContext, useState } from 'react'
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../domain/entities/Product';

const RestaurantProductListViewModel = () => {
    
    const {products, getProducts, remove } = useContext(ProductContext)
    const [responseMessage, setResponseMessage] = useState('')

    const deleteProduct = async (product: Product) => {
        const result = await remove(product); 
        setResponseMessage(result.message)
    }
    return {
        products,
        getProducts,
        deleteProduct,
        responseMessage
    }

}

export default RestaurantProductListViewModel;
