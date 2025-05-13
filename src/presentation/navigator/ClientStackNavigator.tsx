import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../screens/client/category/list/CategoryList";
import { globalColors } from "../theme/GlobalTheme";
import { ClientProductListScreen } from "../screens/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../screens/client/product/detail/ProductDetail";
import { Product } from "../../domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconComponent } from '../components/IconComponent';
import { ClientshoppingBagScreen } from "../screens/client/shopping_bag/shoppingBag";

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined;
    ClientProductListScreen: { idCategory: string };
    ClientProductDetailScreen: { product: Product };
    ClientShoppingBagScreen: undefined;
}

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
    return (

        <ShoppingBagState>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    options={({ route, navigation }) => ({
                        title: 'Categorias',
                        headerShown: true,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ClientShoppingBagScreen')}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                <IconComponent icon="cart-outline" color={globalColors.buttons} size={26} />
                            </TouchableOpacity>
                        ),
                    })}
                    name="ClientCategoryListScreen" component={ClientCategoryListScreen} />

                <Stack.Screen
                    options={({ route, navigation }) => ({
                        title: 'Productos',
                        headerShown: true,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ClientShoppingBagScreen')}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                <IconComponent icon="cart-outline" color={globalColors.buttons} size={26} />
                            </TouchableOpacity>
                        ),
                    })}
                    name="ClientProductListScreen" component={ClientProductListScreen} />

                <Stack.Screen
                    name="ClientProductDetailScreen"
                    component={ClientProductDetailScreen} />

                <Stack.Screen
                    options={{
                        title: 'Mi orden',
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: globalColors.buttons,
                        },
                    }}
                    name="ClientShoppingBagScreen" component={ClientshoppingBagScreen} />
                
            </Stack.Navigator>
        </ShoppingBagState>

    );
}

const ShoppingBagState = ({ children }: any) => {
    return (
        <ShoppingBagProvider>
            {children}
        </ShoppingBagProvider>
    )
}