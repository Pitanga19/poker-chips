import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT, ActionType } from '../constants/constants';

type GameScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

// models interfaces
enum BettingStageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}
interface Player {
    id: string;
    chips: number;
    pendingChips: number;
    isPlaying: boolean;
};
interface PlayerManager {
    playerList: Player[];
}
interface Pot {
    chips: number;
    pendingChips: number;
};
interface PositionManager {
    dealerIndex: number;
    smallBlindIndex: number;
    bigBlindIndex: number;
    turnIndex: number;
    raiserIndex: number;
    winnersIndex: number[];
}
interface HandStage {
    smallBlindValue: number;
    bigBlindValue: number;
    stagesPlayed: BettingStageType[];
}
interface BettingStage {
    stage: BettingStageType;
    doSmallBlindCheck: boolean;
    doBigBlindCheck: boolean;
    actualBetValue: number;
    minimumRaise: number;
}
interface HandStageValidator {};
interface BettingStageValidator {};
interface TurnValidator {};
interface ActionSelector {};
interface PlayerActions {};
interface Game {
    playerManager: PlayerManager;
    pot: Pot;
    positionManager: PositionManager;
    handStageValidator: HandStageValidator;
    handStage: HandStage;
    bettingStageValidator: BettingStageValidator;
    bettingStage: BettingStage;
    turnValidator: TurnValidator;
    actionSelector: ActionSelector;
    playerActions: PlayerActions;
}

const GameScreen = () => {
    // fetch values
    const [game, setGame] = useState<Game | null>(null);
    const [pot, setPot] = useState<Pot | null>(null);
    const [playerManager, setPlayerManager] = useState<PlayerManager | null>(null);
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [positionManager, setPositionManager] = useState<PositionManager | null>(null);
    const [avalibleActions, setAvalibleActions] = useState<ActionType[]>([]);
    const [amount, setAmount] = useState<string>('');

    const fetchGameData = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentGame`);
            const data = await response.json();

            console.log('Game data received:', data);
            setGame(data);
            setPot(data.pot);
            setPlayerManager(data.playerManager);
            setPlayerList(data.playerManager?.playerList);
            setPositionManager(data.positionManager);
        } catch (error) {
            console.error('Error fetching game:', error);
        };
    };

    const fetchAvalibleActions = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentAvalibleActions`);
            const data = await response.json();

            console.log('Avalible actions received:', data);
            setAvalibleActions(data);
        } catch (error) {
            console.error('Error fetching avalible actions:', error);
        }
    }

    useEffect(() => {
        fetchGameData();
        fetchAvalibleActions();
    }, []);

    const renderPlayer = ({ item }: { item: Player}) => {
        console.log('Rendering player:', item);
        const isCurrentTurn = positionManager? item.id === playerManager?.playerList[positionManager.turnIndex].id : null;
        return (
            <View style={ styles.container }>
                <View style={ styles.container }>
                    <Text style={ styles.mainText }>Player info</Text>
                    <Text style={ styles.mainText }>ID: {item.id}</Text>
                    <Text style={ styles.mainText }>Chips: {item.chips}</Text>
                    <Text style={ styles.mainText }>Pending chips: {item.pendingChips}</Text>
                </View>
                {isCurrentTurn && (
                    <FlatList 
                        data={ avalibleActions }
                        renderItem={ renderAction }
                        keyExtractor={ (item) => item }
                        style={ styles.listContainer }
                    />
                    )
                }
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
        }

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
                setGame(data.updatedGame);

                fetchGameData();
                fetchAvalibleActions();
            }
            setAmount('');
        } catch(error) {
            console.error('Error processing action:', error);
        }
    };

    const renderAction = ({ item }: {item: ActionType}) => {
        console.log('Rendering action:', item);
        const isBet = item === ActionType.Bet;
        const isRaise = item === ActionType.Raise;

        const handleAmountChange = (amount: string) => {setAmount(amount)};
        
        return (
            <View style={ styles.container }>
                {(isBet || isRaise) && (
                    <TextInput
                        style={ styles.input }
                        placeholder="amount"
                        placeholderTextColor= {'#888'}
                        value={amount}
                        onChangeText={handleAmountChange}
                        keyboardType="numeric"
                    />
                )}
                <Pressable style={ styles.button } onPress={ () => handleActionPress(item) }>
                    <Text style={ styles.mainText }>{item}</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={ styles.main }>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot</Text>
                <Text style={ styles.mainText }>Chips: {pot?.chips}</Text>
            </View>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Players</Text>
                <FlatList
                    data={ playerList || [] }
                    renderItem={ renderPlayer }
                    keyExtractor={ (item) => item.id }
                    style={ styles.listContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;