import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../screens/client/category/list/CategoryList";
import { globalColors } from "../theme/GlobalTheme";
import { ClientProductListScreen } from "../screens/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../screens/client/product/detail/ProductDetail";
import { Product } from "../../domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconComponent } from '../components/IconComponent';
import { ClientShoppingBagScreen } from "../screens/client/shopping_bag/shoppingBag";
import { ClientAddressListScreen } from "../screens/client/address/list/AddressList";
import { ClientAddresstCreateScreen } from "../screens/client/address/create/AddressCreate";
import { ClientAddressMapScreen } from "../screens/client/address/map/AddressMap";
import ClientPaymentFormScreen from "../screens/client/payment/form/PaymentForm";
import { ClientPaymentInstallmentsScreen } from "../screens/client/payment/installments/PaymentInstallments";
import { ClientPaymentSuccessScreen } from "../screens/client/payment/success/PaymentSuccessScreen";
import { ResponseMercadoPagoCardToken } from '../../Data/sources/remote/models/ResponseMercadoPagoCardToken';

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined;
    ClientProductListScreen: { idCategory: string };
    ClientProductDetailScreen: { product: Product };
    ClientShoppingBagScreen: undefined;
    ClientAddressListScreen: undefined;
    ClientAddressCreateScreen: {refPoint: string, latitude: number, longitude: number} | undefined;
    ClientAddressMapScreen: undefined;
    ClientPaymentFormScreen: undefined;
    ClientPaymentInstallmentsScreen: {cardToken: ResponseMercadoPagoCardToken};
    ClientPaymentSuccessScreen: undefined;
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
                    }}
                    name="ClientShoppingBagScreen" component={ClientShoppingBagScreen} />

                <Stack.Screen
                    options={({ route, navigation }) => ({
                        title: 'Mis direcciones',
                        headerShown: true,
                        
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ClientAddressCreateScreen')}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={26} />
                            </TouchableOpacity>
                        ),
                        headerTransparent: true,
                    })}
                    name="ClientAddressListScreen" component={ClientAddressListScreen} />

                <Stack.Screen
                    name="ClientAddressCreateScreen"
                    component={ClientAddresstCreateScreen}
                    options={{
                        title: 'Crear dirección',
                        headerShown: true,
                        headerTransparent: true,
                    }}
                />

                <Stack.Screen
                    name="ClientAddressMapScreen"
                    component={ClientAddressMapScreen}
                    options={{
                        title: 'Ubica tu dirección',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="ClientPaymentFormScreen"
                    component={ClientPaymentFormScreen}
                    options={{
                        title: 'Agregar tarjeta',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="ClientPaymentInstallmentsScreen"
                    component={ClientPaymentInstallmentsScreen}
                    options={{
                        title: 'Numero de cuotas',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="ClientPaymentSuccessScreen"
                    component={ClientPaymentSuccessScreen}
                    options={{
                        title: 'Pago Exitoso',
                        headerShown: true,
                    }}
                />


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