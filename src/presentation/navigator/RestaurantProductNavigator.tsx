import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantProductListScreen } from '../screens/restaurante/product/list/ProductList';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoryStackParamList } from './RestaurantCategoryNavigator';
import { Category } from '../../domain/entities/Category';


import { IconComponent } from '../components';
import { globalColors } from '../theme/GlobalTheme';
import { RestaurantProductCreateScreen } from '../screens/restaurante/product/create/ProductCreate'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductProvider } from '../context/ProductContext';
import { RestaurantProductUpdateScreen } from '../screens/restaurante/product/update/ProductUpdate';
import { Product } from '../../domain/entities/Product';

export type ProductStackParamList = {
    RestaurantProductListScreen: { category: Category };
    RestaurantProductCreateScreen: { category: Category };
    RestaurantProductUpdateScreen: { category: Category, product: Product };
}
const stack = createNativeStackNavigator<ProductStackParamList>();

interface Props extends StackScreenProps<CategoryStackParamList, 'RestaurantProductNavigator'> { };

export const RestaurantProductNavigator = ({ navigation, route }: Props) => {
    return (
        <ProductState>
            <stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <stack.Screen
                    name="RestaurantProductListScreen"
                    component={RestaurantProductListScreen}
                    initialParams={{ category: route.params.category }}
                    options={({ route, navigation }) => ({
                        title: 'Productos',
                        headerShown: true,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('RestaurantProductCreateScreen', { category: route.params.category });
                                }}
                                style={{
                                    marginRight: 30,
                                }}
                            >
                                <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={26} />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <stack.Screen
                    name="RestaurantProductCreateScreen"
                    component={RestaurantProductCreateScreen}
                    initialParams={{ category: route.params.category }}
                    options={{
                        title: 'Nuevo Producto',
                        headerShown: true,
                    }}
                />
                <stack.Screen
                    name="RestaurantProductUpdateScreen"
                    component={RestaurantProductUpdateScreen}
                    options={{
                        title: 'Actualizar Producto',
                        headerShown: true,
                    }}
                />
            </stack.Navigator>
        </ProductState>

    )
}

const ProductState = ({ children }: any) => {
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    )
}