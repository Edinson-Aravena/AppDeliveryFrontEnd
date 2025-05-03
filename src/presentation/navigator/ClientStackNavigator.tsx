import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../screens/client/category/list/CategoryList";
import { globalColors } from "../theme/GlobalTheme";
import { ClientProductListScreen } from "../screens/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../screens/client/product/detail/ProductDetail";
import { Product } from "../../domain/entities/Product";

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined;
    ClientProductListScreen: {idCategory: string};
    ClientProductDetailScreen: {product: Product}; 
}

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                options={{
                    
                    headerTitle: 'Categorias',
                    headerTitleAlign: 'right',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: globalColors.buttons,
                    },
                }}
                name="ClientCategoryListScreen" component={ClientCategoryListScreen} />

            <Stack.Screen
                options={{
                    headerTitle: 'Productos',
                    headerTitleAlign: 'right',
                    headerTintColor: 'white',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: globalColors.buttons,
                    },
                }}
                name="ClientProductListScreen" component={ClientProductListScreen} />
            
            <Stack.Screen

                name="ClientProductDetailScreen" 
                component={ClientProductDetailScreen} />
        </Stack.Navigator>
    );
}