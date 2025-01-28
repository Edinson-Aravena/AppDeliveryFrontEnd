import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native';
import { globalColors } from '../../../config/theme/GlobalTheme';
import { TitleComponent, IconComponent, InputComponent, RoundedButtonComponent } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/StackNavigator';

export const LoginScreen = () => {

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
                    source={require('../../../assets/logo.png')}
                />
                <TitleComponent
                    text="Rapidos Y Sabrosos"
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

                    <View style={styles.formInput}>
                        <IconComponent icon="mail-outline" color={globalColors.buttons} size={40} />

                        <InputComponent
                            placeholder='Correo electronico'
                            size={15}
                            style={{ flex: 1, borderBottomColor: '#EBEBEB', borderBottomWidth: 1 }}
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={styles.formInput}>
                        <IconComponent icon="keypad-outline" color={globalColors.buttons} size={40} />

                        <InputComponent
                            placeholder='Contraseña'
                            size={15}
                            style={{ flex: 1, borderBottomColor: '#EBEBEB', borderBottomWidth: 1 }}
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                    </View>

                    <View>
                        <RoundedButtonComponent text='ENTRAR' onPress={() => ToastAndroid.show('Entrar', ToastAndroid.LONG)} />
                    </View>

                    <View style={styles.formRegister}>
                        <Text>¿No tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={styles.formRegisterText}>Registrate</Text>
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
        height: '40%',
        backgroundColor: globalColors.background,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
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

