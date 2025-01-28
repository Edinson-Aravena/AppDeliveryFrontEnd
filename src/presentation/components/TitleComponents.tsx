import React from "react";
import { Text, TextStyle } from "react-native";

interface TitleProps {
    text: string;
    size?: number;
    style?: TextStyle;
}

export const TitleComponent = ({ text = "Default Title", size = 25, style }: TitleProps) => {
    return (
        <Text style={[{ fontSize: size }, style]}>
            {text}
        </Text>
    );
};
