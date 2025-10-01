import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    Dimensions, 
    ToastAndroid
} from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { Dropdown } from 'react-native-element-dropdown'
import useViewModel from './ViewModel'
import { RoundedButtonComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'
import { ActivityIndicator } from 'react-native-paper'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentInstallmentsScreen'> { };

const { width } = Dimensions.get('window');

export const ClientPaymentInstallmentsScreen = ({ navigation, route }: Props) => {

    const { cardToken } = route.params;
    const { open, value, items, responseMessage, loading, setValue, getInstallments, createPayment } = useViewModel(cardToken);

    useEffect(() => {
        getInstallments();
    }, [])

    
    useEffect(() => {
        if(responseMessage !== ''){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Selecciona tus cuotas</Text>
                <Text style={styles.subtitle}>Elige el plan de pago que mejor se adapte a ti</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <View style={styles.creditCardIcon}>
                            <View style={styles.cardChip} />
                        </View>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Número de cuotas</Text>
                    <Text style={styles.sectionDescription}>
                        Selecciona en cuántas cuotas deseas dividir tu pago
                    </Text>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>CUOTAS DISPONIBLES</Text>
                        <Dropdown
                            style={styles.dropdown}
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
                            placeholder="Selecciona una cuota"
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

                    {value && (
                        <View style={styles.selectedInfo}>
                            <Text style={styles.selectedInfoText}>
                                Has seleccionado: <Text style={styles.selectedValue}>{value} cuotas</Text>
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.featuresCard}>
                    <Text style={styles.featuresTitle}>Beneficios</Text>
                    
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, styles.successIcon]} />
                        <View>
                            <Text style={styles.featureTitle}>Sin intereses</Text>
                            <Text style={styles.featureDescription}>Sin cargos adicionales</Text>
                        </View>
                    </View>
                    
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, styles.shieldIcon]} />
                        <View>
                            <Text style={styles.featureTitle}>Pago seguro</Text>
                            <Text style={styles.featureDescription}>Protegido y encriptado</Text>
                        </View>
                    </View>
                    
                    <View style={styles.featureItem}>
                        <View style={[styles.featureIcon, styles.speedIcon]} />
                        <View>
                            <Text style={styles.featureTitle}>Confirmación inmediata</Text>
                            <Text style={styles.featureDescription}>Proceso rápido</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <RoundedButtonComponent 
                    text='CONTINUAR CON EL PAGO' 
                    onPress={() => createPayment()}
                />
                {
                    loading &&

                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color={globalColors.buttons}
                    />
                }
                <View style={styles.securityContainer}>
                    <View style={styles.lockIcon} />
                    <Text style={styles.securityText}>
                        Tu información está protegida
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingVertical: 32,
        paddingHorizontal: 24,
        backgroundColor: globalColors.buttons,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontWeight: '400',
        letterSpacing: 0.3,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 28,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    creditCardIcon: {
        width: 60,
        height: 40,
        backgroundColor: '#34495e',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardChip: {
        width: 24,
        height: 18,
        backgroundColor: '#f39c12',
        borderRadius: 3,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    sectionDescription: {
        fontSize: 15,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 22,
        fontWeight: '400',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdownLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#7f8c8d',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    dropdown: {
        borderWidth: 1.5,
        borderColor: '#e1e5e9',
        borderRadius: 14,
        padding: 18,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        marginTop: 6,
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
        borderRadius: 10,
        marginHorizontal: 6,
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
    selectedInfo: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#3498db',
    },
    selectedInfoText: {
        fontSize: 15,
        color: '#2c3e50',
        fontWeight: '400',
    },
    selectedValue: {
        fontWeight: '600',
        color: '#3498db',
    },
    featuresCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    featuresTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 4,
    },
    featureIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 16,
        backgroundColor: '#ecf0f1',
    },
    successIcon: {
        backgroundColor: '#2ecc71',
    },
    shieldIcon: {
        backgroundColor: '#3498db',
    },
    speedIcon: {
        backgroundColor: '#9b59b6',
    },
    featureTitle: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '500',
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: 14,
        color: '#7f8c8d',
        fontWeight: '400',
    },
    footer: {
        padding: 24,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e5e9',
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
        marginBottom: 16,
    },
    securityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    lockIcon: {
        width: 12,
        height: 12,
        backgroundColor: '#27ae60',
        borderRadius: 6,
        marginRight: 8,
    },
    securityText: {
        fontSize: 13,
        color: '#7f8c8d',
        fontWeight: '400',
        letterSpacing: 0.3,
    },
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
})