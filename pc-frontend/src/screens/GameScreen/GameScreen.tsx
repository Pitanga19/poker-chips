import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Alert, Image } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { IP, PORT, toExecuteValidatorType, ActionType, Pot, PlayerManager, Player, PositionManager, HandStage, BettingStage, BettingStageType } from '../../utils/constants';
import { isNumericString, getFloorFromString } from '../../utils/functions';

type GameScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

const GameScreen = () => {
    const navigation = useNavigation<GameScreenScreenNavigationProp>();
    const isFocused = useIsFocused();
    const [potList, setPotList] = useState<Pot[]>([]);
    const [playerManager, setPlayerManager] = useState<PlayerManager | null>(null);
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [positionManager, setPositionManager] = useState<PositionManager | null>(null);
    const [handStage, setHandStage] = useState<HandStage | null>(null);
    const [bettingStage, setBettingStage] = useState<BettingStage | null>(null);
    const [toExecuteValidator, setToExecuteValidator] = useState<toExecuteValidatorType>(toExecuteValidatorType.HandStageValidator);
    const [avalibleActions, setAvalibleActions] = useState<ActionType[]>([]);
    const [amount, setAmount] = useState<string>('');
    const [handleFetching, setHandleFetching] = useState<boolean>(true);

    const fetchGameData = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentGame`);
            const data = await response.json();

            setPotList(data.potManager?.potList);
            setPlayerManager(data.playerManager);
            setPlayerList(data.playerManager?.playerList);
            setPositionManager(data.positionManager);
            setHandStage(data.handStage);
            setBettingStage(data.bettingStage);
        } catch (error) {
            console.error('Error fetching game:', error);
        };
    };

    const fetchToExecuteValidatorData = async () =>{
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentToExecuteValidator`);
            const data = await response.json();

            console.log('To execute validator received:', data);
            setToExecuteValidator(data);
        } catch (error) {
            console.error('Error fetching game:', error);
        };

        if (toExecuteValidator !== toExecuteValidatorType.ActionSelector){
            setHandleFetching(!handleFetching);
        };
    };

    const fetchAvalibleActionsData = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/avalibleActions`);
            const data = await response.json();

            console.log('Avalible actions received:', data);
            setAvalibleActions(data);
        } catch (error) {
            console.error('Error fetching avalible actions:', error);
        };
    };

    const winnerSelect = () =>{
        if (!potList || potList.length === 0) {
            Alert.alert('Error', 'Not pot founded.');
            return;
        }

        console.log('Pots waiting for winners:', potList);
        navigation.navigate('WinnerSelect');
    };

    useEffect(() => {
        fetchGameData();

        if (toExecuteValidator === toExecuteValidatorType.ActionSelector) {
            fetchAvalibleActionsData();
        } else if (toExecuteValidator === toExecuteValidatorType.WinnerSelector) {
            winnerSelect();
        } else if (toExecuteValidator === toExecuteValidatorType.GameOver) {
            navigation.navigate('MainMenu');
        } else {
            fetchToExecuteValidatorData();
        };
    }, [handleFetching]);

    useEffect(() => {
        setToExecuteValidator(toExecuteValidatorType.HandStageValidator);
        
        if (isFocused) {
            setHandleFetching(!handleFetching);
        }
    }, [isFocused]);

    const renderPot = ({item}: {item: Pot}) => {
        return (
            <View style={ styles.potListElementContainer }>
                <Text style={ styles.potListTitle }>
                    Pot { item.chips }
                </Text>
            </View>
        );
    };

    const renderPlayer = ({ item }: { item: Player}) => {
        const isDealer = playerList.findIndex(p => p.id ===item.id) === positionManager?.dealerIndex;
        const isCurrentTurn = positionManager? item.id === playerManager?.playerList[positionManager.turnIndex].id : null;
        
        return (
            <View style={ styles.playerListElementContainer }>
                <View style={ styles.playerContainer }>
                    <View style={ styles.playerItemTitleContainer }>
                        <Text style={ styles.playerItemTitle }>
                            { item.id }
                        </Text>
                        { isDealer && (<View style={ styles.playerDealerChip }>
                            <Text style={ styles.playerDealerChipText }>D</Text>
                        </View>)}
                    </View>
                    <View style={ styles.playerInfoContainer}>
                        <View style={ styles.playerImageContainer }>
                                <Image
                                    style={ styles.playerImage }
                                    source={require('../../assets/default-user.png')
                                }/>
                        </View>
                        <View style={ styles.playerChips }>
                            <View>
                                <Text style={ styles.playerItemText }>Chips: {item.chips}</Text>
                                <Text style={ styles.playerItemText }>Betting: {item.pendingChips}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={ styles.playerActionContainer }>
                    {isCurrentTurn && (
                        <FlatList 
                            data={ avalibleActions }
                            renderItem={ renderAction }
                            keyExtractor={ (item) => item }
                            style={ styles.actionListContainer }
                        />
                        )
                    }
                </View>
            </View>
        );
    };

    const handleActionPress = async (action: ActionType) => {
        console.log('Sending action:', action);
        const isBet = action === ActionType.Bet;
        const isRaise = action === ActionType.Raise;

        const payload = {
            action: action,
            amount: isBet || isRaise ? parseInt(amount) : undefined
        };

        try {
            const response = await fetch(`http://${IP}:${PORT}/api/playerAction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.message) {
                console.error('Action error:', data.message);
            } else {
                console.log('Action result:', data);
            };
            setAmount('');
        } catch(error) {
            console.error('Error processing action:', error);
        };

        console.log('Fetching update game after action press ...');
        setToExecuteValidator(toExecuteValidatorType.TurnValidator);
        setHandleFetching(!handleFetching);
    };

    const renderAction = ({ item }: {item: ActionType}) => {
        const isBet = item === ActionType.Bet;
        const isRaise = item === ActionType.Raise;
        const handleAmountChange = (amount: string): void => {
            if (amount === '') {
                setAmount('');
                return;
            };
        
            if (isNumericString(amount) || amount === '') {
                setAmount(getFloorFromString(amount));
            } else {
                Alert.alert('¡Error!', 'Chips must be numeric.');
            };
        };
        
        return (
            <View style={ styles.actionListElementContainer }>
                {(isBet || isRaise) && (
                        <TextInput
                            style={ styles.actionItemInput }
                            placeholder="amount"
                            placeholderTextColor= {'#888'}
                            value={amount}
                            onChangeText={handleAmountChange}
                            keyboardType="numeric"
                        />
                )}
                    <Pressable
                        style={ styles.actionItemButton }
                        onPress={ () => handleActionPress(item) }
                    >
                        <Text style={ styles.actionItemButtonText }>{item}</Text>
                    </Pressable>
            </View>
        );
    };

    const flopCardStyle = [styles.sectionCardItem, bettingStage?.stage === BettingStageType.Flop && styles.sectionShowedCardItem];
    
    const turnCardStyle = [styles.sectionCardItem, bettingStage?.stage === BettingStageType.Turn && styles.sectionShowedCardItem];
    
    const riverCardStyle = [styles.sectionCardItem, bettingStage?.stage === BettingStageType.River && styles.sectionShowedCardItem];

    const cardStyles = [flopCardStyle, flopCardStyle, flopCardStyle, turnCardStyle, riverCardStyle ]

    return (
        <View style={ styles.main }>
            <View style={ styles.sectionHandInfoContainer }>
                <View style={ styles.sectionStageContainer }>
                    <Text style={ styles.sectionTitle }>{bettingStage?.stage}</Text>
                    <View style={ styles.sectionCardContainer }>
                    {cardStyles.map((style, index) => (
                        <View key={index} style={style} />
                    ))}
                    </View>
                </View>
                <View style={ styles.sectionPotListContainer }>
                    <FlatList
                        data={ potList || [] }
                        renderItem={ renderPot }
                        keyExtractor={ (item) => item.id.toString() }
                        style={ styles.potListContainer }
                    />
                </View>
                <View style={ styles.sectionValuesContainer }>
                    <View style={ styles.sectionValuesItem }>
                        <Text style={ styles.sectionValuesText }>BB value
                        </Text>
                        <Text style={ styles.sectionValuesTitle }>
                            { handStage?.bigBlindValue }
                        </Text>
                    </View>
                    <View style={ styles.sectionValuesItem }>
                        <Text style={ styles.sectionValuesText }>Actual bet
                        </Text>
                        <Text style={ styles.sectionValuesTitle }>
                            { bettingStage?.actualBetValue }
                        </Text>
                    </View>
                    <View style={ styles.sectionValuesItem }>
                        <Text style={ styles.sectionValuesText }>Min Raise
                        </Text>
                        <Text style={ styles.sectionValuesTitle }>
                            { bettingStage?.minimumRaise }
                        </Text>
                    </View>
                </View>
            </View>
            <View style={ styles.sectionPlayerListContainer }>
                <FlatList
                    data={ playerList || [] }
                    renderItem={ renderPlayer }
                    keyExtractor={ (item) => item.id }
                    style={ styles.playerListContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;