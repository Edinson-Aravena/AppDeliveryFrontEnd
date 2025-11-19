import React from 'react'
import { View, Text, ToastAndroid, SafeAreaView, TouchableOpacity } from 'react-native'
import useViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import { ShoppingBagItem } from './Item'
import { RoundedButtonComponent, IconComponent } from '../../../components'
import { StyleSheet } from "react-native"
import { ClientStackParamList } from '../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { globalColors } from '../../../theme/GlobalTheme'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientShoppingBagScreen'> { }


export const ClientShoppingBagScreen = ({navigation, route}: Props) => {

    const { shoppingBag, total, addItem, deleteItem, subtractItem} = useViewModel();

    const handlePayment = () => {
        if (!shoppingBag || shoppingBag.length === 0) {
            ToastAndroid.show('El carrito está vacío. Agrega productos antes de continuar.', ToastAndroid.LONG);
            return;
        }
        navigation.navigate('ClientAddressListScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <IconComponent icon="cart" color="#fff" size={28} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Mi orden</Text>
                        <Text style={styles.headerSubtitle}>
                            {shoppingBag?.length || 0} {shoppingBag?.length === 1 ? 'producto' : 'productos'}
                        </Text>
                    </View>
                </View>
            </View>

            {(!shoppingBag || shoppingBag.length === 0) ? (
                <View style={styles.emptyContainer}>
                    <IconComponent icon="cart-outline" color="#ccc" size={80} />
                    <Text style={styles.emptyText}>El carrito está vacío</Text>
                    <Text style={styles.emptySubtext}>Agrega productos para comenzar tu orden</Text>
                </View>
            ) : (
                <FlatList
                    data={shoppingBag}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) =>
                        <ShoppingBagItem
                            product={item}
                            addItem={addItem}
                            subtractItem={subtractItem}
                            deleteItem={deleteItem}
                        />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>$ {total.toLocaleString('es-CL')}</Text>
                    </View>
                    <Text style={styles.totalCurrency}>CLP</Text>
                </View>

                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={handlePayment}
                >
                    <IconComponent icon="card" color="#fff" size={20} />
                    <Text style={styles.payButtonText}>Pagar</Text>
                </TouchableOpacity>
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
        backgroundColor: globalColors.buttons,
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    listContent: {
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 20,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    totalRow: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        marginBottom: 4,
    },
    totalAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    totalCurrency: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    payButton: {
        backgroundColor: '#4caf50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});