import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { RoundedButtonComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentSuccessScreen'> { };

const { width, height } = Dimensions.get('window');

export const ClientPaymentSuccessScreen = ({ navigation }: Props) => {
    const navigationHook = useNavigation();

    const handleContinueShopping = () => {
        // Navegar de vuelta a la lista de categorías
        navigation.navigate('ClientCategoryListScreen');
    };

    const handleViewOrders = () => {
        // Navegar a la pantalla de órdenes usando el tab navigator
        navigationHook.navigate('ClientOrderStackNavigator' as never);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                <View style={styles.content}>
                    {/* Icono de éxito */}
                    <View style={styles.iconContainer}>
                        <View style={styles.successIcon}>
                            <Text style={styles.checkmark}>✓</Text>
                        </View>
                    </View>

                    {/* Título principal */}
                    <Text style={styles.title}>¡Pago Procesado!</Text>
                    <Text style={styles.subtitle}>
                        Tu pago ha sido procesado exitosamente. Recibirás una confirmación por correo electrónico.
                    </Text>

                    {/* Información adicional */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Text style={styles.infoIconText}>📧</Text>
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoTitle}>Confirmación por email</Text>
                                <Text style={styles.infoDescription}>
                                    Te hemos enviado todos los detalles de tu compra
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Text style={styles.infoIconText}>🚚</Text>
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoTitle}>Tiempo de entrega</Text>
                                <Text style={styles.infoDescription}>
                                    Tu pedido será entregado en 30-45 minutos
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Text style={styles.infoIconText}>📱</Text>
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoTitle}>Seguimiento en tiempo real</Text>
                                <Text style={styles.infoDescription}>
                                    Podrás seguir el estado de tu pedido en la app
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Botones de acción */}
                    <View style={styles.buttonContainer}>
                        <RoundedButtonComponent
                            text="Continuar Comprando"
                            onPress={handleContinueShopping}
                        />
                        
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={handleViewOrders}
                        >
                            <Text style={styles.secondaryButtonText}>Ver Mis Pedidos</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mensaje de agradecimiento */}
                    <View style={styles.thankYouContainer}>
                        <Text style={styles.thankYouText}>
                            ¡Gracias por elegirnos! 🎉
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height * 0.8,
    },
    iconContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    successIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2ecc71',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    checkmark: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
        fontWeight: '400',
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoIconText: {
        fontSize: 20,
    },
    infoContent: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    infoDescription: {
        fontSize: 14,
        color: '#7f8c8d',
        lineHeight: 20,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 32,
        marginTop: 20,
    },
    secondaryButton: {
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: globalColors.buttons,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: globalColors.buttons,
        letterSpacing: 0.3,
    },
    thankYouContainer: {
        alignItems: 'center',
    },
    thankYouText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
    },
});

export default ClientPaymentSuccessScreen;
