import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IconComponent } from "./IconComponent";
import { globalColors } from "../theme/GlobalTheme";

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

    useEffect(() => {
        if (value) {
            const matchedCountry = countries.find((c) => value.startsWith(c.value));
            const code = matchedCountry ? matchedCountry.value : "+56";
            const number = value.replace(code, "");

            setCountryCode(code);
            setPhoneNumber(number);
        }
    }, [value]);

    const handlePhoneChange = (text: string) => {
        const cleanedNumber = text.replace(/[^0-9]/g, "");
        setPhoneNumber(cleanedNumber);
        onChangeText(property, `${countryCode}${cleanedNumber}`);
    };

    const handleCountryChange = (newCode: string) => {
        setCountryCode(newCode);
        onChangeText(property, `${newCode}${phoneNumber}`);
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

