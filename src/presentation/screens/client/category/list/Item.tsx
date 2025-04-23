import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { Category } from '../../../../../domain/entities/Category';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { globalColors } from '../../../../theme/GlobalTheme';

interface Props {
    category: Category
    height: number,
    width: number,
    navigation: StackNavigationProp<ClientStackParamList, "ClientCategoryListScreen", undefined>
}

export const ClientCategoryItem = ({ height, category, width, navigation }: Props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.container, height: height, width: width - 100 }}
            onPress={() => {
                navigation.navigate("ClientProductListScreen", { idCategory: category.id!})
            }}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: category.image }}
                />
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>{category.name}</Text>
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
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    titleContainer: {
        height: 50,
        backgroundColor: globalColors.buttons,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
    }

})