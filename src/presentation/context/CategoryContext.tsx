import { createContext, useEffect, useState } from "react";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Category } from "../../domain/entities/Category";
import * as ImagePicker from 'expo-image-picker';
import { GetListCategoryUseCase } from "../../domain/useCases/category/GetListCategory";
import { CreateCategoryUseCase } from "../../domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../domain/useCases/category/UpdateWithImageCategory";
import { DeleteCategoryUseCase } from "../../domain/useCases/category/DeleteCategory";


export interface CategoryContextProps {
    categories: Category[],
    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery>,
    getCategories(): Promise<void>,
    remove(id: string): Promise<ResponseAPIDelivery>,
    update(category: Category): Promise<ResponseAPIDelivery>,
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery>,
}

export const CategoryContext = createContext ({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        if(categories.length === 0) {
            getCategories()
        }
    }, [])

    const getCategories = async (): Promise<void> => {
        const result  = await GetListCategoryUseCase();
        setCategories(result);
    }

    const create = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await CreateCategoryUseCase(category, file!)
        getCategories();
        return response;
    }

    const update = async (category: Category): Promise<ResponseAPIDelivery> => {
        const response = await UpdateCategoryUseCase(category)
        getCategories();
        return response;
    }

    const updateWithImage = async (category: Category,  file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await UpdateWithImageCategoryUseCase(category, file!)
        getCategories();
        return response;
    }

    const remove = async (id: string): Promise<ResponseAPIDelivery> => {
        const response = await DeleteCategoryUseCase(id)
        getCategories();
        return response;
    }

    return(
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWithImage,
            remove,
        }}>
            {children}
        </CategoryContext.Provider>
    )
}