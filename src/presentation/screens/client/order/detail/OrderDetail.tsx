import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ToastAndroid, SafeAreaView } from 'react-native'
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
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator'

interface Props extends StackScreenProps<ClientOrderStackParamList, 'ClientOrderDetailScreen'> { };

export const ClientOrderDetailScreen = ({ navigation, route }: Props) => {

    const { order } = route.params;
    const { total, getTotal, deliveryMen, responseMessage, items, open, value, setResponseMessage, setItems, setOpen, setValue, updateToOnTheWayOrder, updateToDeliveredOrder} = useViewModel(order);

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
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <IconComponent icon="receipt" size={32} color="white" />
                    <Text style={styles.headerTitle}>Detalle del Pedido</Text>
                </View>

                {/* Products Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <IconComponent icon="fast-food" size={24} color={globalColors.buttons} />
                        <Text style={styles.sectionTitle}>Productos</Text>
                    </View>
                    <View style={styles.card}>
                        <ScrollView style={styles.productsScroll} nestedScrollEnabled>
                            {order.products?.map((item, index) => (
                                <OrderDetailItem key={item.id} product={item} />
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <IconComponent icon="information-circle" size={24} color={globalColors.buttons} />
                        <Text style={styles.sectionTitle}>Información</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.infoRow}>
                            <IconComponent icon="calendar" size={22} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Fecha del pedido</Text>
                                <Text style={styles.value}>{DateFormatter(order.timestamp!)}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="person" size={22} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Cliente</Text>
                                <Text style={styles.value}>{order.client?.name} {order.client?.lastname}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="call" size={22} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Teléfono</Text>
                                <Text style={styles.value}>{order.client?.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <IconComponent icon="compass" size={22} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Dirección</Text>
                                <Text style={styles.value}>{order.address?.address}, {order.address?.neighborhood}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Delivery Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <IconComponent icon="bicycle" size={24} color={globalColors.buttons} />
                        <Text style={styles.sectionTitle}>Repartidor</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.infoRow}>
                            <IconComponent icon="person" size={22} color={globalColors.buttons} />
                            <View style={styles.infoText}>
                                <Text style={styles.label}>Repartidor asignado</Text>
                                <Text style={styles.value}>{order.delivery?.name} {order.delivery?.lastname}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Total Section */}
                <View style={styles.totalCard}>
                    <View style={styles.totalHeader}>
                        <IconComponent icon="checkmark-circle" size={20} color="white" />
                        <Text style={styles.totalLabel}>Total Pagado</Text>
                    </View>
                    <Text style={styles.totalAmount}>${total.toLocaleString('es-CL')}</Text>
                    <Text style={styles.totalCurrency}>CLP</Text>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>
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
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    section: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productsScroll: {
        maxHeight: 200,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    infoText: {
        marginLeft: 12,
        flex: 1,
    },
    label: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    totalCard: {
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    totalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        opacity: 0.95,
    },
    totalAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    totalCurrency: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginTop: 2,
        opacity: 0.9,
        fontWeight: '500',
    },
    bottomSpacing: {
        height: 20,
    },
})