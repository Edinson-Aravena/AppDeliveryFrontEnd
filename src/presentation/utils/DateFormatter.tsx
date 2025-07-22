import React from 'react'

export const DateFormatter = (timestamp: number): string => {

    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return date.toLocaleDateString('es-ES', options);
}
