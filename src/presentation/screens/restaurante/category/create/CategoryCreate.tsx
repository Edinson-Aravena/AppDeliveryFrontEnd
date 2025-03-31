import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Image, ToastAndroid } from "react-native";
import { globalColors, globalStyles } from "../../../../theme/GlobalTheme";
import { InputComponent, RoundedButtonComponent, TitleComponent } from "../../../../components";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import useViewModel from "./ViewModel";
import { useEffect, useState } from "react";


export const RestaurantCategoryCreateScreen = () => {

    const { name, description, image, loading, responseMessage, onChange, takePhoto, pickImage, createCategory} = useViewModel();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(responseMessage !== '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
        
    }, [responseMessage])
    
    return (
        <ImageBackground
            style={styles.container}
            source={require('../../../../assets/background2.jpg')}
            resizeMode="cover"
        >

            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                            ? <Image
                                style={styles.logoImage}
                                source={require('../../../../assets/camera.png')}
                            //source={{uri: user?.image}}
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
                    style={{ color: globalColors.buttons, fontWeight: "bold", marginTop: 10 }}
                />
            </View>

            <View style={styles.form}>
                <ScrollView>

                    <TitleComponent
                        text="AGREGAR CATEGORÍA"
                        size={20}
                        style={{ color: globalColors.title, fontWeight: "bold", marginTop: 10 }}
                    />

                    <InputComponent
                        icon={'create-outline'}
                        placeholder={'Nombre Categoría'}
                        value={name}
                        keyboardType={'default'}
                        property='name'
                        onChangeText={onChange}
                    />

                    <InputComponent
                        icon={'document-text-outline'}
                        placeholder={'Descripción'}
                        value={description}
                        keyboardType={'default'}
                        property='description'
                        onChangeText={onChange}
                    />

                    <View>
                        <RoundedButtonComponent text='CREAR CATEGORÍA' onPress={() => {
                            createCategory()
                        }} />
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
                    <ActivityIndicator style={globalStyles.loading} size="large" color={globalColors.buttons} />

                }

            </View>
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
});