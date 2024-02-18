import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MetricInputScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Metric Input Screen</Text>
      {/* Placeholder for metric input form */}
      <Button title="Update Metrics" onPress={() => navigation.goBack()} /> {/* Go back to the previous screen after updating */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MetricInputScreen;
