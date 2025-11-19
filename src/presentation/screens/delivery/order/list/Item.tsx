import React from 'react'
import { Order } from '../../../../../domain/entities/Order'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DateFormatter } from '../../../../utils/DateFormatter'
import { StackNavigationProp } from '@react-navigation/stack'
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator'
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator'
import { IconComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'

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
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <IconComponent icon="receipt-outline" size={24} color={globalColors.buttons} />
                        <Text style={styles.title}>Orden #{order.id}</Text>
                    </View>
                    <IconComponent icon="chevron-forward-outline" size={24} color="#999" />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.infoRow}>
                        <IconComponent icon="calendar-outline" size={20} color={globalColors.buttons} />
                        <View style={styles.infoText}>
                            <Text style={styles.label}>Fecha del pedido:</Text>
                            <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <IconComponent icon="person-outline" size={20} color={globalColors.buttons} />
                        <View style={styles.infoText}>
                            <Text style={styles.label}>Cliente:</Text>
                            <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <IconComponent icon="location-outline" size={20} color={globalColors.buttons} />
                        <View style={styles.infoText}>
                            <Text style={styles.label}>Dirección de entrega:</Text>
                            <Text style={styles.value}>
                                {order.address?.address} - {order.address?.neighborhood}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212529',
    },
    content: {
        padding: 16,
        gap: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    infoText: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: 2,
    },
    value: {
        fontSize: 15,
        color: '#212529',
        fontWeight: '500',
    },
})
