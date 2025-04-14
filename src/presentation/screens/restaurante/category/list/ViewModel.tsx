import React, { useContext, useState } from 'react'
import { CategoryContext } from '../../../../context/CategoryContext'

const RestaurantCategoryListViewModel = () => {

    const [responseMessage, setResponseMessage] = useState('')
    const {categories, remove, getCategories} = useContext(CategoryContext)
    
    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory); 
        setResponseMessage(result.message)

    }
    return {
        categories,
        deleteCategory,
        responseMessage,
        getCategories
    }
}

export default RestaurantCategoryListViewModel;