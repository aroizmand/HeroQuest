import React, {useState} from 'react';
import { View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import CustomText from '../customText/CustomText';
import styles from './styles';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import { CustomTouchableOpacity } from '../touchables/CustomTouchableOpacity';
import CustomTextInput from '../inputFields/CustomTextInput';


const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    login();
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
          <CustomText style={styles.title} fontType="subtitle">Welcome Back</CustomText>
          <CustomText style={styles.subtitle} fontType="body">Log in to continue</CustomText>
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
    </LinearGradient>
  );
};

export default LoginScreen;
