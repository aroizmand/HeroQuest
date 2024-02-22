import React from 'react';
import WelcomeScreen from '../welcome/WelcomeScreen';
import LoginScreen from '../login/LoginScreen';
import SignupScreen from '../signup/SignupScreen';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import DashboardScreen from '../dashboard/DashboardScreen';

const Stack = createStackNavigator();

const StackNavigator = ({ onLogin }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, 
        cardStyle: { backgroundColor: 'black' }, 
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{ onLogin }} />
      <Stack.Screen name="Signup" component={SignupScreen} initialParams={{ onLogin }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} initialParams={{onLogin}}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
