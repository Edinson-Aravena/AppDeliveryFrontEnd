import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ToastAndroid } from 'react-native'
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
    const { total, getTotal, deliveryMen, responseMessage, items, open, value, setResponseMessage, setItems, setOpen, setValue, updateToOnTheWayOrder } = useViewModel(order);

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

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.deliveries}>REPARTIDOR ASIGNADO:</Text>
                    <Text style={styles.deliveryName}>{order.delivery?.name} {order.delivery?.lastname}</Text>
                </View>



                <View style={styles.totalInfo}>
                    <Text style={styles.total}>Total: ${total}</Text>
                    <View style={styles.button}>
                        {
                            order.status === 'DESPACHADO' &&
                            <RoundedButtonComponent
                                text="INICIAR ENTREGA"
                                onPress={() => updateToOnTheWayOrder()}
                            />
                        }
                    </View>
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
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,

    },
    deliveryName: {
        fontSize: 20,
        color: globalColors.buttons,
        fontWeight: 'bold',
        marginTop: 5
    },
    totalInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        width: '50%',
    },
    dropDown: {
        marginTop: 10,
    }
})