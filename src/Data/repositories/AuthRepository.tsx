import { AxiosError } from "axios";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class AuthRepositoryImple implements AuthRepository {
    async register(user: User):Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/users/create', user)
            
            return Promise.resolve(response.data);  

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }
}