import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/orderList';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { IconComponent } from '../components';
import { RestaurantCategoryNavigator } from './RestaurantCategoryNavigator';
import { TouchableOpacity } from 'react-native';
import { globalColors } from '../theme/GlobalTheme';
import { RestaurantOrderStackNavigator } from './RestaurantOrderStackNavigator';


const Tab = createBottomTabNavigator();

export const RestaurantBottomTabsnavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="RestaurantOrderStackNavigator"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: globalColors.buttons,
                tabBarInactiveTintColor: '#95a5a6',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 5,
                },
                tabBarStyle: {
                    height: 65,
                    paddingTop: 8,
                    paddingBottom: 8,
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    justifyContent: 'center',
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
            })}
        >
            <Tab.Screen
                name="RestaurantOrderStackNavigator"
                component={RestaurantOrderStackNavigator}
                options={{
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color, focused }) => (
                        <IconComponent icon="clipboard-outline" color={color} size={focused ? 30 : 28} />
                    )
                }}
            />

            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, focused }) => (
                        <IconComponent icon="person-outline" color={color} size={focused ? 30 : 28} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}