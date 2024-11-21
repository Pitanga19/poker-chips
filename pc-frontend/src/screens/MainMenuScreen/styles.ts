import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";

const mainMenuStyles = StyleSheet.create({
    ... globalStyles,

    mainContainer: {
        ... containerStyles.main,
    },

    menuContainer: {
        ... containerStyles.container,
    },

    menuInput: {
        ... inputStyles.textInput,
    },

    menuButton: {
        ... buttonStyles.button
    },

    menuButtonText: {
        ... buttonStyles.buttonText
    },
});

export default mainMenuStyles;