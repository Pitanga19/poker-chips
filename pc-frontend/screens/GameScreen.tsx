import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../constants/constants';

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
    const [playerList, setPlayerList] = useState<Player[] | undefined>(undefined);
    const [pot, setPot] = useState<Pot | undefined>(undefined);

    useEffect(() => {
        fetch(`http://${IP}:${PORT}/api/currentGame`)
            .then(response => response.json())
            .then(data => {
                console.log('Game data received:', data);
                setGame(data);
                setPlayerList(data.playerManager?.playerList);
                setPot(data.pot);
            })
            .catch(error => console.error('Error fetching players:', error));
    }, []);

    const renderItem = ({ item }: { item: Player}) => {
        console.log('Rendering player:', item)
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
                    <Pressable style={ styles.button }>Check</Pressable>
                    <Pressable style={ styles.button }>Bet</Pressable>
                    <Pressable style={ styles.button }>Call</Pressable>
                    <Pressable style={ styles.button }>Raise</Pressable>
                    <Pressable style={ styles.button }>Fold</Pressable>
                </View>
            </View>
        )
    }

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
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id }
                    style={ styles.listContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;