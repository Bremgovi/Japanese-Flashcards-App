import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

const hiraganaSyllabary = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];

const HiraganaSyllabary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {hiraganaSyllabary.map((character, index) => (
        <TouchableOpacity key={index} style={styles.characterButton} onPress={() => {}}>
          <Text style={styles.characterText}>{character}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  characterButton: {
    margin: 5,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  characterText: {
    fontSize: 20, // Adjust font size as needed
  },
});

export default HiraganaSyllabary;
