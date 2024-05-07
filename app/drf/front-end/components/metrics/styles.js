import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 1,
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
  graphContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  swiperContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerExplanation: {
    justifyContent: "space-between",
  },
  explanationTitle: {
    fontSize: 26,
    color: "cyan",
    textAlign: "center",
    marginBottom: 15,
  },
  explanationSubtitle: {
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  explanationText: {
    fontSize: 16,
    textAlign: "justify",
    color: "white",
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  continueContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  continueButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  continueIcon: {
    fontSize: 20,
    color: "#ffffff",
    marginLeft: 5,
  },
  paginationStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default styles;
