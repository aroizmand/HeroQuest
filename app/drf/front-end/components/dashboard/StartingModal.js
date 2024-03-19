import React from "react";
import { View, Modal, KeyboardAvoidingView, Platform } from "react-native";
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
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <MetricInputScreen navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default StartingModal;
