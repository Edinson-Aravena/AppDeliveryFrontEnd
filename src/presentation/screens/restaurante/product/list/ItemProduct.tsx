import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import { IconComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryStackParamList } from '../../../../navigator/RestaurantCategoryNavigator';
import { Product } from '../../../../../domain/entities/Product';
import { ScrollView } from 'react-native-gesture-handler';
import { ProductStackParamList } from '../../../../navigator/RestaurantProductNavigator';
import { Category } from '../../../../../domain/entities/Category';

interface Props {
    product: Product;
    category: Category;
    remove: (product: Product) => void;
}

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 40) / 2; // ajusta márgenes


export const RestaurantProductListItem = ({ product, remove, category }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
        console.log('Producto a eliminar:', product.id);
        setModalVisible(false);
        remove(product);
    };

    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>();

    return (
        <ScrollView style={{}}>
            <TouchableOpacity
            //onPress={() => navigation.navigate('RestaurantProductUpdateScreen', {category: category, product: product})}
            >
                <View style={styles.container}>
                    <Image source={{ uri: product.image1 }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.description}>➤{product.description}</Text>
                        <Text style={styles.description}>➤{product.price} CLP</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{ ...styles.iconWrapper, backgroundColor: 'red' }}
                        >
                            <IconComponent icon={'trash-outline'} size={20} color={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RestaurantProductUpdateScreen', {category: category, product: product})}
                            style={{ ...styles.iconWrapper, backgroundColor: 'blue' }}>
                            <IconComponent icon={'pencil-outline'} size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Modal de Confirmación */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Confirmar eliminación</Text>
                            <Text style={styles.modalText}>
                                ¿Estás seguro de que quieres eliminar la categoría <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>?
                            </Text>
                            <View style={styles.modalButtons}>
                                <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
                                <Button title="Eliminar" onPress={handleDelete} color="red" />
                            </View>
                        </View>
                    </View>
                </Modal>
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
