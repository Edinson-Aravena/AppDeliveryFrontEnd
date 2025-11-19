import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { globalColors } from '../../../theme/GlobalTheme';
import { InputComponent, RoundedButtonComponent } from '../../../components';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigator/StackNavigator';
import useViewModel from './ViewModel'
import { PhoneNumberInputComponent } from '../../../components/InputComponentPhone';
import { ModalPickImage } from '../../../components/ModalPickImage';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'> { }

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {

    const {user} = route.params;
    const { name, lastname, email, phone, image, onChange,onChangeInfoUpdate, update, loading, pickImage, takePhoto, errorMessage, successMessage } = useViewModel(user);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(errorMessage != ''){
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])

    useEffect(() => {
        if(successMessage != ''){
            ToastAndroid.show(successMessage, ToastAndroid.LONG)
        }
    }, [successMessage])

    console.log(phone)

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with background */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Actualizar Perfil</Text>
                </View>

                {/* Profile Image Section */}
                <View style={styles.imageSection}>
                    <TouchableOpacity 
                        onPress={() => setModalVisible(true)}
                        style={styles.imageContainer}
                    >
                        {
                            image == ''
                                ? <Image
                                    style={styles.profileImage}
                                    source={require('../../../assets/user.png')}
                                />
                                : <Image
                                    style={styles.profileImage}
                                    source={{ uri: image }}
                                />
                        }
                        <View style={styles.cameraButton}>
                            <Text style={styles.cameraIcon}>📷</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.imageHint}>Toca para cambiar foto</Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Nombre</Text>
                        <InputComponent
                            icon={'person-outline'}
                            placeholder={'Tu nombre'}
                            value={name}
                            keyboardType={'default'}
                            property='name'
                            onChangeText={onChange}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Apellido</Text>
                        <InputComponent
                            icon={'person-outline'}
                            placeholder={'Tu apellido'}
                            value={lastname}
                            keyboardType={'default'}
                            property='lastname'
                            onChangeText={onChange}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Teléfono</Text>
                        <PhoneNumberInputComponent
                            icon="call-outline"
                            placeholder="Número de teléfono"
                            value={phone}
                            keyboardType="phone-pad"
                            property="phone"
                            onChangeText={onChange}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <RoundedButtonComponent 
                            text='ACTUALIZAR' 
                            onPress={() => update()} 
                        />
                    </View>
                </View>

                <ModalPickImage
                    openGallery={pickImage}
                    openCamera={takePhoto}
                    modalUseState={modalVisible}
                    setModalUseState={setModalVisible}
                />
                
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={globalColors.buttons} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: globalColors.buttons,
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    imageSection: {
        alignItems: 'center',
        marginTop: -50,
        marginBottom: 20,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: '#f0f0f0',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: globalColors.buttons,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },
    cameraIcon: {
        fontSize: 16,
    },
    imageHint: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    formSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    buttonContainer: {
        marginTop: 10,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
