import { PaymentMethod } from "../../domain/entities/PaymentMethod";
import { PaymentMethodRepository } from "../../domain/repositories/PaymentMethodRepository";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";

export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {

    async create(paymentMethod: PaymentMethod): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.post('/payment-methods/create', paymentMethod);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async getByUser(id_user: string): Promise<PaymentMethod[]> {
        try {
            const response = await ApiDelivery.get(`/payment-methods/findByUser/${id_user}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async getById(id: string): Promise<PaymentMethod> {
        try {
            const response = await ApiDelivery.get(`/payment-methods/findById/${id}`);
            return Promise.resolve(response.data.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            throw error;
        }
    }

    async delete(id: string): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.delete(`/payment-methods/delete/${id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async setDefault(id: string, id_user: string): Promise<ResponseAPIDelivery> {
        try {
            const response = await ApiDelivery.put(`/payment-methods/setDefault/${id}`, { id_user });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

}
