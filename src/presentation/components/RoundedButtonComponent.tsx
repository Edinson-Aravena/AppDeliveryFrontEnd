import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { globalColors } from '../../config/theme/GlobalTheme'

interface RoundedButtonProps {
    text: string;
    onPress: () => void;
}
export const RoundedButtonComponent = ({text, onPress}:RoundedButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.roundedButton}
        >
            <Text style={{color: 'white'}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        height: 50 ,
        backgroundColor: globalColors.buttons,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 25,
    },
    textButton: {
        color: 'white'
    }
})