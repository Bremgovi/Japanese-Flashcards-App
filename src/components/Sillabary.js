import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import * as Speech from "expo-speech";

const Syllabary = ({ navigation, chars, specialChars }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleButtonClick = (character) => {
    if (isPlaying) {
      Speech.stop();
      Speech.speak(character, { language: "ja-JP" });
    } else {
      Speech.speak(character, { language: "ja-JP" });
      setIsPlaying(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/catStudy.png")} style={styles.image} />
        </View>
        {chars.map((character, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.characterButton} onPress={() => handleButtonClick(character)}>
              <Text style={styles.characterText}>{character}</Text>
            </TouchableOpacity>
            {(index + 1) % 5 === 0 && <View style={styles.newRow} />}
          </React.Fragment>
        ))}
        {specialChars.map((character, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.characterButton} onPress={() => handleButtonClick(character)}>
              <Text style={styles.characterText}>{character}</Text>
            </TouchableOpacity>
            {(index + 1) % 3 === 0 && <View style={styles.newRow} />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
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
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  characterText: {
    fontSize: 35, // Adjust font size as needed
  },
  newRow: {
    flexBasis: "100%",
    height: 0,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Syllabary;
