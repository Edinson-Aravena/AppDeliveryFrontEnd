import React, { useContext, useEffect, useState } from 'react'
import { GetInstallmentsMercadoPagoUseCase } from '../../../../../domain/useCases/mercadoPago/GetInstallmentsMercadoPago';
import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';
import { PayerCost, ResponseMercadoPagoInstallments } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoInstallments';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { CreatePaymentTokenMercadoPagoUseCase } from '../../../../../domain/useCases/mercadoPago/CreatePaymentMercadoPago';
import { PaymentParams } from '../../../../../Data/sources/remote/models/PaymentParams';
import { UserContext } from '../../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
interface DropDownProps {
    label: string;
    value: string;
}

const ClientPaymentInstallmentsViewModel = (cardToken: ResponseMercadoPagoCardToken) => {
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<DropDownProps[]>([]);
    const {total, shoppingBag, clearShoppingBag} = useContext(ShoppingBagContext);
    const {user} = useContext(UserContext);
    const [installments, setInstallments] = useState<PayerCost[]>([])
    const [installmentData, setInstallmentData] = useState<ResponseMercadoPagoInstallments>();
    const [responseMessage, setResponseMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        if(installments.length >= 0){
            setDropDownItems();
        }
    }, [installments])

    const createPayment = async () => {
        const data: PaymentParams = {
            installments: '1', // Siempre 1 cuota
            issuer_id: installmentData?.issuer.id!,
            payment_method_id: installmentData?.payment_method_id!,
            transaction_amount: total,
            token: cardToken.id,
            payer:{
                email: user.email,
                identification: {
                    number: cardToken.cardholder.identification.number,
                    type: cardToken.cardholder.identification.type,
                }
            },
            order: {
                id_client: user.id!,
                id_address: user.address?.id!,
                products: shoppingBag,
            }
        }
        console.log(user.email, cardToken.cardholder.identification.number)
        setLoading(true)
        const result = await CreatePaymentTokenMercadoPagoUseCase(data);
        setLoading(false)
        setResponseMessage(result.message)
        
        // Si el pago fue exitoso, limpiar el carrito de compras
        if (result.success) {
            await clearShoppingBag();
        }
        
        // Navegar a la pantalla de éxito independientemente del resultado del pago
        navigation.navigate('ClientPaymentSuccessScreen' as never);
    }
    
    const getInstallments = async () => {
        const result = await GetInstallmentsMercadoPagoUseCase(cardToken.first_six_digits, total);
        setInstallments(result.payer_costs);
        setInstallmentData(result)
        
    }

    const setDropDownItems = () => {
        let itemsInstallments: DropDownProps[] = [];
        installments.forEach(i => {
            itemsInstallments.push({
                label: i.recommended_message,
                value: i.installments.toString()
            });
        });
        setItems(itemsInstallments);
    }

    return {
        open,
        value,
        items,
        installments,
        responseMessage,
        loading,
        setOpen,
        setValue,
        setItems,
        getInstallments,
        createPayment
    }
}

export default ClientPaymentInstallmentsViewModel;