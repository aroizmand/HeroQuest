import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import baseEndpoint from "../../endPointConfig";
import { useAuth } from '../context/AuthContext';
import styles from './styles';
import CustomText from '../customText/CustomText';
import CustomTextInput from '../inputFields/CustomTextInput'; 
import { CustomTouchableOpacity } from '../touchables/CustomTouchableOpacity';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import Toast from 'react-native-toast-message';


//TODO: Password info for user + strength bar + TOKENS + particle background

const SignupScreen = () => {
  const { signup } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (/^[!@#$%^&*(),.?":{}|<>]/.test(username.charAt(0))) {
      return "Username cannot start with a special character.";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores.";
    }
    return "";
  };
  
  const validateEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handleSignup = () => {

    let isValid = true;
    const usernameError = validateUsername(username);
    if (usernameError) {
      setUsernameError(usernameError);
      isValid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must meet complexity requirements.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    const userData = { username, email, password };

    if (isValid) {
      axios.post(`http://${baseEndpoint}/register`, userData)
        .then(response => {
          if (response.data.status === "ok") {
            Toast.show({
              type: 'success',
              text1: 'Account created!',
              text2: 'Welcome to Quest 👋'
            });
            signup(); 
          } 
          if (response.data.status === "user and email taken"){
            setUsernameError("Username is already taken");
            setEmailError("Email already has an account");
          }
          if (response.data.status === "user taken") {
            setUsernameError("Username is already taken");
          }
          if (response.data.status === "email taken") {
            setEmailError("Email already has an account");
          }
        })
        .catch(error => {
          setUsernameError("");
          setEmailError("");
  
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.data;
            if (errorMessage === "Username is already taken") {
              setUsernameError("Username is already taken.");
            } else if (errorMessage === "Email already has an account") {
              setEmailError("Email already has an account.");
            }
          } else if (error.request) {
            Toast.show({
              type: 'error',
              text1: 'Network Error',
              text2: 'Try again in a minute'
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Ooops',
              text2: 'Something went wrong!'
            });          }
        });
    }
  };

  return (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#000000', '#000000', '#0a0a0a']}
        locations={[0, 0.74, 1]}
        style={styles.container}
      >

      <View style={styles.headerContainer}>
        <CustomText style={styles.title} fontType="subtitle">Welcome to Quest</CustomText>
        <CustomText style={styles.subtitle} fontType="body">Sing up to continue</CustomText>
      </View>

      <CustomTextInput
        iconName="person-outline"
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUsernameError(""); 
        }}
        maxLength={80}
        error={usernameError}
      />

      <CustomTextInput
        iconName="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
        keyboardType="email-address"
        maxLength={320}
        error={emailError} 
      />

      <CustomTextInput
        iconName="lock-closed-outline"
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(false); 
        }}   
        secureTextEntry={true}
        rightIcon="eye"
        maxLength={256}
        error={passwordError}
      />

      <CustomTextInput
        iconName="lock-closed-outline"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setConfirmPasswordError(false); 
        }}   
        secureTextEntry={true}
        rightIcon="eye"
        maxLength={256}
        error={confirmPasswordError}
      />

      <CustomTouchableScale
        onPress={handleSignup}
      >
        <View style={styles.button}>
          <CustomText style={styles.buttonText} fontType={'light'}>Sign Up</CustomText>
        </View>
      </CustomTouchableScale>
      
      <View style={styles.signupContainer}>
        <CustomText style={styles.buttonTextOutline}>Already have an account?</CustomText>
        <CustomTouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <CustomText style={styles.buttonTextOutlineSignup}> Log In</CustomText>
        </CustomTouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;
