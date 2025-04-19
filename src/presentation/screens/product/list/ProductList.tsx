import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { ProductStackParamList } from '../../../navigator/RestaurantProductNavigator'

interface Props extends StackScreenProps<ProductStackParamList, 'RestaurantProductListScreen'> { };

export const RestaurantProductListScreen = ({navigation, route}:Props) => {

    const category = route.params;
    console.log('category', JSON.stringify(category));
    return (
        <View>
            <Text>Restaurant Product List Screen</Text>
        </View>
    )
}
