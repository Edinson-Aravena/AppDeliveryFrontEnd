import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/orderList';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { IconComponent } from '../components';
import { RestaurantCategoryNavigator } from './RestaurantCategoryNavigator';
import { TouchableOpacity } from 'react-native';
import { globalColors } from '../theme/GlobalTheme';
import { RestaurantOrderStackNavigator } from './RestaurantOrderStackNavigator';
import { DeliveryOrderStackNavigator } from './DeliveryOrderStackNavigator';


const Tab = createBottomTabNavigator();

export const DeliveryBottomTabsnavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="clipboard-outline" color={color} size={26} />
                    )
                }}
                name="DeliveryOrderStackNavigator" component={DeliveryOrderStackNavigator} />
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