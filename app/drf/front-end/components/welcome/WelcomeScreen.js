import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import CustomText from '../customText/CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import RadarChart from './RadarChart';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const WelcomeScreen = ({ navigation }) => {
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#000000', '#000000', '#0a0a0a']}
          locations={[0, 0.74, 1]}
          style={styles.container}
        >
        <RadarChart/>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title} fontType="subtitle">Embark on Your Hero Quest</CustomText>
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
      </LinearGradient>
    </GestureHandlerRootView>

  );
};

export default WelcomeScreen;
