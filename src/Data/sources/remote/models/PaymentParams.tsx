import { Order } from "../../../../domain/entities/Order"

export interface PaymentParams {
    token: string,
    issuer_id: string,
    payment_method_id: string,
    transaction_amount: number,
    installments: number,
    order: Order
    payer: {
        email: string
        identification: Identification
    }
}

export interface Identification {
    number: string,
    type: string
}
