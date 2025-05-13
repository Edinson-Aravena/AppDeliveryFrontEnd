import React from 'react'
import { Product } from '../../../../domain/entities/Product'
import { View, Image, Text, } from 'react-native';
import { StyleSheet } from "react-native"
import { IconComponent } from '../../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    product: Product;
    addItem: (product: Product) => void;
    subtractItem: (product: Product) => void;
    deleteItem: (product: Product) => void;
}

export const ShoppingBagItem = ({ product, addItem, deleteItem, subtractItem }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image1 }} style={styles.image} />
            </View>
            <View style={styles.productInfo}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.quantity! * product.price}</Text>
                </View>
                <View style={styles.productActions}>
                    <TouchableOpacity
                        style={styles.actionLess}
                        onPress={() => {subtractItem(product), console.log("restar item")}}
                    >
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.quantity}>
                        <Text style={styles.actionText}>{product.quantity}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.actionAdd}
                        onPress={() => addItem(product)}
                    >
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteItem} 
                        onPress={() => deleteItem(product)}
                    >
                        <IconComponent icon={'trash-outline'} size={25} color='white' />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 7
    },
    imageContainer: {

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    productInfo: {
        flex: 1
    },
    title: {
        color: 'black',
        fontSize: 14,
        marginLeft: 15,
        flex: 1
    },
    price: {
        marginRight: 40,
        fontWeight: 'bold'
    },
    productActions: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 5,
        marginRight: 45
    },
    actionLess: {
        backgroundColor: 'gray',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    actionAdd: {
        backgroundColor: 'gray',
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
        backgroundColor: 'gray',
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: 'center',
    },
    actions: {
        flexDirection: 'row',
        flex: 1
    },
    deleteItem: {
        position: 'absolute',
        marginHorizontal: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 3,
    }
});