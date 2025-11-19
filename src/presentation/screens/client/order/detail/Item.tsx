import React from 'react'
import { Product } from '../../../../../domain/entities/Product'
import { View, StyleSheet, Image, Text } from 'react-native';
import { globalColors } from '../../../../theme/GlobalTheme';
import { IconComponent } from '../../../../components';

interface Props {
    product: Product;
}

export const OrderDetailItem = ({product}: Props) => {
    
    return (
        <View style={styles.container}>
            {product.image1 ? (
                <Image
                    source={{ uri: product.image1 }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.noImageContainer}>
                    <IconComponent icon="fast-food-outline" size={28} color={globalColors.buttons} />
                </View>
            )}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>x{product.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 8,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    noImageContainer: {
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#666',
    },
    badge: {
        backgroundColor: globalColors.buttons,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
})