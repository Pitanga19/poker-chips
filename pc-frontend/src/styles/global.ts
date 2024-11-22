import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
    },

    title: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
    },

    text: {
        color: '#fff',
        fontSize: 12,
    },
});

export default globalStyles;
