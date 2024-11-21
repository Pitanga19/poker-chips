import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";

const mainMenuStyles = StyleSheet.create({
    main: {
        ... globalStyles.main,
        paddingTop: 48,
    },

    menuContainer: {
        ... containerStyles.container,
        padding: 24,
    },

    menuElementContainer: {
        ... containerStyles.container,
        backgroundColor: 'rgb(1, 1, 1, 0)',
        margin: 0,
        padding: 0,
        gap: 4,
    },

    menuInput: {
        ... inputStyles.textInput,
        paddingVertical: 4,
        width: 120,
    },

    menuButton: {
        ... buttonStyles.button,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: 160,
    },

    menuButtonText: {
        ... buttonStyles.buttonText,
        fontSize: 20,
    },
});

export default mainMenuStyles;