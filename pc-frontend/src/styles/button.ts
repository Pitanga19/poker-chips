import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#444', // Color de fondo base
        margin: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default buttonStyles;
