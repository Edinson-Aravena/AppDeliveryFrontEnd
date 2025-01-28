import React from "react";
import { TextInput, TextStyle, KeyboardTypeOptions } from "react-native";

interface InputProps {
    placeholder: string;
    size?: number;
    style?: TextStyle;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
}

export const InputComponent = ({ placeholder = "Default Placeholder", size = 25, style, keyboardType, secureTextEntry = false}: InputProps) => {
    return (
        <TextInput
            placeholder={placeholder}
            style={[{ fontSize: size }, style]}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
        />
    );
};
