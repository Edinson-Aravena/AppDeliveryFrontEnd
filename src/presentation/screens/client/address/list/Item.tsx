import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Address } from '../../../../../domain/entities/Address';
import { RadioButton } from 'react-native-paper';

interface Props{
    address: Address;
    checked: string;
    changeRadioValue: (address: Address) => void;
    
}

export const AddressListItem = ({address, checked, changeRadioValue }:Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <RadioButton
                    value={address.id!}
                    status={checked === address.id ? 'checked' : 'unchecked'}
                    onPress={() => changeRadioValue(address)}
                />
                <View style={styles.infoAddress}>
                    <Text style={styles.address}>{address.address}</Text>
                    <Text style={styles.neighborhood}>{address.neighborhood}</Text>
                </View>
            </View>

            <View style={styles.divider} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10
    },
    info: {
        flexDirection: 'row'
    },
    infoAddress: {
        marginLeft: 5
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e8e8e8',
        marginTop: 10
    },
    address: {
        fontWeight: 'bold',
        fontSize: 13
    },
    neighborhood: {
        fontSize: 12
    }
});