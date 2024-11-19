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
    const [pot, setPot] = useState<Pot | null>(null);

    return (
        <View style={ styles.main }>

        </View>
    );
};

export default WinnerSelectScreen;