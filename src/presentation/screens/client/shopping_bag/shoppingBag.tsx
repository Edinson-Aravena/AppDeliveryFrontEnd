import React from 'react'
import { View, Text } from 'react-native'
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

    return (
        <View style={styles.container}>
            <View>
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

            <View style={styles.totalToPay}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text>${total}</Text>
                </View>

                <View style={styles.buttonAdd}>
                    <RoundedButtonComponent text='Pagar' onPress={() => {navigation.navigate('ClientAddressListScreen'), console.log("ir a addres")}} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        top: -100,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30
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