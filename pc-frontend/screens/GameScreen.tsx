import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Alert } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { IP, PORT, toExecuteValidatorType, ActionType, Pot, PlayerManager, Player, PositionManager } from '../constants/constants';

type GameScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

const GameScreen = () => {
    const navigation = useNavigation<GameScreenScreenNavigationProp>();
    const isFocused = useIsFocused();
    const [potList, setPotList] = useState<Pot[]>([]);
    const [playerManager, setPlayerManager] = useState<PlayerManager | null>(null);
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [positionManager, setPositionManager] = useState<PositionManager | null>(null);
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
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot { item.id + 1 }</Text>
                <Text style={ styles.mainText }>Chips: { item.chips }</Text>
            </View>
        );
    };

    const renderPlayer = ({ item }: { item: Player}) => {
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
                <FlatList
                    data={ potList || [] }
                    renderItem={ renderPot }
                    keyExtractor={ (item) => item.id.toString() }
                    style={ styles.listContainer }
                />
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