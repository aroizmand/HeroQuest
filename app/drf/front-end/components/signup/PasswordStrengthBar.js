import React from 'react';
import { View, StyleSheet } from 'react-native';

const PasswordStrengthBar = ({ strength }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.strengthBar, { width: `${strength}%` }, strengthColor(strength)]} />
    </View>
  );
};

const strengthColor = (strength) => {
  if (strength < 25) {
    return styles.weak;
  } else if (strength < 50) {
    return styles.fair;
  } else if (strength < 75) {
    return styles.good;
  } else {
    return styles.strong;
  }
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 5,
  },
  weak: { backgroundColor: '#ff3e3e' },
  fair: { backgroundColor: '#ffae00' },
  good: { backgroundColor: '#f7d002' },
  strong: { backgroundColor: '#12cc12' },
});

export default PasswordStrengthBar;
