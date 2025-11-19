import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import useViewModel from './ViewModel'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { FlatList } from 'react-native-gesture-handler'
import { ClientProductListItem } from './ItemProduct'
import { IconComponent } from '../../../../components'
import { globalColors } from '../../../../theme/GlobalTheme'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductListScreen'> { };

export const ClientProductListScreen = ({ navigation, route }: Props) => {

    const { idCategory } = route.params;
    const { getProducts, products } = useViewModel()

    useEffect(() => {
        getProducts(idCategory);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <IconComponent icon="fast-food" color="#fff" size={28} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Productos</Text>
                        <Text style={styles.headerSubtitle}>
                            {products.length} {products.length === 1 ? 'producto' : 'productos'} disponibles
                        </Text>
                    </View>
                </View>
            </View>

            {products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconComponent icon="restaurant-outline" color="#ccc" size={80} />
                    <Text style={styles.emptyText}>No hay productos</Text>
                    <Text style={styles.emptySubtext}>Esta categoría no tiene productos disponibles</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id!}
                    renderItem={({item}) => <ClientProductListItem product={item} navigation={navigation}/>}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: globalColors.buttons,
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 20,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    listContent: {
        paddingVertical: 16,
    },
});
