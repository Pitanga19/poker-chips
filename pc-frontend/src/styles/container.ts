import { StyleSheet } from 'react-native';

const containerStyles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
    },

    container: {
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#222',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },

    listContainer: {
        flexGrow: 0,
    },
});

export default containerStyles;
