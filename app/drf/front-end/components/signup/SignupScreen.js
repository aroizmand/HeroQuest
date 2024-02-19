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
import SuccessToast from '../toasts/SuccessToast';

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
    const usernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return username.length >= 3 && usernameRegex.test(username);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  //TODO: CHECK IF USER EXISTS + PERFECT VALIDATION + TOKENS
  const handleSignup = () => {

    let isValid = true;
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');


    if (!validateUsername(username)) {
      setUsernameError("Invalid username. At least 3 characters long and doesn't start with a special character");
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
  
    if (!validatePassword(password)) {
      setPasswordError("Password must fulfill security requirements");
      isValid = false;
    }
    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    const userData = { username, email, password };

    if (isValid) {
      axios.post(`http://${baseEndpoint}/register`, userData)
        .then(response => {
          if (response.data.status === "ok") {
            setSuccessMessage('User Created Successfully 👋');
            signup();
          } else {
            setErrorMessage('Signup failed. Please try again'); 
          }
        })
        .catch(error => {
          if (error.response) {
            const errorMessage = error.response.data.message;
            if (errorMessage.includes("Username")) {
              setUsernameError(errorMessage);
            } else if (errorMessage.includes("Email")) {
              setEmailError(errorMessage);
            }
            setErrorMessage(errorMessage); 
          } else if (error.request) {
            setErrorMessage("Network Error: No response from server");
          } else {
            setErrorMessage("An unexpected error occurred");
          }
        });
    }
  };


  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');


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
      {successMessage && <SuccessToast message={successMessage} />}
      {errorMessage && <ErrorToast message={errorMessage} />}
    </LinearGradient>
  );
};

export default SignupScreen;
