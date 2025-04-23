import React, { useState } from 'react'
import { GetListCategoryUseCase } from '../../../../../domain/useCases/category/GetListCategory'
import { Category } from '../../../../../domain/entities/Category'


const ClientCategoryViewModel = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        const response = await GetListCategoryUseCase();
        setCategories(response);
    }

    return {
        getCategories,
        categories
    }
}

export default ClientCategoryViewModel;