import { AxiosError } from "axios";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ImageInfo, ImagePickerAsset, ImagePickerCanceledResult, ImagePickerResult } from "expo-image-picker";
import mime from 'mime';

export class AuthRepositoryImple implements AuthRepository {
    async register(user: User): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/users/create', user)

            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }

    async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseAPIDelivery> {
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
    
            const response = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/users/createWithImage', data);
    
            return Promise.resolve(response.data);
    
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error con la imagen");
    
            if (e.response) {
                console.log("Error Response Data:", e.response.data);
                console.log("Error Response Status:", e.response.status);
                console.log("Error Response Headers:", e.response.headers);
            } else if (e.request) {
                console.log("Error Request:", e.request);
            } else {
                console.log("Error Message:", e.message);
            }
    
            const apiError: ResponseAPIDelivery = e.response ? JSON.parse(JSON.stringify(e.response.data)) : { message: e.message };
            return Promise.resolve(apiError);
        }
    }
    
    async login(email: string, password: string): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/users/login', { email: email, password: password })

            return Promise.resolve(response.data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }
}