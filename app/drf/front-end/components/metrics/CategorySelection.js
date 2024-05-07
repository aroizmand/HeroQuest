import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import CustomText from "../customText/CustomText";
import Icon from "react-native-vector-icons/MaterialIcons";

const CategorySelectionScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [customCategory, setCustomCategory] = useState("");
  const [points, setPoints] = useState(30);

  const handleAddCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCustomCategory("");
    } else {
      Alert.alert("Error", "Category already exists or input is empty");
    }
  };

  const handleToggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category] ? 0 : prev[category] === 0 ? undefined : 0,
    }));
  };

  const handlePercentageChange = (text, category) => {
    const percentage = parseInt(text) || 0;
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: percentage,
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => handleToggleCategory(item)}
        style={styles.categoryButton}
      >
        <CustomText style={styles.categoryText}>{item}</CustomText>
      </TouchableOpacity>
      <CustomText style={styles.categoryTextLevel}>Lvl 1.</CustomText>
      {selectedCategories[item] !== undefined && (
        <TextInput
          style={styles.inputNumber}
          onChangeText={(text) => handlePercentageChange(text, item)}
          value={String(selectedCategories[item])}
          keyboardType="numeric"
          placeholder="0%"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Points Available</CustomText>
        <CustomText style={styles.points}>{points}</CustomText>
      </View>
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setCustomCategory}
          value={customCategory}
          placeholder="Add Category"
          maxLength={20}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Icon name="add" size={30} color="cyan" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
  },
  points: {
    fontSize: 26,
    color: "cyan",
  },
  containerList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 20,
  },
  addContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    color: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  inputNumber: {
    backgroundColor: "white",
    borderRadius: 20,
    color: "#000",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center",
  },
  addButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: 200,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "cyan",
  },
  categoryTextLevel: {
    fontSize: 16,
    color: "white",
  },
});

export default CategorySelectionScreen;
