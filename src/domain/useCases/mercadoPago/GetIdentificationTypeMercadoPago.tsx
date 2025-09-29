import { MercadoPagoRepositoryImpl } from "../../../Data/repositories/MercadoPagoRepository"

const {getIdentificationTypes} = new MercadoPagoRepositoryImpl();

export const GetIdentificationTypeMercadoPagoUseCase = async () => {
    return await getIdentificationTypes();
}