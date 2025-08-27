import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Rol } from '../../../domain/entities/Rol';
import { globalColors } from '../../theme/GlobalTheme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/StackNavigator';

interface Props {
    rol: Rol,
    height: number,
    width: number,
    navigation: StackNavigationProp<RootStackParamList, "RolesScreen", undefined>
}

export const RolesItem = ({ height, rol, width, navigation }: Props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.container, height: height, width: width - 100 }}
            onPress={() => {
                if (rol.name == "RESTAURANTE") {
                    navigation.replace('RestaurantBottomTabsnavigator')
                } else if (rol.name == "CLIENTE") {
                    navigation.replace('ClientBottomTabsnavigator')
                } else if (rol.name == "REPARTIDOR") {
                    navigation.replace('DeliveryBottomTabsnavigator')
                }
            }}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: rol.image }}
                />
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>{rol.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        paddingBottom: 20,
        paddingHorizontal: 7
    },
    imageContainer: {
        flex: 1,
        backgroundColor: globalColors.background,
        borderRadius: 18,
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    titleContainer: {
        height: 50,
        backgroundColor: globalColors.buttons,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white'
    }

})