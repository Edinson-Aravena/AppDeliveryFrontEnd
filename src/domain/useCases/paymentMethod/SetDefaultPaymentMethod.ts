import { PaymentMethodRepository } from "../../repositories/PaymentMethodRepository";

export class SetDefaultPaymentMethodUseCase {

    constructor(private paymentMethodRepository: PaymentMethodRepository) {}

    async run(id: string, id_user: string) {
        return await this.paymentMethodRepository.setDefault(id, id_user);
    }

}
