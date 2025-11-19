import React, { useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import useViewModel from './ViewModel'
import { AddressListItem } from './Item'
import { ToastAndroid } from 'react-native'
import { RoundedButtonComponent } from '../../../../components'
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { ProfileStackParamList } from '../../../../navigator/ProfileStackNavigator';
import { IconComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressListScreen'>{}
interface ProfileProps extends StackScreenProps<ProfileStackParamList, 'ProfileAddressListScreen'>{}


export const ClientAddressListScreen = ({navigation, route}: Props | ProfileProps) => {

    const {address, checked, responseMessage, getAddress, changeRadioValue, createOrder, deleteAddress } = useViewModel()

    useEffect(() => {
        if(responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    // Determinar si viene del flujo de compra o del perfil
    const isFromCheckout = route.name === 'ClientAddressListScreen';

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <IconComponent icon="location" color="#fff" size={28} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Mis Direcciones</Text>
                        <Text style={styles.headerSubtitle}>
                            {address.length === 0 ? 'No tienes direcciones guardadas' : `${address.length} ${address.length === 1 ? 'dirección' : 'direcciones'} guardadas`}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Lista de direcciones */}
            {address.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconComponent icon="home-outline" color="#ccc" size={80} />
                    <Text style={styles.emptyText}>No tienes direcciones</Text>
                    <Text style={styles.emptySubtext}>Agrega una dirección para recibir tus pedidos</Text>
                    
                    <TouchableOpacity 
                        style={styles.addButtonEmpty}
                        onPress={() => navigation.navigate('ClientAddressCreateScreen' as any)}
                    >
                        <IconComponent icon="add-circle" color="#fff" size={24} />
                        <Text style={styles.addButtonText}>Agregar dirección</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={address}
                    keyExtractor={(item) => item.id!}
                    renderItem={({item}) => (
                        <AddressListItem 
                            address={item} 
                            checked={checked} 
                            changeRadioValue={changeRadioValue}
                            onDelete={deleteAddress}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Botón agregar dirección cuando hay direcciones */}
            {address.length > 0 && (
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => navigation.navigate('ClientAddressCreateScreen' as any)}
                    >
                        <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={22} />
                        <Text style={styles.addButtonTextSecondary}>Agregar nueva dirección</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botón continuar solo en checkout */}
            {isFromCheckout && address.length > 0 && (
                <View style={styles.footer}>
                    <RoundedButtonComponent 
                        onPress={() => navigation.navigate('ClientPaymentFormScreen' as any)} 
                        text='Continuar con el pago' 
                    />
                </View>
            )}
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
    listContent: {
        paddingVertical: 16,
    },
    addButtonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: globalColors.buttons,
        borderStyle: 'dashed',
        gap: 8,
    },
    addButtonTextSecondary: {
        color: globalColors.buttons,
        fontSize: 16,
        fontWeight: '600',
    },
    addButtonEmpty: {
        backgroundColor: globalColors.buttons,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginTop: 24,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        elevation: 4,
    },
});
