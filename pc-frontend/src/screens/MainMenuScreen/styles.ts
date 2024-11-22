import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";

const mainMenuStyles = StyleSheet.create({
    main: {
        ... globalStyles.main,
        paddingTop: 48,
        gap: 24
    },

    titleContainer: {
    },

    titleText: {
        ... globalStyles.title,
        fontSize: 36,
        color: 'rgb(204, 163, 82)',
    },

    menuContainer: {
        ... containerStyles.container,
        ... containerStyles.sectionContainer,
    },

    menuElementContainer: {
        ... containerStyles.container,
        backgroundColor: 'rgb(1, 1, 1, 0)',
        gap: 4,
    },

    menuInput: {
        ... inputStyles.textInput,
        paddingVertical: 4,
        width: 120,
    },

    menuButton: {
        ... buttonStyles.button,
        ... buttonStyles.mainButton,
        width: 180,
    },

    menuButtonText: {
        ... buttonStyles.buttonText,
        ... buttonStyles.mainButtonText,
    },

    signatureContainer: {
    },

    signatureText: {
        ... globalStyles.text,
        fontSize: 12,
        color: 'rgb(204, 163, 82)',
    },
});

export default mainMenuStyles;