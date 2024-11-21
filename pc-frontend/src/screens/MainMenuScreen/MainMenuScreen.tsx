import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../../utils/constants';
import { isNumericString, getFloorFromString } from '../../utils/functions';

type MainMenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen = () => {
    const navigation = useNavigation<MainMenuScreenNavigationProp>();
    const [bigBlindValue, setBigBlindValue] = useState<string>('');

    const createNewGame = async () => {
        try {
            if (bigBlindValue === '') throw new Error('Missing big blind value.');

            const response = await fetch(`http://${IP}:${PORT}/api/newGame`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bigBlindValue })
            });

            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to create new game.');
            };

            const data = await response.json();
            console.log('New game created:', data);
            navigation.navigate('PlayerSetting');
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
        </View>
    );
};

export default MainMenuScreen;