import React, {useRef} from "react";
import { AuthProvider } from "./components/context/AuthContext";
import AppNavigator from "./components/navigators/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";
import FontLoader from "./components/customText/FontLoader";
import * as SystemUI from 'expo-system-ui';
import Toast from 'react-native-toast-message';


SystemUI.setBackgroundColorAsync("black");

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar /> 
      <FontLoader>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </FontLoader>
      <Toast/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
  },
});
