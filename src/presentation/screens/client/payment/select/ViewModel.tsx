import { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { GetPaymentMethodsByUserUseCase } from '../../../../../domain/useCases/paymentMethod/GetPaymentMethodsByUser';
import { PaymentMethodRepositoryImpl } from '../../../../../Data/repositories/PaymentMethodRepository';
import { PaymentMethod } from '../../../../../domain/entities/PaymentMethod';
import { CreateCardTokenMercadoPagoUseCase } from '../../../../../domain/useCases/mercadoPago/CreateCardTokenMercadoPago';
import { CardTokenParams } from '../../../../../Data/sources/remote/models/CardTokenParams';

const PaymentMethodSelectViewModel = () => {

    const { user } = useContext(UserContext);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [showCVVModal, setShowCVVModal] = useState(false);
    const [generatingToken, setGeneratingToken] = useState(false);

    const getPaymentMethodsByUserUseCase = new GetPaymentMethodsByUserUseCase(new PaymentMethodRepositoryImpl());

    const getPaymentMethods = async () => {
        if (!user.id) return;
        setLoading(true);
        const result = await getPaymentMethodsByUserUseCase.run(user.id);
        setPaymentMethods(result);
        setLoading(false);
    };

    const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
        setSelectedPaymentMethod(paymentMethod);
        setShowCVVModal(true);
    };

    const generateTokenWithCVV = async (cvv: string) => {
        if (!selectedPaymentMethod) {
            return { success: false, message: 'No hay método de pago seleccionado' };
        }

        setGeneratingToken(true);
        
        try {
            // Extraer mes y año de expiración
            const expirationMonth = selectedPaymentMethod.expiration_month;
            const expirationYear = selectedPaymentMethod.expiration_year;

            const cardTokenParams: CardTokenParams = {
                card_number: selectedPaymentMethod.card_number_encrypted?.replace('XXXXXX', '') || '',
                security_code: cvv,
                expiration_month: expirationMonth,
                expiration_year: expirationYear.toString(),
                cardholder: {
                    name: selectedPaymentMethod.card_holder_name,
                    identification: {
                        type: selectedPaymentMethod.identification_type || '',
                        number: selectedPaymentMethod.identification_number || ''
                    }
                }
            };

            const result = await CreateCardTokenMercadoPagoUseCase(cardTokenParams);
            setGeneratingToken(false);
            setShowCVVModal(false);
            
            if (result && result.id) {
                return { 
                    success: true, 
                    cardToken: result,  // Devolver el objeto completo
                    message: 'Token generado correctamente'
                };
            } else {
                return { 
                    success: false, 
                    message: 'No se pudo generar el token de pago'
                };
            }
        } catch (error) {
            console.error('Error generating token:', error);
            setGeneratingToken(false);
            return { 
                success: false, 
                message: 'Error al generar el token de pago'
            };
        }
    };

    const closeCVVModal = () => {
        setShowCVVModal(false);
        setSelectedPaymentMethod(null);
    };

    return {
        paymentMethods,
        loading,
        selectedPaymentMethod,
        showCVVModal,
        generatingToken,
        getPaymentMethods,
        selectPaymentMethod,
        generateTokenWithCVV,
        closeCVVModal
    };
};

export default PaymentMethodSelectViewModel;
