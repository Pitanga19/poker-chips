import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222', // Fondo base
    },
    text: {
        color: '#fff', // Color de texto por defecto
        fontSize: 16,
    },
});

export default globalStyles;
