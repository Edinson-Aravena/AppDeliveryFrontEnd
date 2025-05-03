import React from 'react';
import { View, Text, Image, StyleSheet  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalColors } from '../../../../theme/GlobalTheme';
import { StackNavigationProp } from '@react-navigation/stack';;
import { Product } from '../../../../../domain/entities/Product';
import { ScrollView } from 'react-native-gesture-handler';

import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props {
    product: Product;
    navigation: StackNavigationProp<ClientStackParamList, "ClientProductListScreen", undefined>
}

export const ClientProductListItem = ({ product, navigation}: Props) => {

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() => {navigation.navigate('ClientProductDetailScreen', {product: product}), console.log("Navegacion")}}
            >
                <View style={styles.container}>
                    <Image source={{ uri: product.image1 }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <Text style={{...styles.description, color: 'green', fontWeight:'bold'}}>$ {product.price} CLP</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
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

