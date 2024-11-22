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
});

export default mainMenuStyles;