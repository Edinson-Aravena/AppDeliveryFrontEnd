import { PaymentMethod } from "../entities/PaymentMethod";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";

export interface PaymentMethodRepository {

    create(paymentMethod: PaymentMethod): Promise<ResponseAPIDelivery>;
    getByUser(id_user: string): Promise<PaymentMethod[]>;
    getById(id: string): Promise<PaymentMethod>;
    delete(id: string): Promise<ResponseAPIDelivery>;
    setDefault(id: string, id_user: string): Promise<ResponseAPIDelivery>;

}
