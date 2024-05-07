import React from "react";
import { View } from "react-native";
import styles from "./styles";
import CustomText from "../customText/CustomText";

const ExplanationScreen = () => {
  return (
    <View style={styles.containerExplanation}>
      <CustomText style={styles.explanationTitle}>
        Welcome to Your Quest Tracker!
      </CustomText>
      <CustomText style={styles.explanationSubtitle}>
        Empower Your Growth Journey
      </CustomText>
      <CustomText style={styles.explanationText}>
        This app is designed to help you track your progress in various aspects
        of personal development. Whether you're working on improving your
        physical strength, mental agility, or emotional skills, you can
        customize the categories to suit your unique goals.
      </CustomText>
      <CustomText style={styles.explanationText}>
        Set your targets, distribute your points, and watch as your personalized
        levels evolve with each step forward. It's time to level up, one step at
        a time!
      </CustomText>
    </View>
  );
};

export default ExplanationScreen;
