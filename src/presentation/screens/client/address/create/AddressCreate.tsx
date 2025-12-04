import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Image, ToastAndroid } from "react-native";
import { globalColors, globalStyles } from "../../../../theme/GlobalTheme";
import { IconComponent, InputComponent, RoundedButtonComponent, TitleComponent } from "../../../../components";
import useViewModel from "./ViewModel"
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { ProfileStackParamList } from "../../../../navigator/ProfileStackNavigator";

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'> { }
interface ProfileProps extends StackScreenProps<ProfileStackParamList, 'ProfileAddressCreateScreen'> { }

export const ClientAddresstCreateScreen = ({ navigation, route }: Props | ProfileProps) => {


    const { address, neighborhood, onChange, loading, createAddress, responseMessage } = useViewModel();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (responseMessage) {
            ToastAndroid.show(responseMessage, ToastAndroid.SHORT);
            if (responseMessage === 'La dirección se creo correctamente') {
                // Simplemente volver atrás en lugar de resetear toda la navegación
                navigation.goBack();
            }
        }
    }, [responseMessage]);

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../../../assets/background2.jpg')}
            resizeMode="cover"
        >

            <View style={styles.logoContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <Image
                        style={styles.logoImage}
                        source={require('../../../../assets/maps-and-location.png')}
                    //source={{uri: user?.image}}
                    />

                </View>

            </View>

            <View style={styles.form}>
                <ScrollView >

                    <TitleComponent
                        text="AGREGAR DIRECCIÓN"
                        size={20}
                        style={{ color: globalColors.title, fontWeight: "bold", marginTop: 10 }}
                    />

                    <InputComponent
                        icon={'home-outline'}
                        placeholder={'Dirección'}
                        value={address}
                        keyboardType={'default'}
                        property='address'
                        onChangeText={onChange}
                    />

                    <InputComponent
                        icon={'document-text-outline'}
                        placeholder={'Población/Villa'}
                        value={neighborhood}
                        keyboardType={'default'}
                        property='neighborhood'
                        onChangeText={onChange}
                    />

                    <View style={{ marginTop: 20 }}>
                        <RoundedButtonComponent text='CREAR DIRECCIÓN' onPress={() => createAddress()} />
                    </View>

                </ScrollView>
                {
                    loading &&
                    <ActivityIndicator style={globalStyles.loading} size="large" color={globalColors.buttons} />

                }

            </View>
            {/* <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.pop()}
            >
                <IconComponent icon={'arrow-back-outline'} size={30} color="white" />
            </TouchableOpacity> */}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    form: {
        width: '100%',
        height: '50%',
        backgroundColor: globalColors.background,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        marginBottom: 20,
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: globalColors.buttons,
        borderBottomColor: globalColors.buttons,
        borderBottomWidth: 1,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    containerCategory: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    back: {
        position: 'absolute',
        top: 50,
        left: 15,
        backgroundColor: globalColors.buttons,
        borderRadius: 50,
    }
});