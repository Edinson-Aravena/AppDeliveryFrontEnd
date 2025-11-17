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

// Función para obtener el emoji según el slug de la categoría
function getCategoryIcon(slug: string): string {
    const icons: Record<string, string> = {
        'cafe': '☕',
        'desayuno': '🥐',
        'comida': '🍽️',
        'comida-rapida': '🍔',
        'almuerzos': '🍲',
        'postres': '🍰',
        'bebidas': '🥤',
        'alcohol': '🍷',
        'entradas': '🍟',
        'ensaladas': '🥗',
        'sopas': '🍜'
    };
    return icons[slug] || '🍴';
}

export const ClientCategoryItem = ({ category, size, navigation }: Props) => {
    const emoji = getCategoryIcon(category.slug || '');
    
    return (
        <TouchableOpacity
            style={[styles.container, { width: size, height: size }]}
            onPress={() => {
                navigation.navigate("ClientProductListScreen", { idCategory: category.id! })
            }}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={styles.title} numberOfLines={2}>{category.name}</Text>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 10,
    },
    title: {
        color: '#2c3e50',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});