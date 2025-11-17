import { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { CreatePaymentMethodUseCase } from '../../../../../domain/useCases/paymentMethod/CreatePaymentMethod';
import { PaymentMethodRepositoryImpl } from '../../../../../Data/repositories/PaymentMethodRepository';
import { PaymentMethod } from '../../../../../domain/entities/PaymentMethod';
import * as ImagePicker from 'expo-image-picker';
import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken';

const PaymentMethodCreateViewModel = (cardToken: ResponseMercadoPagoCardToken) => {

    const { user } = useContext(UserContext);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const createPaymentMethodUseCase = new CreatePaymentMethodUseCase(new PaymentMethodRepositoryImpl());

    const savePaymentMethod = async () => {
        setLoading(true);

        const paymentMethod: PaymentMethod = {
            id_user: user.id,
            card_holder_name: cardToken.cardholder.name,
            card_last_four: cardToken.last_four_digits,
            card_number_encrypted: cardToken.first_six_digits + 'XXXXXX' + cardToken.last_four_digits,
            card_brand: 'visa',
            card_token: cardToken.id,
            identification_type: cardToken.cardholder?.identification?.type || '',
            identification_number: cardToken.cardholder?.identification?.number || '',
            expiration_month: cardToken.expiration_month,
            expiration_year: cardToken.expiration_year,
            is_default: false
        };

        const response = await createPaymentMethodUseCase.run(paymentMethod);
        setLoading(false);
        setResponseMessage(response.message);
        
        return response.success;
    };

    return {
        loading,
        responseMessage,
        savePaymentMethod
    };
};

export default PaymentMethodCreateViewModel;
