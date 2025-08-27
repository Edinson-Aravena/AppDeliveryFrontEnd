import React from 'react'
import { Order } from '../../../../../domain/entities/Order'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DateFormatter } from '../../../../utils/DateFormatter'
import { StackNavigationProp } from '@react-navigation/stack'
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator'
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator'

interface Props {
    order: Order,
    navigation: StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen', undefined>
}

export const OrdenListItem = ({ order, navigation }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryOrderDetailScreen', { order:order })} 
        >
            <View style={styles.card}>
                <Text style={styles.title}>Orden #{order.id}</Text>
                <Text style={styles.label}>Fecha del pedido:</Text>
                <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>

                <Text style={styles.label}>Cliente:</Text>
                <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>

                <Text style={styles.label}>Dirección de entrega:</Text>
                <Text style={styles.value}>
                    {order.address?.address} - {order.address?.neighborhood}
                </Text>

                <View style={styles.divider} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#212529'
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginTop: 6
    },
    value: {
        fontSize: 14,
        color: '#343a40',
    },
    divider: {
        height: 1,
        backgroundColor: '#dee2e6',
        marginTop: 12,
    },
})
