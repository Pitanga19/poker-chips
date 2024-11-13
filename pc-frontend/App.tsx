import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
// import screens:
import GameScreen from './screens/GameScreen';
import PlayerSettingScreen from './screens/PlayerSettingScreen';

export default function App() {
  return (
    <SafeAreaView style={ styles.safeArea }>
      <StatusBar style='light' />
      <PlayerSettingScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
