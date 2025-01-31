import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ToastAndroid, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { globalColors } from '../../../config/theme/GlobalTheme';
import { TitleComponent, InputComponent, RoundedButtonComponent } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/StackNavigator';
import useViewModel from './ViewModel'
import { PhoneNumberInputComponent } from '../../components/InputComponentPhone';

export const RegisterScreen = () => {

    const { names, surnames, email, phone, password, repeatPassword, onChange, register } = useViewModel();

    const [phoneNumber, setPhoneNumber] = useState('');


    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../../assets/background.jpg')}
            resizeMode="cover"
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../assets/user_image.png')}
                />
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
                        value={names}
                        keyboardType={'default'}
                        property='names'
                        onChangeText={onChange}
                    />

                    <InputComponent
                        icon={'person-outline'}
                        placeholder={'Apellidos'}
                        value={surnames}
                        keyboardType={'default'}
                        property='surnames'
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
                        <RoundedButtonComponent text='REGISTRARSE' onPress={() => register()} />
                    </View>

                    <View style={styles.formRegister}>
                        <Text>¿Tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.formRegisterText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
    }
});
