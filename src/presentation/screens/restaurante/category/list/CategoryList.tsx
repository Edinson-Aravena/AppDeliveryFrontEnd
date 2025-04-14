import React, { useEffect } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import useViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import { RestaurantCategoryListItem } from './ItemCategory'

export const RestaurantCategoryListScreen = () => {

    const { categories, responseMessage, getCategories, deleteCategory } = useViewModel()

    

    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])
    

    return (
        <View>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <RestaurantCategoryListItem category={item} remove={deleteCategory}/>
                )}
            />
        </View>
    )
}
