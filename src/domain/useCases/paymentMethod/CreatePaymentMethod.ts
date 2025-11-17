import { PaymentMethodRepository } from "../../repositories/PaymentMethodRepository";
import { PaymentMethod } from "../../entities/PaymentMethod";

export class CreatePaymentMethodUseCase {

    constructor(private paymentMethodRepository: PaymentMethodRepository) {}

    async run(paymentMethod: PaymentMethod) {
        return await this.paymentMethodRepository.create(paymentMethod);
    }

}
