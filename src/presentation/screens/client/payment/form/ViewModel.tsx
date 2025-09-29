import React, { useEffect, useState } from "react";
import { useRef } from "react"
import { GetIdentificationTypeMercadoPagoUseCase } from "../../../../../domain/useCases/mercadoPago/GetIdentificationTypeMercadoPago";
import { IdentificationType } from "../../../../../Data/sources/remote/models/IdentificationType";
import { CreateCardTokenMercadoPagoUseCase } from "../../../../../domain/useCases/mercadoPago/CreateCardTokenMercadoPago";
import { CardTokenParams } from "../../../../../Data/sources/remote/models/CardTokenParams";
import { ResponseMercadoPagoCardToken } from "../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken";

interface DropDownProps {
    label: string;
    value: string;
}

const ClientPaymentFormViewModel = () => {

    const creditCardRef = useRef() as any;
    const [values, setValues] = useState({
        brand: '',
        cvv: '',
        expiration: '',
        holder: '',
        number: '',
    })

    const [identificationValues, setIdentificationValues] = useState({
        identificationType: '',
        identificationNumber: '',
    })

    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<DropDownProps[]>([]);
    const [cardToken, setCardToken] = useState<ResponseMercadoPagoCardToken>()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Nuevo estado para errores

    useEffect(() => {
        onChange('identificationType', value);
    }, [value])

    const [identificationTypeList, setIdentificationTypeList] = useState<IdentificationType[]>([]);

    useEffect(() => {
        if(values.cvv !== '' && values.expiration !== '' && values.holder !== '' && values.number !== '' && identificationValues.identificationType !== '' && identificationValues.identificationNumber !== ''){
            createCardToken();
        }
    }, [values, identificationValues])

    useEffect(() => {
        setDropDownItems();
    }, [identificationTypeList])

    const getIdentificationTypes = async () => {
        try {
            setError(null);
            const result = await GetIdentificationTypeMercadoPagoUseCase();
            setIdentificationTypeList(result);
            console.log('IDENTIFICATION TYPES: ', JSON.stringify(result));
        } catch (err) {
            setError('Error al cargar los tipos de identificación');
            console.log('ERROR GETTING IDENTIFICATION TYPES: ', err);
        }
    }

    const createCardToken = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Validar y formatear la fecha correctamente
            const expirationParts = values.expiration.split('/');

            if (expirationParts.length !== 2) {
                setError('Formato de fecha inválido. Use MM/YY');
                return;
            }

            const month = parseInt(expirationParts[0]);
            let year = parseInt(expirationParts[1]);

            // Validar mes
            if (month < 1 || month > 12) {
                setError('Mes de expiración inválido');
                return;
            }

            // Validar año
            const currentYear = new Date().getFullYear() % 100;
            if (year < currentYear) {
                setError('La tarjeta está expirada');
                return;
            }

            const fullYear = 2000 + year;

            const data: CardTokenParams = {
                card_number: values.number.replace(/\s/g, ''),
                expiration_year: fullYear.toString(), 
                expiration_month: month, 
                security_code: values.cvv,
                cardholder: {
                    name: values.holder,
                    identification: {
                        type: identificationValues.identificationType,
                        number: identificationValues.identificationNumber
                    }
                }
            }

            console.log("DATA", JSON.stringify(data));

            const result = await CreateCardTokenMercadoPagoUseCase(data);
            
            if(result){
                if(result.id !== '' && result.id !== undefined){
                    setCardToken(result);
                } else {
                    setError('Error al procesar la tarjeta. Verifique los datos.');
                }
            } else {
                setError('Error al procesar la tarjeta');
            }
            
            console.log('MERCADO PAGO CARD TOKEN:', JSON.stringify(result, null, 3));
        } catch (err) {
            setError('Error al procesar el pago. Intente nuevamente.');
            console.log('ERROR CREATING CARD TOKEN: ', err);
        } finally {
            setLoading(false);
        }
    }

    const setDropDownItems = () => {
        let itemsIdentification: DropDownProps[] = [];
        identificationTypeList.forEach(identification => {
            itemsIdentification.push({
                label: identification.name,
                value: identification.id
            });
        });
        setItems(itemsIdentification);
    }

    const onChange = (property: string, value: any) => {
        setError(null); // Limpiar error cuando el usuario modifique algo
        setIdentificationValues({ ...identificationValues, [property]: value });
    }

    const handleSubmit = React.useCallback(() => {
        setError(null); // Limpiar error al intentar enviar nuevamente
        
        if (creditCardRef.current) {
            const { error, data } = creditCardRef.current.submit();

            if (error === null) {
                setValues(data);
            } else {
                // Manejar errores del formulario de tarjeta
                let errorMessage = 'Por favor complete todos los campos correctamente';
                
                if (error && error.field) {
                    switch (error.field) {
                        case 'number':
                            errorMessage = 'Número de tarjeta inválido';
                            break;
                        case 'expiration':
                            errorMessage = 'Fecha de expiración inválida';
                            break;
                        case 'cvv':
                            errorMessage = 'Código de seguridad inválido';
                            break;
                        case 'holder':
                            errorMessage = 'Nombre del titular inválido';
                            break;
                        default:
                            errorMessage = 'Complete todos los campos correctamente';
                    }
                }
                
                setError(errorMessage);
                console.log('ERROR: ', error);
            }
            console.log('CARD DATA: ', data);
        }
    }, []);

    const clearError = () => {
        setError(null);
    }

    return {
        ...identificationValues,
        creditCardRef,
        identificationTypeList,
        open,
        value,
        items,
        cardToken,
        loading,
        error, // Exportar el estado de error
        setItems,
        setOpen,
        setValue,
        setValues,
        handleSubmit,
        getIdentificationTypes,
        onChange,
        createCardToken,
        clearError // Exportar función para limpiar errores
    }
}
export default ClientPaymentFormViewModel;