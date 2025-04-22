import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Image, ToastAndroid } from "react-native";
import { globalColors, globalStyles } from "../../../../theme/GlobalTheme";
import { IconComponent, InputComponent, RoundedButtonComponent, TitleComponent } from "../../../../components";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import useViewModel from "./ViewModel"
import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/RestaurantProductNavigator";
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImage";

interface Props extends StackScreenProps<ProductStackParamList, 'RestaurantProductCreateScreen'>{};

export const RestaurantProductCreateScreen = ({navigation, route}:Props) => {

    const {category} = route.params;
    const { name, description, image1, image2, image3, price, loading, responseMessage, onChange, takePhoto, pickImage, createProduct } = useViewModel(category);
    const [modalVisible, setModalVisible] = useState(false);
    const [numberImage, setNumberImage] = useState(1)

    useEffect(() => {
        if (responseMessage !== '') {
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <TouchableOpacity onPress={() => {
                        setNumberImage(1)
                        setModalVisible(true)
                    }}>
                        {
                            image1 == ''
                                ? <Image
                                    style={styles.logoImage}
                                    source={require('../../../../assets/camera.png')}
                                //source={{uri: user?.image}}
                                />
                                : <Image
                                    style={styles.logoImage}
                                    source={{ uri: image1 }}
                                />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setNumberImage(2)
                        setModalVisible(true)
                    }}>
                        {
                            image2 == ''
                                ? <Image
                                    style={styles.logoImage}
                                    source={require('../../../../assets/camera.png')}
                                //source={{uri: user?.image}}
                                />
                                : <Image
                                    style={styles.logoImage}
                                    source={{ uri: image2 }}
                                />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setNumberImage(3);
                        setModalVisible(true)
                    }}>
                        {
                            image3 == ''
                                ? <Image
                                    style={styles.logoImage}
                                    source={require('../../../../assets/camera.png')}
                                //source={{uri: user?.image}}
                                />
                                : <Image
                                    style={styles.logoImage}
                                    source={{ uri: image3 }}
                                />
                        }
                    </TouchableOpacity>
                </View>

                <TitleComponent
                    text="Selecciona 3 imagenes "
                    size={30}
                    style={{ color: globalColors.buttons, fontWeight: "bold", marginTop: 10 }}
                />
            </View>

            <View style={styles.form}>
                <ScrollView>

                    <TitleComponent
                        text="AGREGAR PRODUCTO"
                        size={20}
                        style={{ color: globalColors.title, fontWeight: "bold", marginTop: 10 }}
                    />

                    <InputComponent
                        icon={'create-outline'}
                        placeholder={'Nombre producto'}
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

                    <InputComponent
                        icon={'cash-outline'}
                        placeholder={'Precio'}
                        value={price}
                        keyboardType={'numeric'}
                        property='price'
                        onChangeText={onChange}
                    />

                    <View style={styles.containerCategory}>
                        <IconComponent icon={"newspaper-outline"} size={40} color={globalColors.buttons}/>
                        <Text style={{ fontSize: 20, color: globalColors.info}}>Categoria : </Text>
                        <Text style={{ fontSize: 15, color: globalColors.info, fontWeight: 'bold'  }}>{category.name}</Text>
                    </View>

                    <View>
                        <RoundedButtonComponent text='CREAR PRODUCTO' onPress={() => {
                            createProduct()
                        }} />
                    </View>

                </ScrollView>
                <ModalPickMultipleImage
                    openGallery={pickImage}
                    openCamera={takePhoto}
                    modalUseState={modalVisible}
                    setModalUseState={setModalVisible} 
                    numberImage={numberImage}                />
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
    containerCategory: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    }
});