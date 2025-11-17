import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ToastAndroid, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { globalColors } from '../../theme/GlobalTheme';
import { TitleComponent, IconComponent, InputComponent, RoundedButtonComponent } from '../../components';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/StackNavigator';
import useViewModel from './ViewModel'

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'>{};

export const LoginScreen = ({navigation, route}:Props) => {

    const { email, password, onChange, login, errorMessage, user } = useViewModel();

    

    useEffect(() => {
        if(errorMessage !== ""){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])
    
    useEffect(() => {
        if(user?.id != null && user?.id != undefined && user?.id != "") {   
            if(user.roles?.length! > 1){
                // Si tiene más de un rol, mostrar pantalla de selección
                navigation.replace('RolesScreen')
            } else if(user.roles?.length === 1){
                // Si tiene solo un rol, navegar directamente según el rol
                const rolName = user.roles[0].name?.trim().toUpperCase();
                if(rolName === "RESTAURANTE"){
                    navigation.replace('RestaurantBottomTabsnavigator')
                } else if(rolName === "CLIENTE"){
                    navigation.replace('ClientBottomTabsnavigator')
                } else if(rolName === "REPARTIDOR"){
                    navigation.replace('DeliveryBottomTabsnavigator')
                } else {
                    // Por defecto, si el rol no coincide, ir a cliente
                    navigation.replace('ClientBottomTabsnavigator')
                }
            } else {
                // Si no tiene roles, ir a cliente por defecto
                navigation.replace('ClientBottomTabsnavigator')
            }
        }
    }, [user])
    
    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoImage}
                    source={require('../../assets/logo.png')}
                />
                <TitleComponent
                    text="Las Araucarias"
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
                        icon={'mail-outline'}
                        placeholder={'Correo electrónico'}
                        value={email}
                        keyboardType={'email-address'}
                        property='email'
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

                    <View style={{ marginTop: 20 }}>
                        <RoundedButtonComponent text='ENTRAR' onPress={ login } />
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

