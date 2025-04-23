import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../screens/client/category/list/CategoryList";
import { globalColors } from "../theme/GlobalTheme";
import { ClientProductListScreen } from "../screens/client/product/list/ProductList";

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined;
    ClientProductListScreen: {idCategory: string};
}

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: true }}
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
                    headerStyle: {
                        backgroundColor: globalColors.buttons,
                    },
                }}
                name="ClientProductListScreen" component={ClientProductListScreen} />
        </Stack.Navigator>
    );
}