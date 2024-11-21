import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";
import listStyles from "../../styles/list";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
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

    actionContainer: {
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

    selected: {
        backgroundColor: '#afa'
    },
});

const playerSelectStyles = StyleSheet.create({
    ... globalStyles,

    mainContainer: {
        ... containerStyles.main,
    },

    mainText: {
        ... globalStyles.text,
    },

    sectionContainer: {
        ... containerStyles.container,
    },

    sectionTitle: {
        ... globalStyles.title,
    },

    newPlayerInput: {
        ... inputStyles.textInput,
    },

    newPlayerButton: {
        ... buttonStyles.button,
    },

    newPlayerButtonText: {
        ... buttonStyles.buttonText,
    },

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListElementContainer: {
        ... listStyles.listElementContainer,
    },

    submitButton: {
        ... buttonStyles.button,
    },

    submitButtonText: {
        ... buttonStyles.buttonText,
    },
})

export default playerSelectStyles