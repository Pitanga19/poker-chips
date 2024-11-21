import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222', // Fondo base
    },

    title: {
        color: '#fff',
        fontSize: 16,
    },

    text: {
        color: '#fff', // Color de texto por defecto
        fontSize: 12,
    },
});

export default globalStyles;
