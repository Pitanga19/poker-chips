import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../App'

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
    const playerManager = game?.playerManager;
    const playerList = playerManager?.playerList;
    const pot = game?.pot;

    const renderItem = ({ item }: { item: Player}) => {
        return (
            <View style={ styles.container }>
                <View style={ styles.container }>
                    <Text style={ styles.mainText }>Player info</Text>
                    <Text style={ styles.mainText }>ID: {item.id}</Text>
                    <Text style={ styles.mainText }>Chips: {item.chips}</Text>
                    <Text style={ styles.mainText }>Pending chips: {item.pendingChips}</Text>
                </View>
                <View style={ styles.container }>
                    <Text style={ styles.mainText }>Avalible actions</Text>
                    <TextInput
                        style={ styles.input }
                        placeholder='amount'
                    />
                </View>
            </View>
        )
    }

    useEffect(() => {
        // Fetch game
        fetch(`http://${IP}:${PORT}/api/currentGame`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(error => console.error('Error fetching players:', error));
    }, []);

    return (
        <View style={ styles.main }>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot</Text>
                <Text style={ styles.mainText }>Chips: {pot?.chips}</Text>
            </View>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Players</Text>
                <FlatList
                    data={ playerList }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id }
                    style={ styles.listContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;