import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Image, ToastAndroid } from "react-native";
import { globalColors, globalStyles } from "../../../../theme/GlobalTheme";
import { IconComponent, InputComponent, RoundedButtonComponent, TitleComponent } from "../../../../components";
import useViewModel from "./ViewModel"
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'> { }

export const ClientAddresstCreateScreen = ({ navigation, route }: Props) => {


    const { address, neighborhood, refPoint, onChange, loading, createAddress, onChangeRefPoint, responseMessage } = useViewModel();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (route.params?.refPoint) {
            onChangeRefPoint(route.params.refPoint, route.params.latitude, route.params.longitude);
        }
    }, [route.params?.refPoint]);

    useEffect(() => {
        if (responseMessage) {
            ToastAndroid.show(responseMessage, ToastAndroid.SHORT);
            if (responseMessage === 'Dirección creada correctamente') {
                navigation.pop();
            }
        }
    }
        , [responseMessage]);

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

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ClientAddressMapScreen') }}
                    >
                        <InputComponent
                            icon={'location-outline'}
                            placeholder={'Punto de referencia'}
                            value={refPoint}
                            keyboardType={'default'}
                            property='refPoint'
                            onChangeText={onChange}
                            editable={false}
                        />
                    </TouchableOpacity>

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
        marginTop: "25%"
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