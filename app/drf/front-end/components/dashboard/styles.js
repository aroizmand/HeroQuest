import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  modalView: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalTitle: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 16,
  },
  continueButton: {
    flexDirection: "row",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  continueButtonText: {
    color: "cyan",
    fontSize: 16,
    lineHeight: 25,
  },
  continueButtonIcon: {
    marginRight: 10,
  },
  infoButtonIcon: {
    marginRight: 0,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default styles;
