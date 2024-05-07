import React from "react";
import {
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import MetricInputScreen from "../metrics/MetricInputScreen";
import styles from "./styles";

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
        <View>
          <View style={styles.modalView}>
            <MetricInputScreen navigation={navigation} />
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default StartingModal;
