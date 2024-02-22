import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import baseEndpoint from '../../endPointConfig';
import CustomText from '../customText/CustomText';
import { useAuth } from '../context/AuthContext'; 

const DashboardScreen = () => {
  const [userData, setUserData] = useState("");
  const { getToken } = useAuth(); 

  async function getData() {
    const token = await getToken(); 
    console.log(token);
    if (token) {
      axios.post(`http://${baseEndpoint}/userdata`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("User data:", response.data); 
        setUserData(response.data.data); 
      })
      .catch(error => {
        console.error("Failed to fetch user data:", error);
        // Handle error 
      });

    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <View style={styles.container}>
      <CustomText>Dashboard Screen</CustomText>
      <CustomText>{userData.username}</CustomText>
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

export default DashboardScreen;
