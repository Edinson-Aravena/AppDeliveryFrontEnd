import React from 'react'
import { MercadoPagoRepositoryImpl } from '../../../Data/repositories/MercadoPagoRepository'
import { PaymentParams } from '../../../Data/sources/remote/models/PaymentParams';


const { createPayment } = new MercadoPagoRepositoryImpl();

export const CreatePaymentTokenMercadoPagoUseCase = async (paymentParams:PaymentParams) => {
    return await createPayment(paymentParams)
}