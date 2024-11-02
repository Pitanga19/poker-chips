import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import screens:
import GameScreen from './screens/GameScreen';

export default function App() {
  return (
    <View style={ styles.container }>
      <StatusBar style='auto' />
      <GameScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#222'
  },
});
