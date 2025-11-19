import React from 'react'
import { Product } from '../../../../../domain/entities/Product'
import { View, StyleSheet, Image, Text } from 'react-native';
import { globalColors } from '../../../../theme/GlobalTheme';

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
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{product.product.name}</Text>
                <View style={styles.quantityContainer}>
                    <View style={styles.quantityBadge}>
                        <Text style={styles.quantityText}>{product.product.quantity}x</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityBadge: {
        backgroundColor: globalColors.buttons,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    quantityText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
})