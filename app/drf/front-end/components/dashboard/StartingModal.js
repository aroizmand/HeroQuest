import React from "react";
import { View, Modal, ImageBackground, TouchableOpacity } from "react-native";
import MetricInputScreen from "../metrics/MetricInputScreen";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const StartingModal = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ImageBackground
        style={styles.centeredView}
        source={require("../../assets/low-poly-grid-haikei.png")}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <MetricInputScreen navigation={navigation} />
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default StartingModal;
