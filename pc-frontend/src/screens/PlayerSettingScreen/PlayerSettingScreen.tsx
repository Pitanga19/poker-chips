import React, { useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { API_URL, Player } from '../../utils/constants';
import { getApiUrl, isAlphanumericString, isNumericString, getFloorFromString } from '../../utils/functions';

type PlayerSettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerSetting'>;
type PlayerSettingScreenRouteProp = RouteProp<RootStackParamList, 'PlayerSetting'>;

const PlayerSettingScreen = () => {
    const navigation = useNavigation<PlayerSettingScreenNavigationProp>();
    const route = useRoute<PlayerSettingScreenRouteProp>();
    const { gameId } = route.params;

    if (!gameId) {
        throw new Error('Game ID is required to access this screen.');
    }
    
    const [playerID, setPlayerID] = useState('');
    const [startingChips, setStartingChips] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const alreadyExistingID = playerList.some(p => p.id === playerID);

    const handlePlayerID = (value: string): void => {
        if (value === '') {
            setPlayerID('');
            return;
        };
    
        if (isAlphanumericString(value) || value === '') {
            setPlayerID(value);
        } else {
            Alert.alert('¡Error!', 'Username must be alpha-numeric.');
        };
    };


    const handleStartingChips = (value: string): void => {
        if (value === '') {
            setStartingChips('');
            return;
        };
    
        if (isNumericString(value) || value === '') {
            setStartingChips(getFloorFromString(value));
        } else {
            Alert.alert('¡Error!', 'Chips must be numeric.');
        };
    };

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
        handleStartingChips('');
    };

    const renderPlayer = ({ item }: { item: Player }) => {
        return (
            <View style={ styles.playerListElementContainer }>
                <Text style={ styles.playerListTitle }>{item.id}</Text>
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
            const response = await fetch(getApiUrl(gameId) + '/playerList', {
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
            navigation.navigate('Game', { gameId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('¡Error!', error.message);
            } else {
                Alert.alert('¡Error!', 'Unknown error.');
            };
        };
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={ styles.main }>
            <View style={ styles.mainContainer }>
                <View style={ styles.sectionContainer }>
                    <Text style={ styles.sectionTitle }>Add new player</Text>

                    <TextInput
                        style={ styles.newPlayerUserInput }
                        placeholder="Username"
                        placeholderTextColor= {'#888'}
                        value={ playerID }
                        onChangeText={ handlePlayerID }
                    />

                    <View style={ styles.newPlayerChipSection }>
                        <TextInput
                            style={ styles.newPlayerChipInput }
                            placeholder="Starting chips"
                            placeholderTextColor= {'#888'}
                            value={ startingChips }
                            onChangeText={ handleStartingChips }
                            keyboardType="numeric"
                        />

                        <Pressable style={ styles.newPlayerButton} onPress={ validateAddPlayer }>
                            <Text style={ styles.newPlayerButtonText }>Add Player</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={ styles.sectionContainer }>
                    <Text style={ styles.sectionTitle }>Player List</Text>

                    <FlatList
                        data={ playerList }
                        renderItem={ renderPlayer }
                        keyExtractor={(item) => item.id}
                        style={ styles.playerListContainer}
                    />
                </View>
            </View>

            <View style={ styles.mainContainer }>
                <Pressable style={ styles.submitButton} onPress={ sendPlayerList }>
                    <Text style={ styles.submitButtonText }>Send Player List</Text>
                </Pressable>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default PlayerSettingScreen;