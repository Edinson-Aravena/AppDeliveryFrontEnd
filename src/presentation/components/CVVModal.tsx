import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { IconComponent } from '../components';
import { globalColors } from '../theme/GlobalTheme';

interface CVVModalProps {
    visible: boolean;
    cardLastFour: string;
    onConfirm: (cvv: string) => void;
    onCancel: () => void;
    loading?: boolean;
}

export const CVVModal = ({ visible, cardLastFour, onConfirm, onCancel, loading }: CVVModalProps) => {
    const [cvv, setCvv] = useState('');

    const handleConfirm = () => {
        if (cvv.length >= 3) {
            onConfirm(cvv);
        }
    };

    const handleClose = () => {
        setCvv('');
        onCancel();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <TouchableOpacity 
                style={styles.overlay}
                activeOpacity={1}
                onPress={handleClose}
            >
                <TouchableOpacity 
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View style={styles.header}>
                        <IconComponent icon="card-outline" size={40} color={globalColors.buttons} />
                        <Text style={styles.title}>Verificación de seguridad</Text>
                        <Text style={styles.subtitle}>Tarjeta •••• {cardLastFour}</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.label}>Código CVV</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="123"
                            keyboardType="number-pad"
                            maxLength={4}
                            value={cvv}
                            onChangeText={setCvv}
                            autoFocus
                            editable={!loading}
                        />
                        <Text style={styles.hint}>
                            Ingresa el código de seguridad de 3 o 4 dígitos que aparece en el reverso de tu tarjeta
                        </Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton, (cvv.length < 3 || loading) && styles.buttonDisabled]}
                            onPress={handleConfirm}
                            disabled={cvv.length < 3 || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.confirmButtonText}>Continuar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        marginTop: 12,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
    },
    content: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#dee2e6',
        borderRadius: 12,
        padding: 16,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 4,
        color: '#212529',
    },
    hint: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 8,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    cancelButtonText: {
        color: '#495057',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: globalColors.buttons,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});
