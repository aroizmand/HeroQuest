import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';

const CustomTextInput = ({
  iconName,
  placeholder,
  secureTextEntry = false,
  maxLength,
  onChangeText,
  rightIcon = null,
  rightIconPress = null,
  error = '', 
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecureEntry((prev) => !prev);
  };

  const getRightIconName = () => {
    if (rightIcon) {
      return isSecureEntry ? 'eye-off' : rightIcon;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error ? styles.errorBorder : styles.defaultBorder]}>
        {iconName && <Ionicons name={iconName} size={20} color="#868E96" style={styles.iconStyle} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#868E96"
          secureTextEntry={isSecureEntry}
          maxLength={maxLength}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        {rightIcon && (
          <CustomTouchableScale onPress={rightIconPress || toggleSecureEntry}>
            <Ionicons name={getRightIconName()} size={20} color="#868E96" />
          </CustomTouchableScale>
        )}
      </View>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10, 
  },
  defaultBorder: {
    
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10, 
  },
  iconStyle: {
    marginHorizontal: 5, 
  },
  errorMessage: {
    width: '80%', 
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 10, 
  },
});

export default CustomTextInput;
