import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import * as Speech from "expo-speech";

const Syllabary = ({ chars, specialChars }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderCharacter = (character) => (
    <View style={styles.characterContainer}>
      <TouchableOpacity style={styles.characterButton} onPress={() => handleButtonClick(character)}>
        <Text style={styles.characterText}>{character}</Text>
        <Text style={styles.pronunciationText}>{getPronunciation(character)}</Text>
      </TouchableOpacity>
    </View>
  );

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
            {renderCharacter(character)}
            {(index + 1) % 5 === 0 && <View style={styles.newRow} />}
          </React.Fragment>
        ))}
        {specialChars.map((character, index) => (
          <React.Fragment key={index}>
            {renderCharacter(character)}
            {(index + 1) % 3 === 0 && <View style={styles.newRow} />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const getPronunciation = (character) => {
  const pronunciationLookup = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
    か: "Ka",
    き: "Ki",
    く: "Ku",
    け: "Ke",
    こ: "Ko",
    さ: "Sa",
    し: "Shi",
    す: "Su",
    せ: "Se",
    そ: "So",
    た: "Ta",
    ち: "Chi",
    つ: "Tsu",
    て: "Te",
    と: "To",
    な: "Na",
    に: "Ni",
    ぬ: "Nu",
    ね: "Ne",
    の: "No",
    は: "Ha",
    ひ: "Hi",
    ふ: "Fu",
    へ: "He",
    ほ: "Ho",
    ま: "Ma",
    み: "Mi",
    む: "Mu",
    め: "Me",
    も: "Mo",
    や: "Ya",
    ゆ: "Yu",
    よ: "Yo",
    ら: "Ra",
    り: "Ri",
    る: "Ru",
    れ: "Re",
    ろ: "Ro",
    わ: "Wa",
    を: "Wo",
    ん: "n",
    が: "Ga",
    ぎ: "Gi",
    ぐ: "Gu",
    げ: "Ge",
    ご: "Go",
    ざ: "Za",
    じ: "Ji",
    ず: "Zu",
    ぜ: "Ze",
    ぞ: "Zo",
    だ: "Da",
    ぢ: "Dji",
    づ: "Dzu",
    で: "De",
    ど: "Do",
    ば: "Ba",
    び: "Bi",
    ぶ: "Bu",
    べ: "Be",
    ぼ: "Bo",
    ぱ: "Pa",
    ぴ: "Pi",
    ぷ: "Pu",
    ぺ: "Pe",
    ぽ: "Po",
    ア: "a",
    イ: "i",
    ウ: "u",
    エ: "e",
    オ: "o",
    カ: "Ka",
    キ: "Ki",
    ク: "Ku",
    ケ: "Ke",
    コ: "Ko",
    サ: "Sa",
    シ: "Shi",
    ス: "Su",
    セ: "Se",
    ソ: "So",
    タ: "Ta",
    チ: "Chi",
    ツ: "Tsu",
    テ: "Te",
    ト: "To",
    ナ: "Na",
    ニ: "Ni",
    ヌ: "Nu",
    ネ: "Ne",
    ノ: "No",
    ハ: "Ha",
    ヒ: "Hi",
    フ: "Fu",
    ヘ: "He",
    ホ: "Ho",
    マ: "Ma",
    ミ: "Mi",
    ム: "Mu",
    メ: "Me",
    モ: "Mo",
    ヤ: "Ya",
    ユ: "Yu",
    ヨ: "Yo",
    ラ: "Ra",
    リ: "Ri",
    ル: "Ru",
    レ: "Re",
    ロ: "Ro",
    ワ: "Wa",
    ヲ: "Wo",
    ン: "n",
    ガ: "Ga",
    ギ: "Gi",
    グ: "Gu",
    ゲ: "Ge",
    ゴ: "Go",
    ザ: "Za",
    ジ: "Ji",
    ズ: "Zu",
    ゼ: "Ze",
    ゾ: "Zo",
    ダ: "Da",
    ヂ: "Dji",
    ヅ: "Dzu",
    デ: "De",
    ド: "Do",
    バ: "Ba",
    ビ: "Bi",
    ブ: "Bu",
    ベ: "Be",
    ボ: "Bo",
    パ: "Pa",
    ピ: "Pi",
    プ: "Pu",
    ペ: "Pe",
    ポ: "Po",
  };
  return pronunciationLookup[character] || "";
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  characterContainer: {
    alignItems: "center",
  },
  characterButton: {
    margin: 4,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 0,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  characterText: {
    fontSize: 35, // Adjust font size as needed
  },
  pronunciationText: {
    textAlign: "center",
    fontSize: 20, // Adjust font size as needed
    color: "gray", // Color for pronunciation text
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
