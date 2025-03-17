import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClientCategoryListScreen } from '../screens/client/category/list/CategoryList';
import { ClientOrderListScreen } from '../screens/client/category/order/list/OrderList';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { IconComponent } from '../components/IconComponent';

const Tab = createBottomTabNavigator();

export const ClientBottomTabsnavigator = () => {
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
                name="ClientCategoryListScreen" component={ClientCategoryListScreen} />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="clipboard-outline" color={color} size={26} />
                    )
                }}
                name="ClientOrderListScreen" component={ClientOrderListScreen} />
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