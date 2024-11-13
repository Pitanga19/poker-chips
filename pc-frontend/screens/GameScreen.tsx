import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type GameScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

// models interfaces
interface Player {
    id: string;
    chips: number;
    pendingChips: number;
    isPlaying: boolean;
};

interface Pot {
    chips: number;
    pendingChips: number;
};

const InputComponent = () => {
    const [text, setText] = useState('');
    
    return (
        <View>
            <TextInput
                style={ styles.input }
                placeholder= 'chips to bet'
                placeholderTextColor= {'#888'}
                value={ text }
                onChangeText={ setText }
                />
            <Text style={ styles.mainText }>Betting: {text}</Text>
        </View>
    );
};

const renderItem = ( {item }: {item: Player} ) => (
    <View style={ styles.listElementContainer }>
        <View style={ styles.userContainer }>
            <Text style={ styles.mainText }>{item.id}</Text>
            <Text style={ styles.mainText }>{item.chips}</Text>
        </View>
        <View style={ styles.actionContainer }>
            <InputComponent/>
            <Pressable><Text style={ styles.mainText }>Call</Text></Pressable>
            <Pressable><Text style={ styles.mainText }>Bet</Text></Pressable>
            <Pressable><Text style={ styles.mainText }>Raise</Text></Pressable>
            <Pressable><Text style={ styles.mainText }>Fold</Text></Pressable>
        </View>
    </View>
);

const GameScreen = () => {
    // fetch values
    const [players, setPlayers] = useState<Player[]>([]);
    const [pot, setPot] = useState<Pot>({ chips: 0, pendingChips: 0});

    useEffect(() => {
        // Fetch players
        fetch('http://localhost:3000/api/players')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error('Error fetching players:', error));

        // Fetch pot
        fetch('http://localhost:3000/api/pot')
            .then(response => response.json())
            .then(data => setPot(data))
            .catch(error => console.error('Error fetching pot:', error));
    }, []);

    return (
        <View style={ styles.main }>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot</Text>
                <Text style={ styles.mainText }>{pot.chips}</Text>
            </View>

            <View style={ styles.container }>
                <FlatList
                    data={ players }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id}
                    style={ styles.listContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;