import React, { useState } from 'react';
import { Alert, View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../App';

type MainMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen = () => {
    const navigation = useNavigation<MainMenuScreenNavigationProp>();

    const createNewGame = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/newGame`, {
                method: 'POST',
                headers: { 'ContentType': 'application/json' },
            });

            if (!response.ok) throw new Error('Failed to create new game.');

            const data = await response.json();
            console.log('New game created:', data);
            navigation.navigate('PlayerSetting');
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('¡Error!', error.message);
            } else {
                Alert.alert('¡Error!', 'Unknown error.');
            }
        }
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