import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";
import listStyles from "../../styles/list";

const gameStyles = StyleSheet.create({
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

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListElementContainer: {
        ... listStyles.listElementContainer,
    },

    playerItemContainer: {
        ... containerStyles.container,
    },

    playerItemTitle: {
        ... globalStyles.title,
    },

    actionListContainer: {
        ... listStyles.listContainer,
    },

    actionListElementContainer: {
        ... listStyles.listElementContainer,
    },

    actionItemInput: {
        ... inputStyles.textInput,
    },

    actionItemButton: {
        ... buttonStyles.button
    },

    actionItemButtonText: {
        ... buttonStyles.buttonText,
    },
});

export default gameStyles;