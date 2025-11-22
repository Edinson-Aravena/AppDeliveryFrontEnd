import React, { useContext } from 'react'
import { ShoppingBagContext } from '../../../context/ShoppingBagContext';
import { Product } from '../../../../domain/entities/Product';

const ClientShoppingBagViewModel = () => {

    const { shoppingBag, saveItem, deleteItem, total, anotaciones, setAnotaciones } = useContext(ShoppingBagContext)

    const addItem = async (product: Product) => {
        product.quantity = product.quantity! + 1;
        await saveItem(product)
    }

    const subtractItem = async (product: Product) => {
        if (product.quantity! > 1) {
            product.quantity = product.quantity! - 1;
            await saveItem(product)
        }

    }
    return {
        shoppingBag,
        total,
        anotaciones,
        setAnotaciones,
        addItem,
        subtractItem,
        deleteItem,
    }
}

export default ClientShoppingBagViewModel;