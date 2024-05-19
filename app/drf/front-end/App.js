import React from "react";
import { AuthProvider } from "./components/context/AuthContext";
import AppNavigator from "./components/navigators/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import FontLoader from "./components/customText/FontLoader";
import * as SystemUI from "expo-system-ui";
import Toast from "react-native-toast-message";
import SuccessToast from "./components/toasts/SuccessToast";
import ErrorToast from "./components/toasts/ErrorToast";

SystemUI.setBackgroundColorAsync("black");

const toastConfig = {
  successToast: ({ text1, text2 }) => (
    <SuccessToast text1={text1} text2={text2} />
  ),
  errorToast: ({ text1, text2 }) => <ErrorToast text1={text1} text2={text2} />,
};

export default function App(props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FontLoader>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </FontLoader>
        <Toast config={toastConfig} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
