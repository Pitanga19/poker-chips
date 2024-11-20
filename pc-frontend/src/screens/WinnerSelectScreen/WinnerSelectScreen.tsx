import React, { useState, useEffect } from "react";
import { Alert, View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { IP, PORT, Pot } from '../../utils/constants';

type WinnerSelectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WinnerSelect'>;

const WinnerSelectScreen = () => {
    const navigation = useNavigation<WinnerSelectScreenNavigationProp>();
    const [potList, setPotList] = useState<Pot[]>([]);
    const [selectedWinners, setSelectedWinners] = useState<Record<number, string[]>>({});

    const fetchGameData = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/currentGame`);
            const data = await response.json();

            setPotList(data.potManager?.potList);
            initializeSelectedWinners(data.potManager?.potList);
        } catch (error) {
            console.error('Error fetching game:', error);
        };
    };

    const initializeSelectedWinners = (potList: Pot[]) => {
        const initialWinnerPerPot: Record<number, string[]> = {};
        potList.forEach(pot => {
            initialWinnerPerPot[pot.id] = []
        });

        setSelectedWinners(initialWinnerPerPot);
    };

    useEffect(() => {
        fetchGameData();
    }, []);

    const toggleSelection = (potId: number, playerId: string) => {
        setSelectedWinners(prev => {
            const updated = { ... prev };
            const currentWinnerList = updated[potId] || [];

            if (currentWinnerList.includes(playerId)) {
                updated[potId] = currentWinnerList.filter(id => id !== playerId);
            } else {
                updated[potId] = [ ... currentWinnerList, playerId];
            }

            return updated;
        });
    };

    const renderPot = ({item}: {item: Pot}) => {
        return (
            <View style={ styles.container }>
                <Text style={ styles.mainText }>Pot: {item.id}</Text>
                    <FlatList 
                        data={ item.activePlayerIds }
                        renderItem={ ({ item: playerId }) => renderPlayer(item.id, playerId) }
                        keyExtractor={ playerId => playerId }
                        style={ styles.listContainer }
                    />
            </View>
        );
    };

    const renderPlayer = ( potId: number, playerId: string) => {
        const isSelected: boolean = selectedWinners[potId].includes(playerId);
        const buttonStyle = [styles.button, isSelected && styles.selected];
        
        return (
            <Pressable style={ buttonStyle } onPress={ () => toggleSelection(potId, playerId) }>
                <Text style={ styles.mainText }>{playerId}</Text>
            </Pressable>
        );
    };

    const sendWinnerSelection = async () => {
        const winnerListPerPot = potList.map(pot => selectedWinners[pot.id] || []);

        if (winnerListPerPot.every(winners => winners.length === 0)) {
            Alert.alert('¡Invalid list!', 'No winners listed.');
            return;
        };

        try {
            const response = await fetch(`http://${IP}:${PORT}/api/winnerSelect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ winnerListPerPot: winnerListPerPot }),
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