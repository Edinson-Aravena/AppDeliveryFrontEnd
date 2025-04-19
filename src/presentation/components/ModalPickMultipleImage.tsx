import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RoundedButtonComponent } from './RoundedButtonComponent';

interface Props {
    openGallery: (numberImage: number) => void;
    openCamera: (numberImage: number) => void;
    numberImage: number;
    modalUseState: boolean;
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>

}
export const ModalPickMultipleImage = ({ openGallery, openCamera, modalUseState, setModalUseState, numberImage}: Props) => {
    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalUseState}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalUseState(!modalUseState);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Selecciona una opción</Text>
                            <RoundedButtonComponent
                                text={'Galería'}
                                onPress={() => {
                                    openGallery(numberImage),
                                    setModalUseState(false)
                                }}
                            />
                            <RoundedButtonComponent
                                text={'Cámara'}
                                onPress={() => {
                                    openCamera(numberImage),
                                    setModalUseState(false)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


