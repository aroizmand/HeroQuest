import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Swiper from "react-native-swiper";
import styles from "./styles";
import ExplanationScreen from "./ExplanationScreen";
import CategorySelection from "./CategorySelection";
import PointDistribution from "./PointDistribution";

const MetricInputScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    >
      <View
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
        paginationStyle={styles.paginationStyle}
      >
        <Swiper
          style={styles.wrapper}
          loop={false}
          showsPagination={true}
          dot={
            <View
              style={{
                backgroundColor: "grey",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "cyan",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
              }}
            />
          }
        >
          <ExplanationScreen />
          <CategorySelection
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <PointDistribution
            selectedCategories={selectedCategories}
            navigation={navigation}
          />
        </Swiper>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MetricInputScreen;
