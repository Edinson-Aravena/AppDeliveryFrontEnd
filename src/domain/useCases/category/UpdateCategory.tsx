import React from 'react'
import { CategoryRepositoryImple } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
const {update} = new CategoryRepositoryImple();


export const UpdateCategoryUseCase = async (category:Category) => {
  return await update(category)
}

