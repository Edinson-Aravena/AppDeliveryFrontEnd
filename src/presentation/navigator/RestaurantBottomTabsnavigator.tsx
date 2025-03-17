import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantCategoryListScreen } from '../screens/restaurante/category/list/CategoryList';
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/orderList';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { IconComponent } from '../components';

const Tab = createBottomTabNavigator();

export const RestaurantBottomTabsnavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    paddingBottom: 10, 
                    paddingTop: 5, 
                    height: 60, 
                }
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: 'Categorias',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="reorder-four-outline" color={color} size={26} />
                    )
                }}
                name="RestaurantCategoryListScreen" component={RestaurantCategoryListScreen} />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="clipboard-outline" color={color} size={26} />
                    )
                }}
                name="RestaurantOrderListScreen" component={RestaurantOrderListScreen} />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="id-card-outline" color={color} size={26} />
                    )
                }}
                name="ProfileInfoScreen" component={ProfileInfoScreen} />
        </Tab.Navigator>
    );
}