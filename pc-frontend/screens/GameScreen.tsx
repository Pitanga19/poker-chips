import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './GameScreen.styles';

const pot = {chips: 100}; // valor de prueba para estilar, luego sera objeto Pot
interface Player {id: string, chips: string};
const playerMaci = {id: 'Maci', chips: '400'};
const playerLuchi = {id: 'Luchi', chips: '500'};
let playerList = [playerLuchi, playerMaci]
const renderItem = ( {item }: {item: Player} ) => (
    <View style={ styles.container }>
        <Text style={ styles.mainText }>{item.id}</Text>
        <Text style={ styles.mainText }>{item.chips}</Text>
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
                />
            </View>
        </View>
    );
};

export default GameScreen;