import React from 'react'
import { CategoryRepositoryImple } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
const {updateWithImage} = new CategoryRepositoryImple();
import * as ImagePicker from 'expo-image-picker';

export const UpdateWithImageCategoryUseCase = async (category:Category, file:ImagePicker.ImagePickerAsset) => {
  return await updateWithImage(category, file)
}

