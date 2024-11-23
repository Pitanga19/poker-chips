import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenuScreen from "../screens/MainMenuScreen/MainMenuScreen";
import PlayerSettingScreen from "../screens/PlayerSettingScreen/PlayerSettingScreen";
import GameScreen from "../screens/GameScreen/GameScreen";
import WinnerSelectScreen from "../screens/WinnerSelectScreen/WinnerSelectScreen";

export type RootStackParamList = {
    MainMenu: undefined;
    PlayerSetting: { gameId: string };
    Game: { gameId: string };
    WinnerSelect: { gameId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Main Menu' }} />
            <Stack.Screen name="PlayerSetting" component={PlayerSettingScreen} options={{ title: 'Player Settings' }} />
            <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game' }} />
            <Stack.Screen name="WinnerSelect" component={WinnerSelectScreen} options={{ title: 'Winner Select' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;