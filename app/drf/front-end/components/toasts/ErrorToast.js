import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../customText/CustomText";
import { LinearGradient } from 'expo-linear-gradient'; 

const ErrorToast= ({text1, text2}) => {
    return(
    <View style={styles.toastContainer}>
      <CustomText style={styles.toastTextPrimary} fontType={"subtitle"}>{text1}</CustomText>
      <CustomText style={styles.toastTextSecondary}>{text2}</CustomText>
    </View>
)}

const styles = StyleSheet.create({
  toastContainer: {
    height: 68,
    width: '85%',
    padding: 20,
    justifyContent: "center", 
    backgroundColor:"rgba(191, 105, 109,0.9)",    
    borderRadius:10 
  },
  toastTextPrimary: {
    color: 'white', 
    fontSize: 18,
  },
  toastTextSecondary: {
    color: '#fff', 
    fontSize: 14,
  },
});

export default ErrorToast;
