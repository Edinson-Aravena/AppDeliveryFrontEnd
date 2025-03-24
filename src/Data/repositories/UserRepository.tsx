import { AxiosError } from 'axios';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { ResponseAPIDelivery } from '../sources/remote/models/ResponseApiDelivery';
import { ImagePickerAsset } from "expo-image-picker";
import { ApiDelivery, ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';
import mime from 'mime';


export class UserRepositoryImpl implements UserRepository{

    async update(user: User): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/users/updateWithOutImage', user)

            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }

    async updateWithImage(user: User, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
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
    
            data.append('user', JSON.stringify(user));
    
            const response = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/users/update', data);
    
            return Promise.resolve(response.data);
    
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error con la imagen");
            const apiError: ResponseAPIDelivery = e.response ? JSON.parse(JSON.stringify(e.response.data)) : { message: e.message };
            return Promise.resolve(apiError);
        }
    }
}