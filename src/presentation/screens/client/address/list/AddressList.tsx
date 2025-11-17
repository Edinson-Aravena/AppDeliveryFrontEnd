import React, { useEffect } from 'react'
// import { FlatList } from 'react-native-gesture-handler'
import { View, FlatList, Text} from 'react-native'
import useViewModel from './ViewModel'
import { AddressListItem } from './Item'
import { ToastAndroid } from 'react-native'
import { RoundedButtonComponent } from '../../../../components'
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { ProfileStackParamList } from '../../../../navigator/ProfileStackNavigator';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressListScreen'>{}
interface ProfileProps extends StackScreenProps<ProfileStackParamList, 'ProfileAddressListScreen'>{}


export const ClientAddressListScreen = ({navigation, route}: Props | ProfileProps) => {

    const {address, checked, responseMessage, getAddress, changeRadioValue, createOrder } = useViewModel()

    useEffect(() => {
        if(responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    // Determinar si viene del flujo de compra o del perfil
    const isFromCheckout = route.name === 'ClientAddressListScreen';

    return (
        <View style={{flex: 1, zIndex: 1, marginTop: "25%"}}>
            <FlatList
                data={address}
                keyExtractor={(item) => item.id!}
                renderItem={({item}) => <AddressListItem address={item} checked={checked} changeRadioValue={changeRadioValue}/>}
            />

            {isFromCheckout && (
                <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical:20 }}>
                    <RoundedButtonComponent onPress={() => navigation.navigate('ClientPaymentMethodSelectScreen' as any) } text='Continuar' />
                </View>
            )}
        </View>
    )
}
