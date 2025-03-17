import React, { useState } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import useViewModel from './ViewModel'
import { RolesItem } from './Item';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { globalColors } from '../../theme/GlobalTheme';
import { IconComponent } from '../../components/IconComponent';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'> { }

export const RolesScreen = ({navigation, route}:Props) => {

    const { user } = useViewModel();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [mode, setMode] = useState<any>('horizontal-stack')
    const [snapDirection, setSnapDirection] = useState<'left' | 'right'>('left')
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                    Tus Roles
                </Text>
                <Carousel
                    width={width * 0.8}
                    height={height * 0.6}
                    data={user?.roles!}
                    renderItem={({ item }) => <RolesItem rol={item} height={420} width={width} navigation={navigation} />}
                    modeConfig={{
                        snapDirection,
                        stackInterval: 30
                    }}
                    mode={mode}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold',textAlign: 'center', color: globalColors.info }}>Deliza</Text>
                    <IconComponent icon={'arrow-forward-outline'} color={globalColors.info} size={40} />
                </View>
            </View>

        </GestureHandlerRootView>

    )
}

export default RolesScreen;