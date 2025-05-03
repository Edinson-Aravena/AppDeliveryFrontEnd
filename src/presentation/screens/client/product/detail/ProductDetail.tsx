import React, { useState } from 'react'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import useViewModel from './ViewModel';
import { Divider } from 'react-native-elements';
import { IconComponent, RoundedButtonComponent } from '../../../../components';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductDetailScreen'> { }

export const ClientProductDetailScreen = ({ navigation, route }: Props) => {

    const { product } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { productImageList, price, addItem, removeItem, quantity } = useViewModel(product)

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

                    <View style={styles.divider}></View>

                    {/*Descripcion*/}
                    <Text style={styles.descriptionTitle}>Descripción</Text>
                    <Text style={styles.descriptionContent}>{product.description}</Text>

                    <View style={styles.divider}></View>

                    {/*Precio*/}
                    <Text style={styles.descriptionTitle}>Precio</Text>
                    <Text style={styles.descriptionContent}>{product.price} CLP</Text>

                    <View style={styles.divider}></View>

                    {/*Orden*/}
                    <Text style={styles.descriptionTitle}>Tu orden</Text>
                    <Text style={styles.descriptionContent}>Cantidad: {quantity} </Text>
                    <Text style={styles.descriptionContent}>Precio total: {price}</Text>

                    <View style={styles.divider}></View>
                </View>

                <View style={styles.productActions}>
                    <TouchableOpacity
                        style={styles.actionLess}
                        onPress={() => removeItem()}
                    >
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.quantity}>
                        <Text style={styles.actionText}>{quantity}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.actionAdd}
                        onPress={() => addItem()}
                    >
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonAdd}>
                        <RoundedButtonComponent text={'Agregar al carrito'} onPress={() => { }} />
                    </View>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.back}
                onPress={ () => navigation.pop()}
            >
                <IconComponent icon={'arrow-back-outline'} size={25} />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    productImage: {
        width: '100%',
        height: '50%'
    },
    productDetail: {
        position: 'absolute',
        width: '100%',
        height: '55%',
        bottom: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    productInfo: {
        padding: 30,
        flex: 1
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginTop: 15
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    descriptionTitle: {
        marginTop: 10,
        fontWeight: 'bold'
    },
    descriptionContent: {
        fontSize: 13,
        marginTop: 5
    },
    productActions: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        backgroundColor: 'f2f2f2',
        paddingHorizontal: 30,
    },
    actionLess: {
        backgroundColor: '#3a3a3a',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    actionAdd: {
        backgroundColor: '#3a3a3a',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    actionText: {
        color: 'white',
        fontSize: 15
    },
    quantity: {
        backgroundColor: '#3a3a3a',
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: 'center',
    },
    buttonAdd: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 15,
    },
    backImage: {
        height: 35,
        width: 35
    }
}) 