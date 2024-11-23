import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../utils/constants';
import { isNumericString, getFloorFromString } from '../../utils/functions';

type MainMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen = () => {
    const navigation = useNavigation<MainMenuScreenNavigationProp>();
    const [bigBlindValue, setBigBlindValue] = useState<string>('');

    const createNewGame = async () => {
        try {
            if (bigBlindValue === '') throw new Error('Missing big blind value.');

            const response = await fetch(`${API_URL}/newGame`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bigBlindValue })
            });

            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to create new game.');
            };

            const { gameId } = await response.json();

            if (!gameId) throw new Error('Game ID not returned by server.');
            
            navigation.navigate('PlayerSetting', { gameId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('¡Error!', error.message);
            } else {
                Alert.alert('¡Error!', 'Unknown error.');
            };
        };
    };

    const handleBigBlindValue = (value: string) => {
        if (value === '') {
            setBigBlindValue('');
            return;
        };
    
        if (isNumericString(value) || value === '') {
            setBigBlindValue(getFloorFromString(value));
        } else {
            Alert.alert('¡Error!', 'BB must be numeric.');
        };
    };

    return (
        <View style={ styles.main }>
            <View style={ styles.titleContainer }>
                <Text style={ styles.titleText }>Poker Chips</Text>
            </View>
            <View style={ styles.menuContainer }>
                <View style={ styles.menuElementContainer }>
                    <TextInput
                        style={ styles.menuInput }
                        placeholder="Input BB value"
                        placeholderTextColor= {'#888'}
                        value={ bigBlindValue }
                        onChangeText={ handleBigBlindValue }
                        keyboardType="numeric"
                        />
                    <Pressable style={ styles.menuButton } onPress={ createNewGame }>
                        <Text style={ styles.menuButtonText }>Start Game</Text>
                    </Pressable>
                </View>
            </View>
            <View style={ styles.signatureContainer }>
                <Text style={ styles.signatureText }>By Pitanga</Text>
            </View>
        </View>
    );
};

export default MainMenuScreen;