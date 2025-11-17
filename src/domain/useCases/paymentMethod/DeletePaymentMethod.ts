import { PaymentMethodRepository } from "../../repositories/PaymentMethodRepository";

export class DeletePaymentMethodUseCase {

    constructor(private paymentMethodRepository: PaymentMethodRepository) {}

    async run(id: string) {
        return await this.paymentMethodRepository.delete(id);
    }

}
