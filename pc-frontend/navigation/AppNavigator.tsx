import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenuScreen from "../screens/MainMenuScreen";
import PlayerSettingScreen from "../screens/PlayerSettingScreen";
import GameScreen from "../screens/GameScreen";

export type RootStackParamList = {
    MainMenu: undefined;
    PlayerSetting: undefined;
    Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
            <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Main Menu' }} />
            <Stack.Screen name="PlayerSetting" component={PlayerSettingScreen} options={{ title: 'Player Settings' }} />
            <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;