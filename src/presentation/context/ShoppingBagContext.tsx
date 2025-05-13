import { createContext, useEffect, useState } from "react";
import { Product } from '../../domain/entities/Product';
import { GetShoppingBagUseCase } from "../../domain/useCases/shopping_bag/GetShoppingBag";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { SaveShoppingBagUseCase } from "../../domain/useCases/shopping_bag/SaveShoppingBag";

export interface ShoppingBagContextProps {
    shoppingBag: Product[],
    getShoppingBag(): Promise<void>,
    saveItem(product: Product): Promise<void>,
    deleteItem(product: Product): Promise<void>,
    total: number;
    getTotal(): Promise<void>,
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export const ShoppingBagProvider = ({ children }: any) => {

    const [shoppingBag, setShoppingBag] = useState<Product[]>([]);
    const [total, setTotal] = useState(0.0);

    useEffect(() => {
        getShoppingBag();
    }, [])

    useEffect(() => {
        getTotal();
    }, [shoppingBag])
    


    const getShoppingBag = async (): Promise<void> => {
        const result = await GetShoppingBagUseCase();
        setShoppingBag(result); // ASINCROZO
        getTotal();
    }

    const getTotal = async (): Promise<void> => {
        setTotal(0);

        let totalPrice = 0

        shoppingBag.forEach( product => {
            totalPrice = totalPrice + (product.quantity! * product.price)
        })
        setTotal(totalPrice)
    }

    const saveItem = async (product: Product): Promise<void> => {
        // Crea una copia del producto con quantity inicializada si no existe
        const productToSave = { 
            ...product,
            quantity: product.quantity || 1  // Si quantity no existe o es 0, se establece a 1
        };
        
        const index = shoppingBag.findIndex((p) => p.id == productToSave.id);
        
        if (index == -1) { // PRODUCTO NO HA SIDO AGREGADO A LA BOLSA COMPRAS -> INSERTARLO A LISTA
            shoppingBag.push(productToSave);
        }
        else { // PRODUCTO YA HA SIDO AGREGADO A LA BOLSA DE COMPRAS -> EDITAR LA CANTIDAD
            // Asegúrate de que la cantidad se actualiza correctamente
            shoppingBag[index] = {
                ...shoppingBag[index],
                quantity: productToSave.quantity
            };
        }

        await SaveShoppingBagUseCase(shoppingBag);
        getShoppingBag();

    }
    const deleteItem = async (product: Product): Promise<void> => {
        const index = shoppingBag.findIndex((p) => p.id == product.id);
        shoppingBag.splice(index, 1);
        await SaveShoppingBagUseCase(shoppingBag);
        getShoppingBag();

    }

    return (
        <ShoppingBagContext.Provider value={{
            shoppingBag,
            total,
            getTotal,
            getShoppingBag,
            saveItem,
            deleteItem
        }}
        >
            {children}
        </ShoppingBagContext.Provider>
    )

}