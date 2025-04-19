import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { IconComponent } from '../../../../components';
import { Category } from '../../../../../domain/entities/Category';
import { globalColors } from '../../../../theme/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryStackParamList } from '../../../../navigator/RestaurantCategoryNavigator';

interface Props {
    category: Category;
    remove: (id: string) => void;
}

export const RestaurantCategoryListItem = ({ category, remove }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
        setModalVisible(false);
        remove(category.id!);
    };

    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('RestaurantProductNavigator', {category: category})}
        >
            <View style={styles.container}>
                <Image source={{ uri: category.image }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{category.name}</Text>
                    <Text style={styles.description}>{category.description}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity 
                        onPress={() => setModalVisible(true)} 
                        style={{...styles.iconWrapper, backgroundColor: 'red'}}
                    >
                        <IconComponent icon={'trash-outline'} size={20} color={'#fff'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RestaurantCategoryUpdateScreen', {category:category })} style={{...styles.iconWrapper, backgroundColor: 'blue'}}>
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
                            ¿Estás seguro de que quieres eliminar la categoría <Text style={{ fontWeight: 'bold' }}>{category.name}</Text>?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
                            <Button title="Eliminar" onPress={handleDelete} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
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
        color:  globalColors.buttons,
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
