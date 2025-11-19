import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalColors } from '../../../../theme/GlobalTheme';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../../../../../domain/entities/Product';
import { IconComponent } from '../../../../components';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props {
    product: Product;
    navigation: StackNavigationProp<ClientStackParamList, "ClientProductListScreen", undefined>
}

export const ClientProductListItem = ({ product, navigation}: Props) => {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('ClientProductDetailScreen', {product: product})}
            activeOpacity={0.9}
        >
            <View style={styles.card}>
                <Image source={{ uri: product.image1 }} style={styles.image} />
                <View style={styles.overlay} />
                
                <View style={styles.content}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
                    </View>
                    
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Precio</Text>
                        <Text style={styles.price}>$ {product.price.toLocaleString('es-CL')}</Text>
                        <Text style={styles.currency}>CLP</Text>
                    </View>
                </View>
                
                <View style={styles.chevronContainer}>
                    <IconComponent icon="chevron-forward" color={globalColors.buttons} size={24} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        height: 140,
        position: 'relative',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        position: 'relative',
        zIndex: 1,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    description: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        lineHeight: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    priceContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    priceLabel: {
        fontSize: 10,
        color: '#666',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 2,
    },
    currency: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    chevronContainer: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: globalColors.buttons,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

