import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    Dimensions, 
    ToastAndroid,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { ProfileStackParamList } from '../../../../navigator/ProfileStackNavigator'
import useViewModel from './ViewModel'
import { RoundedButtonComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'
import { ActivityIndicator } from 'react-native-paper'
import { IconComponent } from '../../../../components'
import { ShoppingBagContext } from '../../../../context/ShoppingBagContext'
import { UserContext } from '../../../../context/UserContext'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentInstallmentsScreen'> { };
interface ProfileProps extends StackScreenProps<ProfileStackParamList, 'ProfilePaymentInstallmentsScreen'> { };

const { width } = Dimensions.get('window');

export const ClientPaymentInstallmentsScreen = ({ navigation, route }: Props | ProfileProps) => {

    const { cardToken } = route.params;
    const { responseMessage, loading, getInstallments, createPayment } = useViewModel(cardToken);
    const { shoppingBag, total, anotaciones } = useContext(ShoppingBagContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getInstallments();
    }, [])

    useEffect(() => {
        if(responseMessage !== ''){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    const handlePress = () => {
        createPayment(anotaciones);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <IconComponent icon="receipt-outline" color="#fff" size={28} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>Resumen de compra</Text>
                    <Text style={styles.subtitle}>Revisa tu pedido antes de confirmar</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Productos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <IconComponent icon="cart" size={20} color={globalColors.buttons} /> Productos
                    </Text>
                    {shoppingBag.map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image source={{ uri: product.image1 }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                                <Text style={styles.productQuantity}>Cantidad: {product.quantity}</Text>
                            </View>
                            <Text style={styles.productPrice}>$ {(product.price * product.quantity!).toLocaleString('es-CL')}</Text>
                        </View>
                    ))}
                </View>

                {/* Dirección de entrega */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <IconComponent icon="location" size={20} color={globalColors.buttons} /> Dirección de entrega
                    </Text>
                    <View style={styles.addressCard}>
                        <Text style={styles.addressText}>{user.address?.address}</Text>
                        <Text style={styles.addressDetails}>{user.address?.neighborhood}</Text>
                    </View>
                </View>

                {/* Método de pago */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        <IconComponent icon="card" size={20} color={globalColors.buttons} /> Método de pago
                    </Text>
                    <View style={styles.paymentCard}>
                        <IconComponent icon="card-outline" size={24} color="#666" />
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentText}>Tarjeta terminada en ****{cardToken.last_four_digits}</Text>
                            <Text style={styles.paymentSubtext}>Pago en 1 cuota</Text>
                        </View>
                    </View>
                </View>

                {anotaciones && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            <IconComponent icon="create-outline" size={20} color={globalColors.buttons} /> Instrucciones especiales
                        </Text>
                        <View style={styles.notesDisplay}>
                            <Text style={styles.notesText}>{anotaciones}</Text>
                        </View>
                    </View>
                )}

                {/* Total */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal</Text>
                        <Text style={styles.totalValue}>$ {total.toLocaleString('es-CL')}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Envío</Text>
                        <Text style={styles.totalValue}>Gratis</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.grandTotalLabel}>Total a pagar</Text>
                        <Text style={styles.grandTotalValue}>$ {total.toLocaleString('es-CL')}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <RoundedButtonComponent 
                    text='CONFIRMAR PAGO' 
                    onPress={handlePress}
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
                    <IconComponent icon="lock-closed" size={16} color="#4caf50" />
                    <Text style={styles.securityText}>
                        Pago seguro y encriptado
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: globalColors.buttons,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    content: {
        flex: 1,
    },
    section: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    productQuantity: {
        fontSize: 12,
        color: '#666',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    addressCard: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
    },
    addressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    addressDetails: {
        fontSize: 12,
        color: '#666',
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        gap: 12,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    paymentSubtext: {
        fontSize: 12,
        color: '#666',
    },
    notesDisplay: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 12,
    },
    notesText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    totalSection: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
    },
    totalValue: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    grandTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    grandTotalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: globalColors.buttons,
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    securityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 8,
    },
    securityText: {
        fontSize: 12,
        color: '#666',
    },
    loading: {
        marginTop: 16,
    },
})