import React, { useState, useEffect } from "react";
import { Alert, View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT, Pot } from '../constants/constants';

type WinnerSelectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WinnerSelect'>;

const WinnerSelectScreen = () => {
    const navigation = useNavigation<WinnerSelectScreenNavigationProp>();
    const [potList, setPotList] = useState<Pot[]>([]);
    const [winnerPerPotList, setWinnerPerPotList] = useState<string[][]>([]);

    const fetchGameData = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentGame`);
            const data = await response.json();

            setPotList(data.potManager?.potList);
        } catch (error) {
            console.error('Error fetching game:', error);
        };
    };

    useEffect(() => {
        fetchGameData();
    }, [])

    const renderPot = ({item}: {item: Pot}) => {
        return (
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot: {item.id}</Text>
                    <FlatList 
                        data={ item.activePlayerIds }
                        renderItem={ renderPlayer }
                        keyExtractor={ (item) => item }
                        style={ styles.listContainer }
                    />
            </View>
        );
    };

    const renderPlayer = ({item}: {item: string}) => {
        return (
            <View style={ styles.container }>
                <Text style={ styles.mainText }>{item}</Text>
            </View>
        );
    };

    const sendWinnerSelection = async () => {
        if (winnerPerPotList.length === 0) {
            Alert.alert('¡Invalid list!', 'No winners listed.');
            return;
        };

        try {
            const response = await fetch(`http://${IP}:${PORT}/api/winnerSelect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(winnerPerPotList)
            });

            if (!response.ok) {
                throw new Error('Failed to send winner selection.');
            };

            const data = await response.json();
            Alert.alert('¡Succes!', 'Winner selection sent succesfully.');
            navigation.navigate('Game');
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('¡Error!', error.message);
            } else {
                Alert.alert('¡Error!', 'Unknown error.');
            };
        };
    };

    return (
        <View style={ styles.main }>
            <Text style={ styles.mainText }>Pot List</Text>

            <FlatList 
                data={ potList }
                renderItem={ renderPot }
                keyExtractor={ (item) => item.id.toString() }
                style={ styles.listContainer }
            />
            
            <Pressable style={ styles.button } onPress={ sendWinnerSelection }>
                <Text style={ styles.mainText }>Send Winner Selection</Text>
            </Pressable>
        </View>
    );
};

export default WinnerSelectScreen;