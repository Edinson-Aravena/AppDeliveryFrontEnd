import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ToastAndroid, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { globalColors } from '../../theme/GlobalTheme';
import { TitleComponent, InputComponent, RoundedButtonComponent } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/StackNavigator';
import useViewModel from './ViewModel'
import { PhoneNumberInputComponent } from '../../components/InputComponentPhone';
import { ModalPickImage } from '../../components/ModalPickImage';

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation, route }: Props) => {

    const { name, lastname, email, phone, image, password, repeatPassword, onChange, register, user, loading, errorMessage, pickImage, takePhoto } = useViewModel();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (user?.id != null && user?.id != undefined) {
            navigation.replace('ProfileInfoScreen')
        }
    }, [user])

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
        >

            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                            ? <Image
                                style={styles.logoImage}
                                source={require('../../assets/user_image.png')}
                            />
                            : <Image
                                style={styles.logoImage}
                                source={{ uri: image }}
                            />
                    }

                </TouchableOpacity>
                <TitleComponent
                    text="Selecciona una imagen "
                    size={30}
                    style={{ color: "white", fontWeight: "bold", marginTop: 10 }}
                />
            </View>

            <View style={styles.form}>
                <ScrollView>

                    <TitleComponent
                        text="INGRESAR"
                        size={20}
                        style={{ color: globalColors.title, fontWeight: "bold", marginTop: 10 }}
                    />

                    <InputComponent
                        icon={'person-outline'}
                        placeholder={'Nombres'}
                        value={name}
                        keyboardType={'default'}
                        property='name'
                        onChangeText={onChange}
                    />

                    <InputComponent
                        icon={'person-outline'}
                        placeholder={'Apellidos'}
                        value={lastname}
                        keyboardType={'default'}
                        property='lastname'
                        onChangeText={onChange}
                    />

                    <InputComponent
                        icon={'mail-outline'}
                        placeholder={'Correo electrónico'}
                        value={email}
                        keyboardType={'email-address'}
                        property='email'
                        onChangeText={onChange}
                    />


                    <PhoneNumberInputComponent
                        icon="call-outline"
                        placeholder="Número de teléfono"
                        value={phone}
                        keyboardType="phone-pad"
                        property="phone"
                        onChangeText={onChange}
                    />


                    <InputComponent
                        icon={'keypad-outline'}
                        placeholder={'Contraseña'}
                        value={password}
                        keyboardType={'default'}
                        property='password'
                        onChangeText={onChange}
                        secureTextEntry={true}
                    />
                    <InputComponent
                        icon={'keypad-outline'}
                        placeholder={'Confrimar Contraseña'}
                        value={repeatPassword}
                        keyboardType={'default'}
                        property='repeatPassword'
                        onChangeText={onChange}
                        secureTextEntry={true}
                    />

                    <View>
                        <RoundedButtonComponent text='REGISTRARSE' onPress={() => {
                            register()
                        }} />
                    </View>

                    <View style={styles.formRegister}>
                        <Text>¿Tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.formRegisterText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ModalPickImage
                    openGallery={pickImage}
                    openCamera={takePhoto}
                    modalUseState={modalVisible}
                    setModalUseState={setModalVisible}
                />
                {
                    loading &&
                    <ActivityIndicator style={styles.loading} size="large" color={globalColors.buttons} />

                }

            </View>


        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    form: {
        width: '100%',
        height: '70%',
        backgroundColor: globalColors.background,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        marginBottom: 20,
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
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
});
