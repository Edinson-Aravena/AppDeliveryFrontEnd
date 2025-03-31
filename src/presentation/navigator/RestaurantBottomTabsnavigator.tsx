import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantCategoryListScreen } from '../screens/restaurante/category/list/CategoryList';
import { RestaurantOrderListScreen } from '../screens/restaurante/order/list/orderList';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { IconComponent } from '../components';
import {  TouchableOpacity } from 'react-native';
import { globalColors } from '../theme/GlobalTheme';

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
                options={({route, navigation}) =>(
                    {
                        headerShown: true,
                        title: 'Categorias',
                        tabBarLabel: 'Categorias',
                        tabBarIcon: ({ color }) => (
                            <IconComponent icon="reorder-four-outline" color={color} size={26} />
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('RestaurantCategoryCreateScreen')}
                                style={{ marginRight: 10 }}>
                                <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={30} />
                            </TouchableOpacity>   
                        )
                    }
                )}
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