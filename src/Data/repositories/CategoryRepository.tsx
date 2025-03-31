import { Category } from "../../domain/entities/Category";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ImagePickerAsset } from "expo-image-picker";
import mime from 'mime';
import { AxiosError } from "axios";

export class CategoryRepositoryImple implements CategoryRepository{
    async create(category: Category, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
        try {
            if (!file.uri) {
                console.log("No URI found in the file:", file);
                throw new Error("Image URI is missing");
            }
    
            let data = new FormData();
            
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)
            } as any);
    
            data.append('category', JSON.stringify(category));
    
            const response = await ApiDeliveryForImage.post<ResponseAPIDelivery>('categories/create', data);
    
            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }
}