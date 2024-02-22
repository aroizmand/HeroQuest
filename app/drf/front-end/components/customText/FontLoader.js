import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const FontLoader = ({ children }) => {
  let [fontsLoaded] = useFonts({
    'Logo': require('../../assets/fonts/Aquire-BW0ox.otf'),
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-LightItalic': require('../../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBoldItalic': require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-BoldItalic': require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ThinItalic': require('../../assets/fonts/Poppins-ThinItalic.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      // Wait for fonts to be loaded
      await fontsLoaded;

      // Hide the splash screen
      await SplashScreen.hideAsync();
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return children;
};

export default FontLoader;
