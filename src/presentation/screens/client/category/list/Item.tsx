import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Category } from '../../../../../domain/entities/Category';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { globalColors } from '../../../../theme/GlobalTheme';

interface Props {
    category: Category;
    size: number;
    navigation: StackNavigationProp<ClientStackParamList, "ClientCategoryListScreen", undefined>;
}

export const ClientCategoryItem = ({ category, size, navigation }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.container, { width: size, height: size }]}
            onPress={() => {
                navigation.navigate("ClientProductListScreen", { idCategory: category.id! })
            }}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: category.image }}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2}>{category.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});