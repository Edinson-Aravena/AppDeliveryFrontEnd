import { createContext } from "react";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from '../../domain/entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { CreateProductUseCase } from "../../domain/useCases/product/CreateProduct";

export interface PrOductContextProps {
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>   
}

export const ProductContext = createContext({} as PrOductContextProps);

export const ProductProvider = ({children}:any) =>{
    const create = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
        const response = await CreateProductUseCase(product, files)

        return response;
    }

    return (
        <ProductContext.Provider value={{create}}>
            {children}
        </ProductContext.Provider>
    )
}