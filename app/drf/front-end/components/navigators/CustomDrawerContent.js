import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext'; 
import { CustomTouchableScale } from '../touchables/CustomTouchableScale';
import CustomText from '../customText/CustomText';


const CustomDrawerContent = (props) => {
    const { logout } = useAuth(); 
  
    const handleLogout = () => {
        logout(); 
      };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <CustomTouchableScale onPress={handleLogout}>
          <View  style={styles.logoutCOntainer}>
            <CustomText style={styles.logoutText}>LOGOUT</CustomText>
          </View>
        </CustomTouchableScale>
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
  logoutCOntainer:{
    backgroundColor:"#e01a0b",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    padding:8,
    margin:15
  }
});

export default CustomDrawerContent;
