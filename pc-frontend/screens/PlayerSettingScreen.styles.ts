import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    container: {
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '233',
        margin: 10,
        padding: 10,
    },

    mainText: {
        color: '#fff'
    },

    listContainer: {
        flexGrow: 0,
    },

    listElementContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#fff',
        margin: 10,
        padding: 10,
    },

    userContainer: {
        borderWidth: 2,
        borderColor: '#fff',
        margin: 10,
        padding: 10,
    },

    button: {
        borderWidth: 2,
        borderColor: '#fff',
        margin: 10,
        padding: 10,
    },

    input: {
        borderWidth: 2,
        borderColor: '#fff',
        margin: 10,
        padding: 10,
        color: '#fff'
    },
});

export default styles