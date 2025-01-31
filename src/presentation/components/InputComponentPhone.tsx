import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IconComponent } from "./IconComponent";
import { globalColors } from "../../config/theme/GlobalTheme";

const countries = [
    { label: "🇨🇱 +56", value: "+56" },
    { label: "🇦🇷 +54", value: "+54" },
];

interface InputProps {
    icon: string;
    placeholder: string;
    value: string;
    keyboardType: "default" | "numeric" | "phone-pad";
    property: string;
    onChangeText: (property: string, value: any) => void;
}

export const PhoneNumberInputComponent = ({
    icon,
    placeholder,
    value,
    keyboardType,
    property,
    onChangeText,
}: InputProps) => {
    const [countryCode, setCountryCode] = useState("+56");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneChange = (text: string) => {
        const cleanedNumber = text.replace(/[^0-9]/g, ""); // Limpiar el input
        setPhoneNumber(cleanedNumber);
        onChangeText(property, `${countryCode}${cleanedNumber}`); // Concatenar código de país
    };

    const handleCountryChange = (value: string) => {
        setCountryCode(value);
        onChangeText(property, `${value}${phoneNumber}`); // Actualizar con el nuevo código de país
    };

    return (
        <View style={styles.container}>
            <IconComponent icon={icon} color={globalColors.buttons} size={40} />

            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={handleCountryChange}
                    items={countries}
                    value={countryCode}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 30,
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 120, // Ajusta según el espacio necesario
        justifyContent: "center",
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.buttons,
        padding: 5,
        fontSize: 16,
        marginLeft: 10,
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: "black",
        textAlign: "center", // Centrar la bandera y el código de país
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: "black",
        textAlign: "center",
    },
};

