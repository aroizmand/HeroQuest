import React, { useState } from 'react';
import { ImageBackground, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseEndpoint from "../../endPointConfig";
import { useAuth } from '../context/AuthContext';
import CustomText from '../customText/CustomText';
import styles from './styles';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import { CustomTouchableOpacity } from '../touchables/CustomTouchableOpacity';
import CustomTextInput from '../inputFields/CustomTextInput';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const validateInput = () => {
    
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const handleLogin = () => {
    if (!validateInput()) {
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    axios.post(`http://${baseEndpoint}/login`, userData)
      .then(res => {
        if (res.data.status === "ok") {
          login(res.data.data);
        } else {
          Toast.show({
            type: 'errorToast',
            text1: 'Something went wrong',
            text2: 'Try again in a minute'
          });
        }
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            setEmailError("There is no user with this email");
          } else if (status === 401) {
            setPasswordError("Invalid email or password. Please try again.");
          } else {
            Toast.show({
              type: 'errorToast',
              text1: 'Something went wrong',
              text2: 'Try again in a minute'
            });
          }
        } else {
          Toast.show({
            type: 'errorToast',
            text1: 'Unable to connect',
            text2: 'Please check your connection and try again'
          });
        }
      });
  };


  return (
    <ImageBackground source={require('../../assets/low-poly-grid-haikei.png')} style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.title} fontType="logo">Welcome Player</CustomText>
        <CustomText style={styles.subtitle} fontType="body">It's time to level up</CustomText>
      </View>

      <CustomTextInput
        iconName="mail-outline"
        placeholder="Email"
        maxLength={30}
        onChangeText={(text) => {
          setEmail(text.toLowerCase().trim());
          setEmailError(false); 
        }} 
        error={emailError}
      />

      <CustomTextInput
        iconName="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
        maxLength={30}
        rightIcon="eye"
        onChangeText={(text) => {
          setPassword(text.trim());
          setPasswordError(false); 
        }} 
        error={passwordError}
      />

      <CustomTouchableScale onPress={handleLogin}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText} fontType={'light'}>Log In</CustomText>
        </View>
      </CustomTouchableScale>

      <View style={styles.signupContainer}>
        <CustomText style={styles.buttonTextOutline}>Don't have an account?</CustomText>
        <CustomTouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <CustomText style={styles.buttonTextOutlineSignup}> Sign Up</CustomText>
        </CustomTouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
