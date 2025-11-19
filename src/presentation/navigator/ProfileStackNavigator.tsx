import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileInfoScreen } from "../screens/profile/info/ProfileInfo";
import { ClientAddressListScreen } from "../screens/client/address/list/AddressList";
import { ClientAddresstCreateScreen } from "../screens/client/address/create/AddressCreate";
import { ClientAddressMapScreen } from "../screens/client/address/map/AddressMap";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconComponent } from '../components/IconComponent';
import { globalColors } from "../theme/GlobalTheme";

export type ProfileStackParamList = {
    ProfileInfoScreen: undefined;
    ProfileAddressListScreen: undefined;
    ProfileAddressCreateScreen: {refPoint: string, latitude: number, longitude: number} | undefined;
    ProfileAddressMapScreen: undefined;
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="ProfileInfoScreen" 
                component={ProfileInfoScreen} 
            />

            <Stack.Screen
                options={({ route, navigation }) => ({
                    title: 'Mis direcciones',
                    headerShown: true,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileAddressCreateScreen')}
                            style={{
                                marginRight: 10,
                            }}
                        >
                            <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={26} />
                        </TouchableOpacity>
                    ),
                })}
                name="ProfileAddressListScreen" 
                component={ClientAddressListScreen} 
            />

            <Stack.Screen
                options={{
                    title: 'Nueva dirección',
                    headerShown: true,
                }}
                name="ProfileAddressCreateScreen" 
                component={ClientAddresstCreateScreen} 
            />

            <Stack.Screen
                options={{
                    title: 'Ubicar en mapa',
                    headerShown: true,
                }}
                name="ProfileAddressMapScreen" 
                component={ClientAddressMapScreen} 
            />
        </Stack.Navigator>
    );
}
