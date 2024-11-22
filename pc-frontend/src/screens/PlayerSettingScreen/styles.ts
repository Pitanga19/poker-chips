import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";
import listStyles from "../../styles/list";

const playerSelectStyles = StyleSheet.create({
    main: {
        ... globalStyles.main,
        paddingVertical: 12,
        gap: 12,
        justifyContent: 'space-between',
    },

    mainContainer: {
        width: 280,
        gap: 12,
    },

    mainFormContainer: {
        width: 280,
        gap: 12,
    },

    mainText: {
        ... globalStyles.text,
        fontSize: 14,
    },

    sectionContainer: {
        ... containerStyles.container,
        ... containerStyles.sectionContainer,
        gap: 8,
    },

    sectionTitle: {
        ... globalStyles.title,
        fontSize: 14,
    },

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListElementContainer: {
        ... listStyles.listElementContainer,
        width: 240,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(44, 44, 44)',
        marginVertical: 4,
        padding: 4,
    },

    playerListTitle: {
        ... globalStyles.title,
    },

    newPlayerUserInput: {
        ... inputStyles.textInput,
        margin: 0,
        width: '100%',
    },

    newPlayerChipSection: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },

    newPlayerChipInput: {
        ... inputStyles.textInput,
        minWidth: 112,
    },

    newPlayerButton: {
        ... buttonStyles.button,
        justifyContent: 'center',
        flexGrow: 1,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },

    newPlayerButtonText: {
        ... buttonStyles.buttonText,
        fontSize: 12,
    },

    submitButton: {
        ... buttonStyles.button,
        ... buttonStyles.mainButton,
    },

    submitButtonText: {
        ... buttonStyles.buttonText,
        ... buttonStyles.mainButtonText,
    },
})

export default playerSelectStyles;