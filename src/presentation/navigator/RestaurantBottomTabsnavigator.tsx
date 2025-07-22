import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/OrderList';
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
                name="RestaurantCategoryNavigator"
                component={RestaurantCategoryNavigator}
                options={({ route, navigation }) => (
                    {
                        title: 'Categorias',
                        tabBarLabel: 'Categorias',
                        tabBarIcon: () => (
                            <IconComponent icon="reorder-four-outline" color={globalColors.buttons} size={26} />
                        ),
                        
                    }
                )}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color }) => (
                        <IconComponent icon="clipboard-outline" color={color} size={26} />
                    )
                }}
                name="RestaurantOrderStackNavigator" component={RestaurantOrderStackNavigator} />
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