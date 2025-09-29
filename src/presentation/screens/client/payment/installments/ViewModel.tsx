import React, { useContext, useEffect, useState } from 'react'
import { GetInstallmentsMercadoPagoUseCase } from '../../../../../domain/useCases/mercadoPago/GetInstallmentsMercadoPago';
import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext';
import { PayerCost } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoInstallments';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface DropDownProps {
    label: string;
    value: string;
}

const ClientPaymentInstallmentsViewModel = (cardToken: ResponseMercadoPagoCardToken) => {
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<DropDownProps[]>([]);
    const {total} = useContext(ShoppingBagContext);
    const [installments, setInstallments] = useState<PayerCost[]>([])

    useEffect(() => {
        if(installments.length >= 0){
            setDropDownItems();
        }
    }, [installments])
    
    const getInstallments = async () => {
        const result = await GetInstallmentsMercadoPagoUseCase(cardToken.first_six_digits, total);
        setInstallments(result.payer_costs);
        
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
        setOpen,
        setValue,
        setItems,
        getInstallments
    }
}

export default ClientPaymentInstallmentsViewModel;