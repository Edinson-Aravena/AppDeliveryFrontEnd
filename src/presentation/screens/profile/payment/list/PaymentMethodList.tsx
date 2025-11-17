import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../../navigator/ProfileStackNavigator';
import useViewModel from './ViewModel';
import { IconComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';
import { PaymentMethod } from '../../../../../domain/entities/PaymentMethod';

interface Props extends StackScreenProps<ProfileStackParamList, 'ProfilePaymentMethodListScreen'> {}

export const ProfilePaymentMethodListScreen = ({ navigation, route }: Props) => {

    const { paymentMethods, responseMessage, getPaymentMethods, deletePaymentMethod, setDefault } = useViewModel();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPaymentMethods();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage]);

    const handleDelete = (id: string, cardInfo: string) => {
        Alert.alert(
            'Eliminar método de pago',
            `¿Estás seguro de eliminar la tarjeta ${cardInfo}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive',
                    onPress: () => deletePaymentMethod(id) 
                }
            ]
        );
    };

    const handleSetDefault = (id: string) => {
        setDefault(id);
    };

    const getCardIcon = (brand: string): 'card-outline' => {
        return 'card-outline';
    };

    const renderItem = ({ item }: { item: PaymentMethod }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                    <IconComponent 
                        icon={getCardIcon(item.card_brand)} 
                        color={globalColors.buttons} 
                        size={30} 
                    />
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardBrand}>{item.card_brand}</Text>
                        <Text style={styles.cardNumber}>•••• {item.card_last_four}</Text>
                        <Text style={styles.cardHolder}>{item.card_holder_name}</Text>
                        <Text style={styles.cardExpiry}>
                            Vence: {item.expiration_month}/{item.expiration_year}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardActions}>
                    {item.is_default ? (
                        <View style={styles.defaultBadge}>
                            <Text style={styles.defaultText}>Predeterminada</Text>
                        </View>
                    ) : (
                        <TouchableOpacity 
                            onPress={() => handleSetDefault(item.id!)}
                            style={styles.setDefaultButton}
                        >
                            <Text style={styles.setDefaultText}>Usar como predeterminada</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        onPress={() => handleDelete(item.id!, `${item.card_brand} •••• ${item.card_last_four}`)}
                        style={styles.deleteButton}
                    >
                        <IconComponent icon="trash-outline" color="#FF5252" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {paymentMethods.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconComponent icon="card-outline" color="#ccc" size={80} />
                    <Text style={styles.emptyText}>No tienes métodos de pago guardados</Text>
                    <Text style={styles.emptySubtext}>
                        Agrega una tarjeta para realizar pagos más rápido
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={paymentMethods}
                    keyExtractor={(item) => item.id!}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 15,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'column',
    },
    cardInfo: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    cardDetails: {
        marginLeft: 15,
        flex: 1,
    },
    cardBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
    },
    cardNumber: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
        letterSpacing: 2,
    },
    cardHolder: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    cardExpiry: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    defaultBadge: {
        backgroundColor: globalColors.buttons,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    defaultText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    setDefaultButton: {
        paddingVertical: 6,
    },
    setDefaultText: {
        color: globalColors.buttons,
        fontSize: 13,
        fontWeight: '500',
    },
    deleteButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
        textAlign: 'center',
    },
});
