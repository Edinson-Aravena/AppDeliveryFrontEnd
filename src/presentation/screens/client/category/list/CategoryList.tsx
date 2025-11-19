import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Dimensions, FlatList, StyleSheet } from 'react-native';
import { IconComponent } from '../../../../components/IconComponent';
import { globalColors } from '../../../../theme/GlobalTheme';
import { useEffect, useState } from 'react';
import { ClientCategoryItem } from './Item';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientCategoryListScreen'> { }

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
    const { categories, getCategories } = useViewModel();
    const [numColumns, setNumColumns] = useState(2); // Default 2 columns

    useEffect(() => {
        getCategories();
        // Ajustar número de columnas según el tamaño de pantalla
        const { width } = Dimensions.get('window');
        setNumColumns(width > 600 ? 3 : 2); // 3 columnas para tablets, 2 para móviles
    }, []);

    // Calcular el tamaño de cada item
    const { width } = Dimensions.get('window');
    const itemSize = (width - 40) / numColumns; // 40 = padding horizontal (20*2) + margin entre items

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                
                <Text style={styles.title}>
                    Explora nuestras categorías
                </Text>
                
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <ClientCategoryItem 
                            category={item} 
                            size={itemSize} 
                            navigation={navigation} 
                        />
                    )}
                    keyExtractor={(item) => item.id!}
                    numColumns={numColumns}
                    contentContainerStyle={styles.gridContainer}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.background,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: globalColors.title,
    },
    gridContainer: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 16,
        color: globalColors.info,
        marginRight: 10,
    },
});

export default ClientCategoryListScreen;