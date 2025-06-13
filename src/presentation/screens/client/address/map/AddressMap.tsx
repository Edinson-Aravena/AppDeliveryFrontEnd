import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ToastAndroid, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import useViewModel from './ViewModel'
import { RoundedButtonComponent } from '../../../../components'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressMapScreen'> { }

export const ClientAddressMapScreen = ({navigation, route}:Props) => {

    const { messagePermissions, position, mapRef, name, latitude, longitude, onRegionChangeComplete } = useViewModel();

    useEffect(() => {
        if (messagePermissions) {
            ToastAndroid.show(messagePermissions, ToastAndroid.LONG);
        }
    }, [messagePermissions])

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={{ height: '100%', width: '100%' }}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={(region) => onRegionChangeComplete(region.latitude, region.longitude)}
            />

            <Image
                source={require('../../../../assets/marcador-de-posicion.png')}
                style={styles.imageLocation} 
            />

            <View style={styles.refPoint}>
                <Text>{name}</Text>
            </View>

            <View style={styles.buttonRefPoint}>
                <RoundedButtonComponent text={'SELECCIONA TU UBICACIÓN'} onPress={() => {
                    navigation.navigate({
                        name: 'ClientAddressCreateScreen',
                        merge: true,
                        params: {
                            refPoint: name,
                            latitude: latitude,
                            longitude: longitude
                        }
                    });
                }}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLocation: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
    },
    refPoint: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '70%',
        paddingVertical: 10,
        top: 40,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRefPoint: {
        position: 'absolute',
        bottom: '20%',
        width: '70%',
    }, 
})