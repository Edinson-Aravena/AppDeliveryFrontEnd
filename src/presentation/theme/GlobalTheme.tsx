import { StyleSheet } from 'react-native';

export const globalColors = {
    menu: '#FF5722',
    buttons: '#4CAF50',
    title: '#212121', 
    info: '#757575', 
    background: '#F9F9F9' 
}
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.background
    },

    primaryButton: {
        backgroundColor: globalColors.menu,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
})