import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import containerStyles from "../../styles/container";
import inputStyles from "../../styles/input";
import buttonStyles from "../../styles/button";
import listStyles from "../../styles/list";

const gameStyles = StyleSheet.create({
    main: {
        ... globalStyles.main,
        paddingVertical: 12,
        gap: 12,
    },

    mainText: {
        ... globalStyles.text,
    },

    sectionContainer: {
        ... containerStyles.container,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    sectionTitle: {
        ... globalStyles.title,
    },

    potListContainer: {
        ... listStyles.listContainer,
    },

    potListElementContainer: {
        ... listStyles.listElementContainer,
        ... containerStyles.container,
        backgroundColor: 'rgb(44, 44, 44)',
        marginVertical: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    potListTitle: {
        ... globalStyles.title,
        fontSize: 12,
    },

    playerListContainer: {
        ... listStyles.listContainer,
    },

    playerListElementContainer: {
        ... listStyles.listElementContainer,
        backgroundColor: 'rgb(44, 44, 44)',
        flexDirection: 'row',
        alignItems: 'stretch',
        marginVertical: 4,
    },

    playerContainer: {
        justifyContent: 'center',
        padding: 8,
        gap: 4,
    },

    playerItemTitle: {
        ... globalStyles.title,
    },

    playerItemText: {
        ... globalStyles.text,
        textAlign: 'center',
    },

    playerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    playerImageContainer: {
        maxWidth: 56,
    },

    playerImage: {
        width: 56,
        height: 56,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },

    playerChips: {
        minWidth: 80,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    playerActionContainer: {
        minWidth: 160,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    actionListContainer: {
        ... listStyles.listContainer,
        width: '100%',
        gap: 4,
    },

    actionListElementContainer: {
        ... listStyles.listElementContainer,
        flexDirection: 'row',
        gap: 4,
    },

    actionItemSection: {
        ... inputStyles.textInput,
        flex: 1,
        padding: 0,
        height: 24,
    },

    actionItemInput: {
        ... inputStyles.textInput,
        justifyContent: 'center',
        height: '100%',
        padding: 0,
        fontSize: 12,
        textAlign: 'center',
    },

    actionItemButton: {
        ... buttonStyles.button,
        padding: 0,
        justifyContent: 'center',
        height: '100%',
    },

    actionItemButtonText: {
        ... buttonStyles.buttonText,
        textAlign: 'center',
    },
});

export default gameStyles;