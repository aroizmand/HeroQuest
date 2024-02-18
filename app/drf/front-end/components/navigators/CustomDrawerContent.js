import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed


const CustomDrawerContent = (props) => {
    const { logout } = useAuth(); 
  
    const handleLogout = () => {
        logout(); 
      };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 1,
    paddingTop: 15,
  },
});

export default CustomDrawerContent;
