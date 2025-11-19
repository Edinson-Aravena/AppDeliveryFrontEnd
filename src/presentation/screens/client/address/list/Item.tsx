import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Address } from '../../../../../domain/entities/Address';
import { RadioButton } from 'react-native-paper';
import { IconComponent } from '../../../../components';
import { globalColors } from '../../../../theme/GlobalTheme';

interface Props{
    address: Address;
    checked: string;
    changeRadioValue: (address: Address) => void;
    onDelete: (id: string) => void;
}

export const AddressListItem = ({address, checked, changeRadioValue, onDelete }:Props) => {
    const isSelected = checked === address.id;
    
    const handleDelete = () => {
        console.log('handleDelete llamado para:', address.id);
        
        if (!onDelete) {
            console.error('onDelete no está definido');
            return;
        }
        
        try {
            Alert.alert(
                'Eliminar dirección',
                `¿Estás seguro de que deseas eliminar esta dirección?\n\n${address.address}`,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => console.log('Cancelado')
                    },
                    {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => {
                            console.log('Confirmado eliminar:', address.id);
                            onDelete(address.id!);
                        }
                    }
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.error('Error en Alert:', error);
        }
    };
    
    return (
        <View style={[styles.container, isSelected && styles.containerSelected]}>
            <View style={styles.content}>
                <TouchableOpacity 
                    style={styles.selectableArea}
                    onPress={() => changeRadioValue(address)}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <IconComponent 
                            icon={isSelected ? "location" : "location-outline"} 
                            color={isSelected ? globalColors.buttons : "#666"} 
                            size={24} 
                        />
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={[styles.address, isSelected && styles.addressSelected]}>
                            {address.address}
                        </Text>
                        <View style={styles.neighborhoodContainer}>
                            <IconComponent icon="business-outline" color="#999" size={14} />
                            <Text style={styles.neighborhood}>{address.neighborhood}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDelete}
                        activeOpacity={0.7}
                    >
                        <IconComponent icon="trash-outline" color="#FF3B30" size={20} />
                    </TouchableOpacity>
                    
                    <RadioButton
                        value={address.id!}
                        status={isSelected ? 'checked' : 'unchecked'}
                        onPress={() => changeRadioValue(address)}
                        color={globalColors.buttons}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e8e8e8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    containerSelected: {
        borderColor: globalColors.buttons,
        backgroundColor: '#fff8f0',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    selectableArea: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        marginRight: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    address: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        lineHeight: 20,
    },
    addressSelected: {
        color: globalColors.buttons,
    },
    neighborhoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    neighborhood: {
        fontSize: 13,
        color: '#999',
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
});