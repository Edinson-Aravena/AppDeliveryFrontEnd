import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    SafeAreaView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import useViewModel from '../../../../../presentation/screens/client/payment/select/ViewModel';
import { IconComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';
import { PaymentMethod } from '../../../../../domain/entities/PaymentMethod';
import { CVVModal } from '../../../../components/CVVModal';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentMethodSelectScreen'> { };

const ClientPaymentMethodSelectScreen = ({ navigation, route }: Props) => {

    const { 
        paymentMethods, 
        loading, 
        selectedPaymentMethod,
        showCVVModal,
        generatingToken,
        getPaymentMethods, 
        selectPaymentMethod,
        generateTokenWithCVV,
        closeCVVModal
    } = useViewModel();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPaymentMethods();
        });
        return unsubscribe;
    }, [navigation]);

    const getCardIcon = (brand: string): 'card-outline' => {
        return 'card-outline';
    };

    const handleSelectCard = (paymentMethod: PaymentMethod) => {
        selectPaymentMethod(paymentMethod);
    };

    const handleCVVConfirm = async (cvv: string) => {
        const result = await generateTokenWithCVV(cvv);
        
        if (result.success && result.cardToken) {
            navigation.navigate('ClientPaymentInstallmentsScreen', {
                cardToken: result.cardToken,
                fromSavedCard: true
            });
        } else {
            ToastAndroid.show(result.message || 'Error al generar token', ToastAndroid.LONG);
        }
    };

    const handleAddNewCard = () => {
        navigation.navigate('ClientPaymentFormScreen');
    };

    const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => {
        if (!item) return null;
        
        return (
            <TouchableOpacity 
                style={styles.cardItem}
                onPress={() => handleSelectCard(item)}
                activeOpacity={0.7}
            >
                <View style={styles.cardContent}>
                    <View style={styles.cardIconContainer}>
                        <IconComponent 
                            icon={getCardIcon(item.card_brand || '')} 
                            size={32} 
                            color={globalColors.buttons}
                        />
                    </View>
                    
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardBrand}>
                            {item.card_brand ? item.card_brand.toUpperCase() : 'TARJETA'}
                        </Text>
                        <Text style={styles.cardNumber}>
                            {'•••• •••• •••• ' + (item.card_last_four || '****')}
                        </Text>
                        <Text style={styles.cardHolder}>
                            {item.card_holder_name || 'Sin nombre'}
                        </Text>
                    </View>

                    {item.is_default && (
                        <View style={styles.defaultBadge}>
                            <Text style={styles.defaultText}>Predeterminada</Text>
                        </View>
                    )}

                    <IconComponent 
                        icon="chevron-forward-outline" 
                        size={24} 
                        color="#999"
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderAddNewCard = () => (
        <TouchableOpacity 
            style={styles.addNewCard}
            onPress={handleAddNewCard}
            activeOpacity={0.7}
        >
            <View style={styles.addNewCardContent}>
                <View style={styles.addIconContainer}>
                    <IconComponent 
                        icon="add-circle-outline" 
                        size={32} 
                        color={globalColors.buttons}
                    />
                </View>
                <Text style={styles.addNewCardText}>Agregar nueva tarjeta</Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <IconComponent 
                icon="card-outline" 
                size={80} 
                color="#ccc"
            />
            <Text style={styles.emptyTitle}>No tienes tarjetas guardadas</Text>
            <Text style={styles.emptySubtitle}>Agrega una tarjeta para realizar pagos más rápido</Text>
            <TouchableOpacity 
                style={styles.emptyButton}
                onPress={handleAddNewCard}
                activeOpacity={0.8}
            >
                <Text style={styles.emptyButtonText}>Agregar tarjeta</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColors.buttons} />
                    <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Selecciona método de pago</Text>
                <Text style={styles.subtitle}>Elige una tarjeta guardada o agrega una nueva</Text>
            </View>

            {paymentMethods.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={paymentMethods}
                    renderItem={renderPaymentMethod}
                    keyExtractor={(item, index) => item.id?.toString() || `payment-${index}`}
                    contentContainerStyle={styles.listContent}
                    ListFooterComponent={<>{renderAddNewCard()}</>}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <CVVModal
                visible={showCVVModal}
                cardLastFour={selectedPaymentMethod?.card_last_four || '****'}
                onConfirm={handleCVVConfirm}
                onCancel={closeCVVModal}
                loading={generatingToken}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6c757d',
    },
    listContent: {
        padding: 16,
    },
    cardItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    cardIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardInfo: {
        flex: 1,
    },
    cardBrand: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 4,
    },
    cardNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 4,
    },
    cardHolder: {
        fontSize: 12,
        color: '#6c757d',
    },
    defaultBadge: {
        backgroundColor: globalColors.buttons,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    defaultText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    addNewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: globalColors.buttons,
        borderStyle: 'dashed',
    },
    addNewCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    addIconContainer: {
        marginRight: 16,
    },
    addNewCardText: {
        fontSize: 16,
        fontWeight: '600',
        color: globalColors.buttons,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        marginTop: 24,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 32,
    },
    emptyButton: {
        backgroundColor: globalColors.buttons,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 8,
    },
    emptyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ClientPaymentMethodSelectScreen;
