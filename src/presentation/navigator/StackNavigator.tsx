import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/home/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';

export type RootStackParamList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};