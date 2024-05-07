import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import CustomInput from "./CustomInput";
import CustomText from "../customText/CustomText";
import styles from "./styles";

const PointDistribution = ({ selectedCategories, navigation }) => {
  const [attributes, setAttributes] = useState(
    selectedCategories.reduce(
      (acc, category) => ({ ...acc, [category.toLowerCase()]: 0 }),
      {}
    )
  );

  const handleChange = (attribute, value) => {
    setAttributes({ ...attributes, [attribute]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    // Handle point distribution submission
    console.log("Points distributed:", attributes);
    navigation.navigate("NextScreen"); // Navigate to the next screen
  };

  return (
    <View style={styles.slide}>
      <CustomText style={styles.distributionText}>
        Distribute your points:
      </CustomText>
      {selectedCategories.map((category) => (
        <CustomInput
          key={category}
          iconName="stats-chart"
          placeholder={category}
          value={attributes[category.toLowerCase()].toString()}
          onChangeText={(value) => handleChange(category.toLowerCase(), value)}
          keyboardType="numeric"
        />
      ))}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <CustomText style={styles.submitButtonText}>Submit</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default PointDistribution;
