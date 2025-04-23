import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigator/StackNavigator';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { IconComponent } from '../../../../components/IconComponent';
import { globalColors } from '../../../../theme/GlobalTheme';
import { useEffect, useState } from 'react';
import { ClientCategoryItem } from './Item';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientCategoryListScreen'> { }

export const ClientCategoryListScreen = ({navigation, route}:Props) => {

    const { categories, getCategories } = useViewModel();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [mode, setMode] = useState<any>('horizontal-stack')
    const [snapDirection, setSnapDirection] = useState<'left' | 'right'>('left')

    useEffect(() => {
        getCategories()
    }, [])
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                    Explora nuestras categorías
                </Text>
                <Carousel
                    width={width * 0.8}
                    height={height * 0.6}
                    data={categories}
                    renderItem={({ item }) => <ClientCategoryItem category={item} height={height * 0.62} width={width * 1} navigation={navigation} />}
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

export default ClientCategoryListScreen;