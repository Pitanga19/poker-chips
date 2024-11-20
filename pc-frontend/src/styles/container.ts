import { StyleSheet } from 'react-native';

const containerStyles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#333', // Corrige '#233' a un código válido
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    listContainer: {
        flexGrow: 0,
    },
});

export default containerStyles;
