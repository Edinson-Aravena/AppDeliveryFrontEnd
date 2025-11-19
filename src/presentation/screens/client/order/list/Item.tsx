import React from 'react'
import { Order } from '../../../../../domain/entities/Order'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DateFormatter } from '../../../../utils/DateFormatter'
import { StackNavigationProp } from '@react-navigation/stack'
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator'
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackParamList'
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator'
import { IconComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'

interface Props {
    order: Order,
    navigation: StackNavigationProp<ClientOrderStackParamList, 'ClientOrderListScreen', undefined>
}

export const OrdenListItem = ({ order, navigation }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ClientOrderDetailScreen', { order:order })} 
            activeOpacity={0.7}
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.orderNumber}>
                        <IconComponent icon="receipt-outline" size={22} color={globalColors.buttons} />
                        <Text style={styles.title}>Orden #{order.id}</Text>
                    </View>
                    <IconComponent icon="chevron-forward" size={20} color="#999" />
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="calendar-outline" size={18} color="#666" />
                    <View style={styles.infoContent}>
                        <Text style={styles.label}>Fecha del pedido</Text>
                        <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="person-outline" size={18} color="#666" />
                    <View style={styles.infoContent}>
                        <Text style={styles.label}>Cliente</Text>
                        <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="location-outline" size={18} color="#666" />
                    <View style={styles.infoContent}>
                        <Text style={styles.label}>Dirección de entrega</Text>
                        <Text style={styles.value}>
                            {order.address?.address} - {order.address?.neighborhood}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    orderNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 10,
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
})
