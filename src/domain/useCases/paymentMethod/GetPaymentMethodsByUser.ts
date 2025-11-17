import { PaymentMethodRepository } from "../../repositories/PaymentMethodRepository";

export class GetPaymentMethodsByUserUseCase {

    constructor(private paymentMethodRepository: PaymentMethodRepository) {}

    async run(id_user: string) {
        return await this.paymentMethodRepository.getByUser(id_user);
    }

}
