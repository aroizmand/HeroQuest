import React from 'react';
import { Text, StyleSheet } from 'react-native';

const fontTypes = {
  logo: "Logo",
  title: 'Poppins-Bold',
  subtitle: 'Poppins-Medium',
  body: 'Poppins-Regular',
  light: 'Poppins-Light',
  italic: 'Poppins-Italic',
  boldItalic: 'Poppins-BoldItalic',
  extraBold: 'Poppins-ExtraBold',
  extraBoldItalic: 'Poppins-ExtraBoldItalic',
  extraLight: 'Poppins-ExtraLight',
  extraLightItalic: 'Poppins-ExtraLightItalic',
  lightItalic: 'Poppins-LightItalic',
  mediumItalic: 'Poppins-MediumItalic',
  semiBold: 'Poppins-SemiBold',
  semiBoldItalic: 'Poppins-SemiBoldItalic',
  thin: 'Poppins-Thin',
  thinItalic: 'Poppins-ThinItalic',
  black: 'Poppins-Black',
  blackItalic: 'Poppins-BlackItalic',
};

const CustomText = ({ children, style, fontType = 'body', ...props }) => {
  // Determine the font family based on the fontType prop
  const fontFamily = fontTypes[fontType] || 'Poppins-Regular';

  return (
    <Text style={[{ fontFamily }, styles.customFont, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  customFont: {
    color:"white"
  },
});

export default CustomText;
