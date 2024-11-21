import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import listStyles from "../../styles/list";
import buttonStyles from "../../styles/button";

const winnerSelectStyles = StyleSheet.create({
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

    potListContainer: {
        ... listStyles.listContainer,
    },

    potListElementContainer: {
        ... listStyles.listElementContainer,
    },

    potListItemTitle: {
        ... globalStyles.title,
    },

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListButton: {
        ... buttonStyles.button,
    },

    playerListSelectedButton: {
        ... buttonStyles.selected,
    },

    playerListButtonText: {
        ... buttonStyles.buttonText,
    },

    submitButton: {
        ... buttonStyles.button,
    },

    submitButtonText: {
        ... buttonStyles.buttonText,
    },
});

export default winnerSelectStyles