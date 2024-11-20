import { StyleSheet } from 'react-native';

const listStyles = StyleSheet.create({
    listElementContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    selected: {
        backgroundColor: '#afa', // Fondo de un elemento seleccionado
    },
});

export default listStyles;
