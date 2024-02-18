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

  const validateUsername = (username) => username.length >= 3;

  const validateEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  //TODO: CHECK IF USER EXISTS + PERFECT VALIDATION + TOKENS
  const handleSignup = () => {

    let isValid = true;

    // Username validation
    if (!validateUsername(username)) {
      setUsernameError("Username must be at least 3 characters long.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!validatePassword(password)) {
      setPasswordError("Password must meet complexity requirements.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
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
            Alert.alert("Success", "User Created Successfully");
            signup(); 
          } else {
            Alert.alert("Signup Failed", JSON.stringify(response.data));
          }
        })
        .catch(error => {
          if (error.response) {
            const data = error.response.data;
            if (data.errors && data.errors.username) {
              setUsernameError(data.errors.username); 
            }
            if (data.errors && data.errors.email) {
              setEmailError(data.errors.email); 
            }
          } else if (error.request) {
            Alert.alert("Network Error", "No response from server");
          } else {
            Alert.alert("Error", error.message);
          }
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
          setUsernameError(false); 
        }}       
        maxLength={20}
        error={usernameError}
      />

      <CustomTextInput
        iconName="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(false); 
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
