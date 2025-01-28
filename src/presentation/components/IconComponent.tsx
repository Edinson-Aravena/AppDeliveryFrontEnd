import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IconProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    color?: string;
    size: number;
}

export const IconComponent = ({ icon = 'home-outline', color = 'black', size = 16 }: IconProps) => {
    return (
        <View style={{paddingHorizontal:5}}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    );
};

