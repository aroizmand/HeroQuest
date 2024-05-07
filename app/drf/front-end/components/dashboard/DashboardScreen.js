import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import baseEndpoint from "../../endPointConfig";
import CustomText from "../customText/CustomText";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StartingModal from "./StartingModal";
import styles from "./styles";

const DashboardScreen = () => {
  const [userData, setUserData] = useState("");
  const { getToken } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  async function getData() {
    const token = await getToken();
    console.log(token);
    if (token) {
      axios
        .post(
          `http://${baseEndpoint}/userdata`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("User data:", response.data);
          setUserData(response.data.data);
          if (
            !response.data.data.attributes ||
            Object.values(response.data.data.attributes).every(
              (val) => val === 0
            )
          ) {
            setModalVisible(true);
          }
        })
        .catch((error) => {
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
      <StartingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

export default DashboardScreen;
