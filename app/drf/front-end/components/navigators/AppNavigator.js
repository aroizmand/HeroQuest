import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import StackNavigator from './StackNavigator'; 
import { useAuth } from '../context/AuthContext';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const MyDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black', 
    text: '#FFFFFF', 
    card: '#141414', 
  },
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer theme={MyDarkTheme}>
      {isAuthenticated ? <DrawerNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
};



export default AppNavigator;
