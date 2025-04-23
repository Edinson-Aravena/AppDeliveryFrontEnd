import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import useViewModel from './ViewModel'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { FlatList } from 'react-native-gesture-handler'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductListScreen'> { };

export const ClientProductListScreen = ({ navigation, route }: Props) => {

    const { idCategory } = route.params;
    const { getProducts, products } = useViewModel()

    useEffect(() => {
        getProducts(idCategory);
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={products}
                renderItem={(item) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text>{item.item.name}</Text>
                        <Text>{item.item.price}</Text>
                    </View>
                )}
            />
        </View>
    )
}
