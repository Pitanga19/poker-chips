import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import listStyles from "../../styles/list";
import buttonStyles from "../../styles/button";

const winnerSelectStyles = StyleSheet.create({
    main: {
        ... globalStyles.main,
        paddingVertical: 12,
        gap: 12,
        justifyContent: 'space-between',
    },

    mainText: {
        ... globalStyles.text,
    },

    sectionContainer: {
        ... containerStyles.container,
        padding: 12,
        minWidth: 240,
    },

    sectionTitle: {
        ... globalStyles.title,
    },

    potListContainer: {
        ... listStyles.listContainer,
        width: '100%',
    },

    potListElementContainer: {
        ... listStyles.listElementContainer,
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: 'rgb(44, 44, 44)'
    },

    potListItemTitle: {
        ... globalStyles.title,
    },

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListButton: {
        ... buttonStyles.unselected,
        marginVertical: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },

    playerListSelectedButton: {
        ... buttonStyles.button,
    },

    playerListButtonText: {
        ... buttonStyles.unselectedText,
    },

    playerListSelectedButtonText: {
        ... buttonStyles.buttonText,
    },

    submitButton: {
        ... buttonStyles.button,
        ... buttonStyles.mainButton,
    },

    submitButtonText: {
        ... buttonStyles.buttonText,
        ... buttonStyles.mainButtonText,
    },
});

export default winnerSelectStyles