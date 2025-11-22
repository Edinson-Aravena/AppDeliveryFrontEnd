import React from "react";
import { TextInput, TextStyle, KeyboardTypeOptions, View, StyleSheet } from "react-native";
import { IconComponent } from "./IconComponent";
import { globalColors } from "../theme/GlobalTheme";

interface InputProps {
    icon: string;
    placeholder: string;
    value: string;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    property: string;
    editable?: boolean;
    onChangeText: (property: string, value: any) => void;
}

export const InputComponent = ({
    icon,
    placeholder = "Default Placeholder",
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    editable = true,
    onChangeText }: InputProps) => {

    const handleTextChange = (text: string) => {
        // Si es campo de nombre o apellido, remover números
        if (property === 'name' || property === 'lastname') {
            const textWithoutNumbers = text.replace(/[0-9]/g, '');
            onChangeText(property, textWithoutNumbers);
        } else {
            onChangeText(property, text);
        }
    };

    return (
        <View style={styles.formInput}>
            <IconComponent icon={icon} color={globalColors.buttons} size={40} />
            <TextInput
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={handleTextChange}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.buttons
    },
})