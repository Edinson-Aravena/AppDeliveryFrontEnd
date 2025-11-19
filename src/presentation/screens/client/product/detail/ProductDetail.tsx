import React, { useState } from 'react'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import useViewModel from './ViewModel';
import { Divider } from 'react-native-elements';
import { IconComponent, RoundedButtonComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductDetailScreen'> { }

export const ClientProductDetailScreen = ({ navigation, route }: Props) => {

    const { product } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { productImageList, price, addItem, removeItem, quantity, shoppingBag, addToBag } = useViewModel(product)

    return (
        <View style={styles.container}>

            <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Carousel
                    width={width}
                    height={height}
                    autoPlay={true}
                    scrollAnimationDuration={3000}
                    autoPlayInterval={2000}
                    data={productImageList}
                    renderItem={({ item }) => <Image
                        source={{ uri: item }}
                        style={styles.productImage} />
                    }
                />
            </GestureHandlerRootView>

            <View style={styles.productDetail}>
                <View style={styles.productInfo}>
                    {/*Nombre del producto*/}
                    <Text style={styles.name}>{product.name}</Text>

                    {/*Precio*/}
                    <View style={styles.priceCard}>
                        <IconComponent icon="cash-outline" color={globalColors.buttons} size={24} />
                        <View style={styles.priceInfo}>
                            <Text style={styles.priceLabel}>Precio</Text>
                            <Text style={styles.priceValue}>$ {product.price.toLocaleString('es-CL')}</Text>
                        </View>
                        <Text style={styles.currency}>CLP</Text>
                    </View>

                    {/*Orden*/}
                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <IconComponent icon="cart-outline" color={globalColors.buttons} size={22} />
                            <Text style={styles.orderTitle}>Tu orden</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.orderLabel}>Cantidad</Text>
                            <Text style={styles.orderValue}>{quantity}</Text>
                        </View>
                        <View style={styles.orderRow}>
                            <Text style={styles.orderLabel}>Precio total</Text>
                            <Text style={styles.orderTotal}>$ {price.toLocaleString('es-CL')} CLP</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.productActions}>
                    <View style={styles.quantityControl}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => removeItem()}
                        >
                            <IconComponent icon="remove" color="#fff" size={20} />
                        </TouchableOpacity>

                        <View style={styles.quantityDisplay}>
                            <Text style={styles.quantityText}>{quantity}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => addItem()}
                        >
                            <IconComponent icon="add" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => addToBag()}
                    >
                        <IconComponent icon="cart" color="#fff" size={20} />
                        <Text style={styles.addButtonText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.back}
                onPress={ () => navigation.pop()}
            >
                <View style={styles.backButton}>
                    <IconComponent icon={'arrow-back-outline'} size={24} color="#fff" />
                </View>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    productDetail: {
        position: 'absolute',
        width: '100%',
        height: '60%',
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    productInfo: {
        padding: 24,
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#1a1a1a',
        marginBottom: 20,
    },
    priceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    priceInfo: {
        flex: 1,
        marginLeft: 12,
    },
    priceLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    currency: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    orderCard: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#f0f0f0',
        padding: 16,
        borderRadius: 16,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginLeft: 8,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    orderLabel: {
        fontSize: 14,
        color: '#666',
    },
    orderValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: globalColors.buttons,
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 12,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
    },
    actionButton: {
        backgroundColor: globalColors.buttons,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityDisplay: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#4caf50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
}) 