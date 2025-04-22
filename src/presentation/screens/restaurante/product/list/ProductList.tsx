import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { ProductStackParamList } from '../../../../navigator/RestaurantProductNavigator'
import useViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import { RestaurantProductListItem } from './ItemProduct'

interface Props extends StackScreenProps<ProductStackParamList, 'RestaurantProductListScreen'> { };

export const RestaurantProductListScreen = ({ navigation, route }: Props) => {

    const { products, getProducts, deleteProduct, responseMessage } = useViewModel();
    const { category } = route.params;

    useEffect(() => {
        if(category.id !== undefined) {
            getProducts(category.id!);
        }
    }, [])

    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => <RestaurantProductListItem product={item} remove={deleteProduct} category={category}/>}
            >
            </FlatList>

        </View>
    )
}
