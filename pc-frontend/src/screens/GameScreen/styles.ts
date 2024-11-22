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
        flexDirection: 'column',
        gap: 4,
    },

    sectionTitle: {
        ... globalStyles.title,
    },

    sectionCardContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },

    sectionCardItem: {
        height: 24,
        width: 16,
        borderRadius: 2,
        backgroundColor: 'rgb(44, 44, 44)',
    },

    sectionShowedCardItem: {
        backgroundColor: '#c22',
    },

    potListContainer: {
        ... listStyles.listContainer,
        minWidth: 160,
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

    playerItemTitleContainer: {
        flexDirection: 'row',
    },

    playerItemTitle: {
        ... globalStyles.title,
    },

    playerDealerChip: {
        flex: 0,
        height: 22,
        width: 22,
        borderRadius: 50,
        marginLeft: 4,
        backgroundColor: '#c22',
        justifyContent: 'center',
        alignItems: 'center'
    },

    playerDealerChipText: {
        ... globalStyles.title,
        textAlign: 'center',
        fontSize: 12,
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
        paddingRight: 8,
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

    actionItemInput: {
        ... inputStyles.textInput,
        height: 24,
        backgroundColor: 'rgb(64, 64, 64)',
        justifyContent: 'center',
        width: 68,
        padding: 0,
        fontSize: 12,
        textAlign: 'center',
    },

    actionItemButton: {
        ... buttonStyles.button,
        height: 24,
        flexGrow: 1,
        justifyContent: 'center',
    },

    actionItemButtonText: {
        ... buttonStyles.buttonText,
        textAlign: 'center',
    },
});

export default gameStyles;