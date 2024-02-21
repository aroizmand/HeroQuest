import React from 'react';
import { View, StyleSheet } from 'react-native';

const PasswordStrengthBar = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 7) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const getColor = (index, strength) => {
    if (index >= strength) return '#A0A0A0'; 
  
    switch (strength) {
      case 1:
      case 2:
        return '#FF073A'; 
      case 3:
        return '#FF7F00'; 
      case 4:
        return '#FFFF33'; 
      case 5:
        return '#33FF00'; 
      default:
        return '#A0A0A0'; 
    }
  };
  

  const strength = calculateStrength(password);
  const strengthBar = Array.from({ length: 5 }, (_, i) => ({
    color: getColor(i, strength),
  }));

  return (
    <View style={styles.container}>
      {strengthBar.map((bar, index) => (
        <View
          key={index}
          style={[styles.barUnit, { backgroundColor: bar.color, borderRadius:10, }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 2,
    marginBottom: 10,
    width: 250,
  },
  barUnit: {
    flex: 1,
    marginHorizontal: 2,
  },
});

export default PasswordStrengthBar;
