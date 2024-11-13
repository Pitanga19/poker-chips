import React, { useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';

const MainMenuScreen = () => {
    const createNewGame = () => {
        
    }

    return (
        <View style={ styles.main }>
            <Pressable style={ styles.button } onPress={ createNewGame}>
                <Text style={ styles.mainText }>New Game</Text>
            </Pressable>
        </View>
    );
}

export default MainMenuScreen;