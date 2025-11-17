import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { OrderDetailItem } from './Item'
import { DateFormatter } from '../../../../utils/DateFormatter';
import { IconComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'
import useViewModel from './ViewModel'

interface Props extends StackScreenProps<RestaurantOrderStackParamList, 'RestauranteOrderDetailScreen'> { };

export const RestauranteOrderDetailScreen = ({ navigation, route }: Props) => {

    const { order } = route.params;
    const { total, getTotal } = useViewModel(order);

    useEffect(() => {
        if (total === 0) {
            getTotal();
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.product}>
                <FlatList
                    data={order.products}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => <OrderDetailItem product={item} />}
                />
            </View>
            <View style={styles.info}>

                <View style={styles.infoRow}>
                    <IconComponent icon="calendar" size={26} color={"gray"} />
                    <View style={styles.infoText}>
                        <Text style={styles.label}>Fecha del pedido</Text>
                        <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="person" size={26} color={"gray"} />
                    <View style={styles.infoText}>
                        <Text style={styles.label}>Cliente</Text>
                        <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="call" size={26} color={"gray"} />
                    <View style={styles.infoText}>
                        <Text style={styles.label}>Teléfono</Text>
                        <Text style={styles.value}>{order.client?.phone}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <IconComponent icon="compass" size={26} color={"gray"} />
                    <View style={styles.infoText}>
                        <Text style={styles.label}>Dirección</Text>
                        <Text style={styles.value}>{order.address?.address}, {order.address?.neighborhood}</Text>
                    </View>
                </View>

                {/* Información del repartidor si está asignado */}
                {order.delivery && (
                    <View style={styles.deliveryInfo}>
                        <Text style={styles.deliveries}>🛵 REPARTIDOR ASIGNADO</Text>
                        <Text style={styles.deliveryName}>{order.delivery?.name} {order.delivery?.lastname}</Text>
                        {order.delivery?.phone && (
                            <Text style={styles.deliveryPhone}>📞 {order.delivery?.phone}</Text>
                        )}
                    </View>
                )}

                {/* Estado de la orden */}
                <View style={styles.statusInfo}>
                    <Text style={styles.statusLabel}>Estado del pedido:</Text>
                    <View style={[
                        styles.statusBadge,
                        order.status === 'PAGADO' && styles.statusPending,
                        order.status === 'DESPACHADO' && styles.statusDispatched,
                        order.status === 'ENTREGADO' && styles.statusDelivered
                    ]}>
                        <Text style={styles.statusText}>
                            {order.status === 'PAGADO' && '⏳ Pendiente de Asignación'}
                            {order.status === 'DESPACHADO' && '🛵 En Camino'}
                            {order.status === 'ENTREGADO' && '✅ Entregado'}
                        </Text>
                    </View>
                </View>

                <View style={styles.totalInfo}>
                    <Text style={styles.total}>Total: ${total}</Text>
                </View>

                {/* Nota informativa */}
                <View style={styles.infoNote}>
                    <IconComponent icon="information-circle-outline" size={20} color={globalColors.buttons} />
                    <Text style={styles.infoNoteText}>
                        La asignación de repartidores se realiza desde la página web
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    product: {
        width: '100%',
        height: '35%',
    },
    info: {
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    infoText: {
        marginLeft: 10,
        flex: 1,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        marginTop: 2,
    },
    deliveries: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#666',
        textTransform: 'uppercase',
    },
    deliveryName: {
        fontSize: 18,
        color: globalColors.buttons,
        fontWeight: 'bold',
        marginTop: 5
    },
    deliveryPhone: {
        fontSize: 14,
        color: '#666',
        marginTop: 3
    },
    deliveryInfo: {
        backgroundColor: '#f0f9ff',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        borderLeftWidth: 4,
        borderLeftColor: globalColors.buttons,
    },
    statusInfo: {
        marginTop: 20,
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    statusBadge: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    statusPending: {
        backgroundColor: '#fef3c7',
        borderWidth: 1,
        borderColor: '#fcd34d',
    },
    statusDispatched: {
        backgroundColor: '#dbeafe',
        borderWidth: 1,
        borderColor: '#60a5fa',
    },
    statusDelivered: {
        backgroundColor: '#d1fae5',
        borderWidth: 1,
        borderColor: '#34d399',
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    totalInfo: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#e5e7eb',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    infoNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eff6ff',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        gap: 8,
    },
})