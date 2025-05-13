import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../../../../../domain/entities/Product';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [
        product.image1,
        product.image2,
        product.image3,
    ]

    const [quantity, setquantity] = useState(0);
    const [price, setprice] = useState(0)
    const { shoppingBag, saveItem } = useContext(ShoppingBagContext)
    console.log('BOLSA DE COMPRAS:', shoppingBag)

    useEffect(() => {
        setprice(product.price * quantity)
    }, [quantity])

    const addItem = () => {
        setquantity(quantity + 1)
    }

    useEffect(() => {
        const index = shoppingBag.findIndex((p) => p.id == product.id);
        if (index != -1) {
            setquantity(shoppingBag[index].quantity!)
        } 

    }, [shoppingBag])
    

    const removeItem = () => {
        if (quantity > 0) {
            setquantity(quantity - 1)
        }
    }

    const addToBag = () => {
        if (quantity > 0) {
            const productWithQuantity = { ...product, quantity };
            saveItem(productWithQuantity);
        }
    }

    return {
        productImageList,
        addItem,
        removeItem,
        shoppingBag,
        addToBag,
        price,
        quantity
    }
}

export default ClientProductDetailViewModel;