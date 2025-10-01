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
import { InputComponent } from "../../../../components";
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
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Información de Pago</Text>
                        <Text style={styles.subtitle}>Ingresa los datos de tu tarjeta de crédito o débito</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Tarjeta de Crédito */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Tarjeta</Text>
                            <View style={styles.creditCardContainer}>
                                <CreditCard
                                    labels={{
                                        holder: 'Titular de la tarjeta',
                                        cvv: 'CVC',
                                        expiration: 'Expiración',
                                    }}
                                    placeholders={{
                                        number: '1234 5678 9012 3456',
                                        expiration: 'MM/AA',
                                        holder: 'NOMBRE COMPLETO'
                                    }}
                                    background={'#009929'}
                                    textColor={'white'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    ref={creditCardRef}
                                />
                            </View>
                        </View>

                        {/* Información de Identificación */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Identificación</Text>
                            <View style={styles.identificationContainer}>
                                <View style={styles.dropdownWrapper}>
                                    <Text style={styles.inputLabel}>Tipo de identificación</Text>
                                    <Dropdown
                                        style={styles.dropdownInput}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        containerStyle={styles.dropdownContainerStyle}
                                        itemContainerStyle={styles.itemContainerStyle}
                                        itemTextStyle={styles.itemTextStyle}
                                        activeColor="#f8f9fa"
                                        data={items}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Selecciona un tipo"
                                        value={value}
                                        onChange={item => {
                                            setValue(item.value);
                                        }}
                                        renderRightIcon={() => (
                                            <View style={styles.dropdownArrow}>
                                                <View style={styles.arrowDown} />
                                            </View>
                                        )}
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Número de identificación</Text>
                                    <InputComponent
                                        icon={'person-outline'}
                                        placeholder={'Ingresa tu número de identificación'}
                                        value={identificationNumber}
                                        keyboardType={'default'}
                                        property='identificationNumber'
                                        onChangeText={onChange}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Información de Seguridad */}
                        <View style={styles.securitySection}>
                            <View style={styles.securityRow}>
                                <View style={styles.securityIcon} />
                                <Text style={styles.securityText}>Tus datos están protegidos con encriptación de grado bancario</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.spacer} />
                </ScrollView>

                {/* Botón Fijo */}
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
                                <Text style={styles.buttonTextLoading}>Verificando tarjeta...</Text>
                            </View>
                        ) : (
                            <Text style={styles.buttonText}>Continuar con el pago</Text>
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
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecef',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 15,
        color: '#7f8c8d',
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 20,
    },
    formContainer: {
        padding: 20,
        
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 16,
        letterSpacing: 0.3,
    },
    creditCardContainer: {
        backgroundColor: "#009929",
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        height: 300,
    },
    identificationContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    dropdownWrapper: {
        marginBottom: 20,
    },
    inputWrapper: {
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    dropdownInput: {
        borderWidth: 1.5,
        borderColor: '#e8ecef',
        borderRadius: 12,
        padding: 16,
        backgroundColor: 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#95a5a6',
        fontWeight: '400',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '500',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropdownContainerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e8ecef',
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemContainerStyle: {
        borderRadius: 8,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    itemTextStyle: {
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 10,
        fontWeight: '400',
    },
    dropdownArrow: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowDown: {
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 5,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#7f8c8d',
    },
    customInputContainer: {
        borderWidth: 1.5,
        borderColor: '#e8ecef',
        borderRadius: 12,
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    customInput: {
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 16,
    },
    securitySection: {
        backgroundColor: '#e8f4fd',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    securityRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    securityIcon: {
        width: 16,
        height: 16,
        backgroundColor: '#3498db',
        borderRadius: 8,
        marginRight: 12,
    },
    securityText: {
        fontSize: 13,
        color: '#2c3e50',
        fontWeight: '400',
        flex: 1,
        lineHeight: 18,
    },
    spacer: {
        height: 120,
    },
    buttonContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e8ecef',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        backgroundColor: globalColors.buttons,
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: globalColors.buttons,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    buttonTextLoading: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        letterSpacing: 0.3,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropDown: {
        marginTop: 10,
    },
});