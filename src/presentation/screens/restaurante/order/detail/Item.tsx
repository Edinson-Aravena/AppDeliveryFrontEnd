import React from 'react'
import { Product } from '../../../../../domain/entities/Product'
import { View, StyleSheet, Image, Text } from 'react-native';

interface Props {
    product: Product;
}

export const OrderDetailItem = (product:Props) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.product.image1 }}
                style={styles.image}
            />

            <View>
                <Text style={styles.name}>{product.product.name}</Text>
                <Text style={styles.quantity}>Cantidad: {product.product.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    quantity: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
    },
})