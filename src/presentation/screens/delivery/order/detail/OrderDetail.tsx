import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ToastAndroid, SafeAreaView, ScrollView } from 'react-native'
import { RestaurantOrderStackParamList } from '../../../../navigator/RestaurantOrderStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { OrderDetailItem } from './Item'
import { DateFormatter } from '../../../../utils/DateFormatter';
import { IconComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'
import useViewModel from './ViewModel'
import { RoundedButtonComponent } from '../../../../components/RoundedButtonComponent'
import { Dropdown } from 'react-native-element-dropdown';
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator'

interface Props extends StackScreenProps<DeliveryOrderStackParamList, 'DeliveryOrderDetailScreen'> { };

export const DeliveryOrderDetailScreen = ({ navigation, route }: Props) => {

    const { order } = route.params;
    const { total, getTotal, deliveryMen, responseMessage, items, open, value, setResponseMessage, setItems, setOpen, setValue, updateToOnTheWayOrder, updateToDeliveredOrder} = useViewModel(order, navigation);

    useEffect(() => {
        if (responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])

    useEffect(() => {
        if (total === 0) {
            getTotal();
        }
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/* Header con productos */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <IconComponent icon="receipt-outline" color="#fff" size={28} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Detalle del Pedido</Text>
                        <Text style={styles.headerSubtitle}>{order.products.length} productos</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Productos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Productos</Text>
                    <ScrollView 
                        style={styles.productsScroll}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    >
                        {order.products.map((product) => (
                            <OrderDetailItem key={product.id} product={product} />
                        ))}
                    </ScrollView>
                </View>

                {/* Información del pedido */}
                <View style={styles.section}>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <IconComponent icon="calendar-outline" size={24} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Fecha del pedido</Text>
                                <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="person-outline" size={24} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Cliente</Text>
                                <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="call-outline" size={24} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Teléfono</Text>
                                <Text style={styles.value}>{order.client?.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="location-outline" size={24} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Dirección de entrega</Text>
                                <Text style={styles.value}>{order.address?.address}, {order.address?.neighborhood}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Repartidor asignado */}
                <View style={styles.section}>
                    <View style={styles.deliveryCard}>
                        <View style={styles.deliveryHeader}>
                            <IconComponent icon="bicycle" color="#fff" size={24} />
                            <Text style={styles.deliveryTitle}>Repartidor Asignado</Text>
                        </View>
                        <Text style={styles.deliveryName}>{order.delivery?.name} {order.delivery?.lastname}</Text>
                    </View>
                </View>

                {/* Total */}
                <View style={styles.section}>
                    <View style={styles.totalCard}>
                        <View style={styles.totalHeader}>
                            <IconComponent icon="checkmark-circle" color="#fff" size={20} />
                            <Text style={styles.totalLabel}>Total Pagado</Text>
                        </View>
                        <Text style={styles.totalValue}>$ {total.toLocaleString('es-CL')}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Botón de acción */}
            {(order.status === 'DESPACHADO' || order.status === 'EN CAMINO') && (
                <View style={styles.footer}>
                    {
                        order.status === 'DESPACHADO'
                            ? (
                                <RoundedButtonComponent
                                    text="INICIAR ENTREGA"
                                    onPress={() => updateToOnTheWayOrder()}
                                />
                            )
                            : (
                                <RoundedButtonComponent
                                    text="ENTREGAR PEDIDO"
                                    onPress={() => updateToDeliveredOrder()}
                                />
                            )
                    }
                </View>
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: globalColors.buttons,
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    content: {
        flex: 1,
    },
    section: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    productsScroll: {
        maxHeight: 200,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    infoText: {
        marginLeft: 12,
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    deliveryCard: {
        backgroundColor: globalColors.buttons,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    deliveryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    deliveryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
    },
    deliveryName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    totalCard: {
        backgroundColor: '#2e7d32',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    totalValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
    },
})