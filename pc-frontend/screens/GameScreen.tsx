import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './GameScreen.styles';

// valores de prueba para estilar
const pot = {chips: 100}; 
interface Player {id: string, chips: string};
const playerMaci = {id: 'Maci', chips: '400'};
const playerLuchi = {id: 'Luchi', chips: '500'};
let playerList = [playerLuchi, playerMaci]

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
    return (
        <View style={ styles.main }>
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot</Text>
                <Text style={ styles.mainText }>{pot.chips}</Text>
            </View>

            <View style={ styles.container }>
                <FlatList
                    data={ playerList }
                    renderItem={ renderItem }
                    keyExtractor={ (item) => item.id}
                    style={ styles.listContainer }
                />
            </View>
        </View>
    );
};

export default GameScreen;