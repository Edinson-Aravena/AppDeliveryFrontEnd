import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import useViewModel from './ViewModel';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/StackNavigator';
import { IconComponent } from '../../../components';
import { globalColors } from '../../../theme/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ProfileStackParamList } from '../../../navigator/ProfileStackNavigator';


export const ProfileInfoScreen = () => {
    const { user, removeUserSession } = useViewModel();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList & ProfileStackParamList>>();
    
    // Verificar si el usuario es repartidor
    const isDelivery = user?.roles?.some((role: any) => 
        role.id === 'REPARTIDOR' || role.name === 'REPARTIDOR'
    );

    console.log('User roles:', user?.roles);
    console.log('Is delivery?', isDelivery);

    useEffect(() => {
        if(user.id == ''){
            navigation.replace('LoginScreen');
        }
    }, [user])  

    return (
        <ImageBackground style={styles.container}
            source={require('../../../assets/background2.jpg')}
            resizeMode="cover">

            <View style={styles.profileImageContainer}>
                {
                    user?.image !== ''
                    &&
                    <Image
                    source={{ uri:  user?.image}} 
                    //source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
                    style={styles.profileImage}
                />
                }
                
            </View>


            <View style={styles.card}>
                <Text style={styles.cardTitle}>Información del Usuario</Text>
                <View style={styles.cardContent}>
                    <View style={styles.info}>
                        <IconComponent icon="person-outline" color={"gray"} size={26} />
                        <Text style={styles.cardText}>{user?.name} {user?.lastname}</Text>
                    </View>
                    <View style={styles.info}>
                        <IconComponent icon="mail-outline" color={"gray"} size={26} />
                        <Text style={styles.cardText}>{user?.email}</Text>
                    </View>
                    <View style={styles.info}>
                        <IconComponent icon="phone-portrait-outline" color={"gray"} size={26} />
                        <Text style={styles.cardText}>{user?.phone}</Text>
                    </View>
                </View>
            </View>

            {/* Mostrar "Mis Direcciones" solo si NO es repartidor */}
            {!isDelivery && (
                <View style={styles.menuContainer}>
                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('ProfileAddressListScreen')}
                    >
                        <View style={styles.menuItemContent}>
                            <IconComponent icon="location-outline" color={globalColors.buttons} size={26} />
                            <Text style={styles.menuItemText}>Mis Direcciones</Text>
                        </View>
                        <IconComponent icon="chevron-forward-outline" color="#666" size={24} />
                    </TouchableOpacity>
                </View>
            )}


            <Button
                title="Actualizar Perfil"
                buttonStyle={styles.updateButton}
                titleStyle={styles.updateButtonText}
                onPress={() => {
                    navigation.navigate('ProfileUpdateScreen',{user: user!});
                }}
            />

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    removeUserSession();    
                }}
            >
                <IconComponent icon="log-out-outline" color={"white"} size={26} />
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileImageContainer: {
        shadowColor: globalColors.buttons,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: globalColors.background
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cardContent: {
        marginLeft: 10,
    },
    cardText: {
        fontSize: 20,
        marginBottom: 5,
        color: '#666',
    },
    updateButton: {
        backgroundColor: globalColors.buttons,
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    updateButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF5252',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
    },
    menuContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
        fontWeight: '500',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 15,
    },
});