import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';

export type RootStackParamList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    ProfileInfoScreen: undefined,
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
                    name="ProfileInfoScreen"
                    component={ProfileInfoScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};