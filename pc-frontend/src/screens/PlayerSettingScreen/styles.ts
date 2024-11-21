import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";
import listStyles from "../../styles/list";

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