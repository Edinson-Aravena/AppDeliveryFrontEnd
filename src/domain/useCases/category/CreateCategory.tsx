import React from 'react'
import { CategoryRepositoryImple } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
const {create} = new CategoryRepositoryImple();
import * as ImagePicker from 'expo-image-picker';

export const CreateCategoryUseCase = async (category:Category, file:ImagePicker.ImagePickerAsset) => {
  return await create(category, file)
}

