import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Inter_900Black, Inter_500Medium } from "@expo-google-fonts/inter";
import CategoryList from "./src/components/Categories";
import NavBar from "./src/components/NavBar";
import QuizGame from "./src/components/QuizGame";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import questionsData from "./src/assets/questions.json";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuestionGame" component={QuestionGame} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });
  const [imageLayout, setImageLayout] = useState({ width: 0, height: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);

  const handleImageLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setImageLayout({ x, y, width, height });
  };

  const handleImageClick = () => {
    setIsClicked(true);
    const randomXOffset = Math.floor(Math.random() * 100) - 50;
    const randomYOffset = Math.floor(Math.random() * 100) - 50;
    const randomX = imageLayout.x + randomXOffset;
    const randomY = imageLayout.y + randomYOffset;
    setDialoguePosition({ x: randomX + 100, y: randomY + 100 });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <NavBar title="Aprende Japonés!" subtitle="日本語を勉強します" />
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={handleImageClick}>
            <Image source={require("./src/assets/images/catStudy.png")} style={styles.image} onLayout={handleImageLayout} />
          </TouchableOpacity>
          {isClicked && <DialogueBalloon position={dialoguePosition} />}
          <CategoryList navigation={navigation} />
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const QuestionGame = ({ route, navigation }) => {
  const { category } = route.params;
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // Fetch questions.json from the server
        const response = await fetch("https://bremgovi.github.io/Japanese-Flashcards-App/questions.json");
        const questionsData = await response.json();
        // Filter questions based on category
        const filteredQuestions = questionsData.questions.filter((question) => question.category === category);
        // Save filtered questions to AsyncStorage
        await AsyncStorage.setItem("questions", JSON.stringify(filteredQuestions));
        // Set questionsList state
        setQuestionsList(filteredQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, [category]); // Fetch questions when category changes

  return (
    <View style={styles.container}>
      <QuizGame questions={questionsList} navigation={navigation}></QuizGame>
    </View>
  );
};

const DialogueBalloon = ({ position }) => {
  const messages = [
    "(╯°□°）╯︵ ┻━┻",
    "😡😡😡😡😡",
    "😾😾😾😾😾",
    "💢💢💢",
    "💢",
    "ಠ_ಠ",
    "ヽ(`Д´)ﾉ",
    "（；¬＿¬)",
    "(ノಠ益ಠ)ノ彡┻━┻",
    "ヽ(｀⌒´メ)ノ",
    "(눈_눈)",
    "凸(-_-)凸",
    "(¬_¬)",
    "╰(°□°)╯",
    "¡No me toques!",
    "¡Déjame estudiar!",
    "¡No molestes!",
    "¡Vete!",
    "¡No tengo tiempo para esto!",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return (
    <View style={[styles.dialogueBalloon, { top: position.y, left: position.x }]}>
      <Text>{randomMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Inter_500Medium",
    fontSize: 35,
    letterSpacing: 5,
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
    margin: 20,
  },
  dialogueBalloon: {
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  scrollView: {
    backgroundColor: "rgba(40, 40, 73, 1)",
  },
});
