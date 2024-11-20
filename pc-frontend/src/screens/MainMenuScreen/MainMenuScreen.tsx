import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT } from '../../utils/constants';

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

    const handleBigBlindValue = (value: string) => { setBigBlindValue(value)};

    return (
        <View style={ styles.main }>
            <Pressable style={ styles.button } onPress={ createNewGame }>
                <TextInput
                    style={ styles.input }
                    placeholder="big blind value"
                    placeholderTextColor= {'#888'}
                    value={ bigBlindValue }
                    onChangeText={ handleBigBlindValue }
                    keyboardType="numeric"
                />
                <Text style={ styles.mainText }>New Game</Text>
            </Pressable>
        </View>
    );
};

export default MainMenuScreen;