import React, { useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../../utils/constants';

type PlayerSettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerSetting'>;

interface Player {
    id: string;
    chips: number;
    pendingChips: number;
    isPlaying: boolean;
};

const PlayerSettingScreen = () => {
    const navigation = useNavigation<PlayerSettingScreenNavigationProp>();
    const [playerID, setPlayerID] = useState('');
    const [startingChips, setStartingChips] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);

    const alreadyExistingID = playerList.some(p => p.id === playerID);

    const validateAddPlayer = () => {
        if (!playerID) {
            Alert.alert('¡Invalid value!','Please input an ID.');
            return;
        } else if (alreadyExistingID) {
            Alert.alert('¡Invalid value!','Your ID already exist.');
            return;
        };

        const newPlayer: Player = {
            id: playerID,
            chips: parseInt(startingChips) || 0,
            pendingChips: 0,
            isPlaying: true,
        };

        setPlayerList(prevList => [...prevList, newPlayer]);
        setPlayerID('');
        setStartingChips('');
    };

    const renderItem = ({ item }: { item: Player }) => {
        return (
            <View style={ styles.container }>
                <Text style={ styles.mainText }>ID: {item.id}</Text>
                <Text style={ styles.mainText }>Chips: {item.chips}</Text>
            </View>
        );
    };

    const sendPlayerList = async () => {
        if (playerList.length === 0) {
            Alert.alert('¡Invalid list!', 'No players listed.');
            return;
        };

        try {
            const response = await fetch(`http://${IP}:${PORT}/api/playerList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerList)
            });

            if (!response.ok) {
                throw new Error('Failed to send player list.');
            };

            const data = await response.json();
            Alert.alert('¡Succes!', 'Player list sent succesfully.');
            navigation.navigate('Game');
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('¡Error!', error.message);
            } else {
                Alert.alert('¡Error!', 'Unknown error.');
            };
        };
    };

    return (
        <View style={ styles.main }>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Player Settings</Text>

                <TextInput
                    style={ styles.input }
                    placeholder="Player ID"
                    placeholderTextColor= {'#888'}
                    value={playerID}
                    onChangeText={setPlayerID}
                />

                <TextInput
                    style={ styles.input }
                    placeholder="Starting chips"
                    placeholderTextColor= {'#888'}
                    value={startingChips}
                    onChangeText={setStartingChips}
                    keyboardType="numeric"
                />

                <Pressable style={ styles.button} onPress={ validateAddPlayer }>
                    <Text style={ styles.mainText }>Add Player</Text>
                </Pressable>
            </View>

            <View style={ styles.container }>
                <Text style={ styles.mainText }>Players</Text>

                <FlatList
                    data={ playerList }
                    renderItem={ renderItem }
                    keyExtractor={(item) => item.id}
                    style={ styles.listContainer}
                />
            </View>

            <View>
                <Pressable style={ styles.button} onPress={ sendPlayerList }>
                    <Text style={ styles.mainText }>Send Players List</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PlayerSettingScreen;