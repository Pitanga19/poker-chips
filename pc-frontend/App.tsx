import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
// import screens:
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={ styles.safeArea }>
      <StatusBar style='light' />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <AppNavigator />
        </ScrollView>
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
