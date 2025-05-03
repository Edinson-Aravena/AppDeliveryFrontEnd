import React, { useEffect, useState } from 'react'
import { Product } from '../../../../../domain/entities/Product';

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [    
        product.image1,
        product.image2,
        product.image3,
    ]

    const [quantity, setquantity] = useState(0);
    const [price, setprice] = useState(0)

    useEffect(() => {
        setprice(product.price * quantity)
    }, [quantity])
    
    const addItem = () => {
        setquantity(quantity + 1)
    }

    const removeItem = () =>{
        if(quantity > 0 ){
            setquantity(quantity - 1)
        }
    }

    return {
        productImageList,
        addItem,
        removeItem,
        price,
        quantity
    }
}

export default ClientProductDetailViewModel;