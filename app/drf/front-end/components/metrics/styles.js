import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  maxPoints: {
    fontSize: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  graphContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  continueContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 35,
  },
  continueButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  continue: {
    fontSize: 15,
    color: "lightgrey",
    textAlignVertical: "bottom",
  },
  continueIcon: {
    marginLeft: 5,
  },
});

export default styles;
