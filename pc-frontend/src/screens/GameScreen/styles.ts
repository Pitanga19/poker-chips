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

    sectionHandInfoContainer: {
        flexDirection: 'row',
        width: 360,
        gap: 8,
    },

    sectionStageContainer: {
        ... containerStyles.container,
        padding: 8,
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

    sectionPotListContainer: {
        ... containerStyles.container,
        padding: 12,
        width: 112,
    },

    potListContainer: {
        ... listStyles.listContainer,
        flexGrow: 1,
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

    sectionValuesContainer: {
        ... containerStyles.container,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignItems: 'stretch',
        flexGrow: 1,
    },

    sectionValuesItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    sectionValuesText: {
        ... globalStyles.text,
        gap: 4,
    },

    sectionValuesTitle: {
        ... globalStyles.title,
        flexGrow: 1,
        textAlign: 'right',
        paddingLeft: 2,
        fontSize: 14,
    },

    sectionPlayerListContainer: {
        ... containerStyles.container,
        width: 360,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'column',
        gap: 4,
    },

    playerListContainer: {
        ... listStyles.listContainer,
        width: '100%',
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
        width: '50%',
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
        flexGrow: 1,
    },

    playerActionContainer: {
        minWidth: 160,
        paddingVertical: 8,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
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