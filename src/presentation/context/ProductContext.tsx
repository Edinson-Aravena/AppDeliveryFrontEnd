import { createContext, useState } from "react";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from '../../domain/entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { CreateProductUseCase } from "../../domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../domain/useCases/product/GetProductsByCategory";
import { DeleteProductUseCase } from "../../domain/useCases/product/DeleteProduct";
import { UpdateProductUseCase } from "../../domain/useCases/product/UpdateProduct";
import { UpdateProductWithImageUseCase } from "../../domain/useCases/product/UpdateProductWithImage";

export interface PrOductContextProps {
    products: Product[];
    getProducts(idCategory:string): Promise<void>;
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>; 
    updateWithImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>; 
    update(product: Product): Promise<ResponseAPIDelivery>; 
    remove(producto:Product): Promise<ResponseAPIDelivery>;   
}

export const ProductContext = createContext({} as PrOductContextProps);

export const ProductProvider = ({children}:any) =>{

    const [products, setProducts] = useState<Product[]>([])

    const getProducts = async (idCategory:string): Promise<void>=> {
        const result = await GetProductsByCategoryUseCase(idCategory)
        setProducts(result)
    }

    const create = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
        const response = await CreateProductUseCase(product, files)
        getProducts(product.id_category!) ;
        return response;
    }
    const updateWithImage = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>  =>{
        const response = await UpdateProductWithImageUseCase(product, files)
        getProducts(product.id_category!) ;
        return response;
    } 

    const update = async (product: Product): Promise<ResponseAPIDelivery> =>{
        const response = await UpdateProductUseCase(product)
        getProducts(product.id_category!) ;
        return response;
    }; 

    const remove = async (product: Product) => {
        const response = await DeleteProductUseCase(product)
        getProducts(product.id_category!) ;
        return response;
    }

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            create,
            remove,
            update,
            updateWithImage
        }}>
            {children}
        </ProductContext.Provider>
    )
}