import { 
  StyleSheet, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator 
} from "react-native";
import CreditCard from 'react-native-credit-card-form-ui';
import useViewModel from "./ViewModel";
import React, { useEffect } from 'react'
import { InputComponent } from "../../../../components"; // Removemos RoundedButtonComponent
import { Dropdown } from "react-native-element-dropdown";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { globalColors } from "../../../../theme/GlobalTheme";

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'> { };

const ClientPaymentFormScreen = ({ navigation, route }: Props) => {
    const {
        creditCardRef,
        value,
        items,
        identificationNumber,
        cardToken,
        loading,
        error,
        setValue,
        handleSubmit,
        getIdentificationTypes,
        onChange,
        clearError
    } = useViewModel();

    useEffect(() => {
        getIdentificationTypes();
    }, [])

    useEffect(() => {
        console.log('Card Token: ', JSON.stringify(cardToken, null, 3));
        if (cardToken !== undefined && cardToken !== null) {
            navigation.navigate('ClientPaymentInstallmentsScreen', { cardToken: cardToken});
        }
    }, [cardToken])

    // Efecto para mostrar alerta cuando hay error
    useEffect(() => {
        if (error) {
            Alert.alert(
                "Error",
                error,
                [
                    { 
                        text: "OK", 
                        onPress: () => clearError() 
                    }
                ]
            );
        }
    }, [error]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                >
                    <View style={styles.formContainer}>
                        <View style={styles.creditCardContainer}>
                            <CreditCard
                                labels={{
                                    holder: 'Titular de la tarjeta',
                                    cvv: 'CVC',
                                    expiration: 'Expiración',
                                }}
                                placeholders={{
                                    number: '1234 5678 9012 3456',
                                    expiration: 'MM/YY',
                                    holder: 'John Doe'
                                }}
                                background={'green'}
                                textColor={'white'}
                                placeholderTextColor={'white'}
                                ref={creditCardRef}
                            />
                        </View>

                        <View style={styles.dropDown}>
                            <Dropdown
                                style={styles.dropdownInput}
                                data={items}
                                labelField="label"
                                valueField="value"
                                placeholder="Tipo de identificación"
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                            />

                            <InputComponent
                                icon={'person-outline'}
                                placeholder={'Número de identificación'}
                                value={identificationNumber}
                                keyboardType={'default'}
                                property='identificationNumber'
                                onChangeText={onChange}
                                // Añade estas props al InputComponent
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                    
                    {/* Espacio adicional para evitar que el teclado cubra el contenido */}
                    <View style={styles.spacer} />
                </ScrollView>

                {/* Botón personalizado fijo abajo */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            loading && styles.buttonDisabled
                        ]}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#FFFFFF" />
                                <Text style={styles.buttonTextLoading}>Procesando...</Text>
                            </View>
                        ) : (
                            <Text style={styles.buttonText}>Siguiente</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ClientPaymentFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    creditCardContainer: {
        backgroundColor: globalColors.buttons, // Color morado
        borderRadius: 12, // Bordes redondeados
        padding: 16, // Espaciado interno
        marginBottom: 20, // Separación con los siguientes elementos
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        height: 280,
    },
    scrollContent: {
        padding: 20,
    },
    formContainer: {
        marginBottom: 20,
    },
    dropDown: {
        marginTop: 10,
    },
    spacer: {
        height: 100, // Espacio adicional para evitar que el teclado cubra
    },
    // Mejora el estilo del dropdownInput
    dropdownInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    buttonContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: globalColors.buttons, 
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonTextLoading: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});