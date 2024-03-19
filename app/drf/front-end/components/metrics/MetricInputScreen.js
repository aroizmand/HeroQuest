import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import baseEndpoint from "../../endPointConfig";
import styles from "./styles";
import CustomText from "../customText/CustomText";
import CustomInput from "./CustomInput";
import Swiper from "react-native-swiper";
import RadarChart from "./RadarChart";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomTouchableScale } from "../touchables/CustomTouchableScale";
import { TouchableHighlight } from "react-native-gesture-handler";
const MetricInputScreen = ({ navigation }) => {
  const [attributes, setAttributes] = useState({
    strength: 0,
    intelligence: 0,
    agility: 0,
    endurance: 0,
    charisma: 0,
    wisdom: 0,
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const maxPoints = 300;
  const totalAttributes = Object.keys(attributes).length;

  const handleChange = (attribute, value) => {
    // Update the attributes only if the current slide matches the attribute
    if (Object.keys(attributes)[currentSlideIndex] === attribute) {
      setAttributes({ ...attributes, [attribute]: parseInt(value) || 0 });
    }
  };

  const handleSubmit = async () => {
    const totalPoints = Object.values(attributes).reduce(
      (acc, val) => acc + val,
      0
    );
    if (totalPoints > maxPoints) {
      Alert.alert("Error", `Total points exceed ${maxPoints}`);
    } else {
      try {
        // Make the API call
        await axios.post(`http://${baseEndpoint}/distribute-points`, {
          attributes,
        });

        Alert.alert("Success", "Points distributed successfully");
      } catch (error) {
        console.error("Error distributing points:", error);
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "An error occurred while distributing points"
        );
      }
    }
  };

  const remainingPoints =
    maxPoints - Object.values(attributes).reduce((acc, val) => acc + val, 0);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <CustomText style={styles.maxPoints}>{remainingPoints}</CustomText>
      <CustomText style={styles.title}>
        Distribute your points how you see fit!
      </CustomText>
      <View style={styles.graphContainer}>
        <RadarChart attributeValues={attributes} />
      </View>
      <Swiper
        style={styles.wrapper}
        keyboardShouldPersistTaps="handled"
        onIndexChanged={(index) => setCurrentSlideIndex(index)}
        paginationStyle={{
          position: "absolute",
          top: 100,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        dot={
          <View
            style={{
              backgroundColor: "rgba(255,255,255,.3)",
              width: 10,
              height: 10,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#fff",
              width: 12,
              height: 12,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        loop={false}
      >
        {Object.keys(attributes).map((attribute, index) => (
          <View key={attribute} style={styles.slide}>
            <CustomInput
              iconName="stats-chart"
              placeholder={
                attribute.charAt(0).toUpperCase() + attribute.slice(1)
              }
              value={attributes[attribute].toString()}
              onChangeText={(value) => handleChange(attribute, value)}
              keyboardType="numeric"
            />
          </View>
        ))}
      </Swiper>
      {currentSlideIndex === totalAttributes - 1 && (
        <View style={styles.continueContainer}>
          <TouchableOpacity
            onPress={() => console.log("Continue Pressed")}
            style={styles.continueButton}
          >
            <CustomText style={styles.continue}>Continue</CustomText>
            <MaterialIcons
              name="arrow-forward-ios"
              color={"lightgrey"}
              size={25}
              style={styles.continueIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default MetricInputScreen;
