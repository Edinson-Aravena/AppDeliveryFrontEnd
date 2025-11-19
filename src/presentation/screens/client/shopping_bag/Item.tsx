import React from 'react'
import { Product } from '../../../../domain/entities/Product'
import { View, Image, Text, } from 'react-native';
import { StyleSheet } from "react-native"
import { IconComponent } from '../../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalColors } from '../../../theme/GlobalTheme';

interface Props {
    product: Product;
    addItem: (product: Product) => void;
    subtractItem: (product: Product) => void;
    deleteItem: (product: Product) => void;
}

export const ShoppingBagItem = ({ product, addItem, deleteItem, subtractItem }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: product.image1 }} style={styles.image} />
                
                <View style={styles.productInfo}>
                    <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                    
                    <View style={styles.bottomRow}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => subtractItem(product)}
                            >
                                <IconComponent icon="remove" color="#fff" size={16} />
                            </TouchableOpacity>

                            <View style={styles.quantityDisplay}>
                                <Text style={styles.quantityText}>{product.quantity}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => addItem(product)}
                            >
                                <IconComponent icon="add" color="#fff" size={16} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>$ {(product.quantity! * product.price).toLocaleString('es-CL')}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.deleteButton} 
                    onPress={() => deleteItem(product)}
                >
                    <IconComponent icon="trash-outline" size={18} color="#999" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginVertical: 6,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        position: 'relative',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 40,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
        lineHeight: 20,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        overflow: 'hidden',
    },
    actionButton: {
        backgroundColor: globalColors.buttons,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityDisplay: {
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});