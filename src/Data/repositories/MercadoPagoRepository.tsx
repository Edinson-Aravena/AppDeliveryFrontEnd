import { IdentificationType } from '../sources/remote/models/IdentificationType';
import { MercadoPagoRepository } from '../../domain/repositories/MercadoPagoRepository';
import { ApiMercadoPago } from '../sources/remote/api/ApiMercadoPago';
import { CardTokenParams } from '../sources/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../sources/remote/models/ResponseMercadoPagoCardToken';
import { ResponseMercadoPagoInstallments } from '../sources/remote/models/ResponseMercadoPagoInstallments';
import { PaymentParams } from '../sources/remote/models/PaymentParams';
import { ResponseAPIDelivery } from '../sources/remote/models/ResponseApiDelivery';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { AxiosError } from 'axios';

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {


    async getIdentificationTypes(): Promise<IdentificationType[]> {
        const response = await ApiMercadoPago.get<IdentificationType[]>('/identification_types');
        return response.data;
    }

    async createCardToken(cardTokenParams: CardTokenParams): Promise<ResponseMercadoPagoCardToken> {
        const response = await ApiMercadoPago.post<ResponseMercadoPagoCardToken>('/card_tokens?public_key=TEST-63ccd413-1304-4dd5-a32a-154eb17ef85f', cardTokenParams);
        return response.data;
    }

    async getInstallments(bin: string, amount: number): Promise<ResponseMercadoPagoInstallments> {
        const response = await ApiMercadoPago.get<ResponseMercadoPagoInstallments[]>(`/payment_methods/installments?bin=${bin}&amount=${amount}`);
        return response.data[0];
    }

    async createPayment(paymentParams:PaymentParams): Promise<ResponseAPIDelivery>{
        try {
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/payment/create', paymentParams);

            return Promise.resolve(response.data);
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR:' + JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data))

            return Promise.resolve(apiError)
        }
    }
}