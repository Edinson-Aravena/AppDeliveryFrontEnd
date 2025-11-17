import React from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import useViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import { ShoppingBagItem } from './Item'
import { RoundedButtonComponent } from '../../../components'
import { StyleSheet } from "react-native"
import { ClientStackParamList } from '../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'

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
        <View style={styles.container}>
            {(!shoppingBag || shoppingBag.length === 0) ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>🛒 El carrito está vacío</Text>
                    <Text style={styles.emptySubtext}>Agrega productos para comenzar</Text>
                </View>
            ) : (
                <View style={styles.listContainer}>
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
                    />
                </View>
            )}

            <View style={styles.totalToPay}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text>${total}</Text>
                </View>

                <View style={styles.buttonAdd}>
                    <RoundedButtonComponent text='Pagar' onPress={handlePayment} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        flex: 1,
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
        marginBottom: 10,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    totalInfo: {
        alignItems: 'center'
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonAdd: {
        width: '50%'
    }
});