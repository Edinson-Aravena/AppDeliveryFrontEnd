import React from 'react'
import { View, Text, Button } from 'react-native'
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'>{}

export const ProfileInfoScreen = ({navigation, route}:Props) => {

    const { removeSession } = useViewModel();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', padding: 20}}>
            <Text>profile info screen</Text>

            <Button
                title='Cerrar sesion'
                onPress={() => {
                    removeSession();
                    navigation.replace('LoginScreen')
                }}
            />
        </View>
    )
}
