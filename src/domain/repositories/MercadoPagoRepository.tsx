import { CardTokenParams } from "../../Data/sources/remote/models/CardTokenParams";
import { IdentificationType } from "../../Data/sources/remote/models/IdentificationType";
import { ResponseMercadoPagoCardToken } from "../../Data/sources/remote/models/ResponseMercadoPagoCardToken";
import { ResponseMercadoPagoInstallments } from "../../Data/sources/remote/models/ResponseMercadoPagoInstallments";


export interface MercadoPagoRepository {
    getIdentificationTypes(): Promise<IdentificationType[]>;
    createCardToken(cardTokenParams: CardTokenParams): Promise<ResponseMercadoPagoCardToken>;
    getInstallments(bin: string, amount: number): Promise<ResponseMercadoPagoInstallments>;
}