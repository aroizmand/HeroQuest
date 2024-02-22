import React from 'react';
import { ImageBackground, View } from 'react-native';
import styles from './styles';
import CustomText from '../customText/CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import RadarChart from './RadarChart';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const WelcomeScreen = ({ navigation }) => {
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <ImageBackground
          source={require('../../assets/low-poly-grid-haikei.png')} 
          style={styles.container}
        >
        <CustomText style={styles.title} fontType="logo">Hero Quest</CustomText>
        <RadarChart/>
        <View style={styles.headerContainer}>
          <CustomText style={styles.subtitle} fontType="body">Join the adventure and level up everyday</CustomText>
        </View>
        <CustomTouchableScale
          onPress={() => navigation.navigate('Login')}
        >
          <View
            style={styles.button}
          >
            <CustomText style={styles.buttonText} fontType={'light'}>Log In</CustomText>
          </View>
        </CustomTouchableScale>
        <CustomTouchableScale
          onPress={() => navigation.navigate('Signup')}
        >
          <View style={[styles.button, styles.buttonOutline]}>
            <CustomText style={styles.buttonTextOutline} fontType={'light'}>Sign Up</CustomText>
          </View>
        </CustomTouchableScale>
      </ImageBackground>
    </GestureHandlerRootView>

  );
};

export default WelcomeScreen;
