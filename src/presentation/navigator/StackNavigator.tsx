import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import RolesScreen from '../screens/roles/Roles';
import { RestaurantBottomTabsnavigator } from './RestaurantBottomTabsnavigator';
import { ClientBottomTabsnavigator } from './ClientBottomTabsnavigator copy';

export type RootStackParamList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    RolesScreen: undefined,
    ClientBottomTabsnavigator: undefined,
    RestaurantBottomTabsnavigator: undefined,
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={
                    {
                        headerShown: false,
                    }
                }
            >
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name="RolesScreen"
                    component={RolesScreen}
                />
                <Stack.Screen
                    name="RestaurantBottomTabsnavigator"
                    component={RestaurantBottomTabsnavigator}
                />
                <Stack.Screen
                    name="ClientBottomTabsnavigator"
                    component={ClientBottomTabsnavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};