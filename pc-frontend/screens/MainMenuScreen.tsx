import React, { useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type MainMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen = () => {
    const navigation = useNavigation<MainMenuScreenNavigationProp>();

    const createNewGame = () => {
        navigation.navigate('PlayerSetting');
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