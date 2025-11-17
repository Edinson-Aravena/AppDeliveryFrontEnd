import { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { GetPaymentMethodsByUserUseCase } from '../../../../../domain/useCases/paymentMethod/GetPaymentMethodsByUser';
import { DeletePaymentMethodUseCase } from '../../../../../domain/useCases/paymentMethod/DeletePaymentMethod';
import { SetDefaultPaymentMethodUseCase } from '../../../../../domain/useCases/paymentMethod/SetDefaultPaymentMethod';
import { PaymentMethodRepositoryImpl } from '../../../../../Data/repositories/PaymentMethodRepository';
import { PaymentMethod } from '../../../../../domain/entities/PaymentMethod';

const PaymentMethodListViewModel = () => {

    const { user } = useContext(UserContext);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [responseMessage, setResponseMessage] = useState('');

    const getPaymentMethodsByUserUseCase = new GetPaymentMethodsByUserUseCase(new PaymentMethodRepositoryImpl());
    const deletePaymentMethodUseCase = new DeletePaymentMethodUseCase(new PaymentMethodRepositoryImpl());
    const setDefaultPaymentMethodUseCase = new SetDefaultPaymentMethodUseCase(new PaymentMethodRepositoryImpl());

    const getPaymentMethods = async () => {
        const result = await getPaymentMethodsByUserUseCase.run(user.id!);
        setPaymentMethods(result);
    };

    const deletePaymentMethod = async (id: string) => {
        const result = await deletePaymentMethodUseCase.run(id);
        setResponseMessage(result.message);
        getPaymentMethods();
    };

    const setDefault = async (id: string) => {
        const result = await setDefaultPaymentMethodUseCase.run(id, user.id!);
        setResponseMessage(result.message);
        getPaymentMethods();
    };

    return {
        paymentMethods,
        responseMessage,
        getPaymentMethods,
        deletePaymentMethod,
        setDefault
    };
};

export default PaymentMethodListViewModel;
