import React, {useState} from 'react';
import { ImageBackground, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseEndpoint from "../../endPointConfig";
import { useAuth } from '../context/AuthContext';
import CustomText from '../customText/CustomText';
import styles from './styles';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import { CustomTouchableOpacity } from '../touchables/CustomTouchableOpacity';
import CustomTextInput from '../inputFields/CustomTextInput';

// TODO: FRONT END VALIDATION + error messages

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
  
    axios.post(`http://${baseEndpoint}/login`, userData)
      .then(res => {
        if (res.data.status === "ok") {
          login(res.data.data);
        } else {
          setIsError(true);
          setMessage("Login failed. Please check your credentials."); 
        }
      })
      .catch(error => {
        setIsError(true);
          if (error.response) {
            const { status, data } = error.response;
              switch (status) {
                case 404:
                    console.log("User not found. Please check your email.");
                    break;
                case 401:
                    console.log("Invalid credentials. Please try again.");
                    break;
                default:
                    console.log("Login error:", error);
                    setMessage(data.message || "An unexpected error occurred. Please try again.");
            }
        } else {
            console.log("Login error:", error);
            setMessage("Unable to connect to the server. Please check your connection and try again.");
        }
    });
    
  }
  
  return ( 
    <ImageBackground
      source={require('../../assets/low-poly-grid-haikei.png')} 
      style={styles.container}
    >
        <View style={styles.headerContainer}>
          <CustomText style={styles.title} fontType="logo">Welcome Player</CustomText>
          <CustomText style={styles.subtitle} fontType="body">It's time to level up</CustomText>
        </View>
        
        
        <CustomTextInput
          iconName="mail-outline"
          placeholder="Email"
          maxLength={30}
          onChangeText={setEmail} 
        />

        <CustomTextInput
          iconName="lock-closed-outline"
          placeholder="Password"
          secureTextEntry
          maxLength={30}
          rightIcon="eye"
          onChangeText={setPassword} 
        />
        
        <CustomTouchableScale
          onPress={handleLogin}
        >
          <View style={styles.button}>
            <CustomText style={styles.buttonText} fontType={'light'}>Log In</CustomText>
          </View>
        </CustomTouchableScale>
        
        <View style={styles.signupContainer}>
          <CustomText style={styles.buttonTextOutline}>Don't have an account?</CustomText>
          <CustomTouchableOpacity
           onPress={() => navigation.navigate('Signup')}
          >
            <CustomText style={styles.buttonTextOutlineSignup}> Sign Up</CustomText>
          </CustomTouchableOpacity>
        </View>
    </ImageBackground>
  );
};

export default LoginScreen;
