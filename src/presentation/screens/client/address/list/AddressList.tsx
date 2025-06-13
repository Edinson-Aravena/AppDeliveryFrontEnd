import React, { useEffect } from 'react'
// import { FlatList } from 'react-native-gesture-handler'
import { View, FlatList, Text} from 'react-native'
import useViewModel from './ViewModel'
import { AddressListItem } from './Item'

export const ClientAddressListScreen = () => {

    const {address, checked, getAddress, changeRadioValue } = useViewModel()

    // useEffect(() => {
    //     getAddress();
    // }, [])

    return (
        <View style={{flex: 1, zIndex: 1, marginTop: "25%"}}>
            <FlatList
                data={address}
                keyExtractor={(item) => item.id!}
                renderItem={({item}) => <AddressListItem address={item} checked={checked} changeRadioValue={changeRadioValue}/>}
            />
        </View>
    )
}
