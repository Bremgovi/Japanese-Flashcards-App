import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const QuizGame = ({ questions, navigation }) => {
  const [sound, setSound] = useState(null);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScreenProps, setFinalScreenProps] = useState({});

  useEffect(() => {
    if (questions && questions.length > 0) {
      if (currentQuestionIndex >= questions.length) {
        playSound(require("../assets/audio/lessonFinish.mp3"));
        setGameOver(true);
        setFinalScreenProps({
          headerText: "You've completed the game!",
          imageSource: require("../assets/images/endLesson.png"),
          resultText: `You answered ${correctAnswers} out of ${questions.length} questions correctly.`,
        });
      }
      if (lives <= 0) {
        setGameOver(true);
        setFinalScreenProps({
          headerText: "You've lost the game!",
          imageSource: require("../assets/images/lose.png"),
          resultText: `You answered ${correctAnswers} out of ${questions.length} questions correctly.`,
        });
        setIsSubmitted(false);
        setSelectedAnswer(null);
      }
    }
  }, [currentQuestionIndex, lives]);

  const [fontsLoaded] = useFonts({
    "8bitoperator_jve": require("../assets/fonts/8bitoperator_jve.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);
    await sound.playAsync();
  }

  const handleTTS = (answer) => {
    const isJapanese = /[^\u0000-\u007FáéíóúÁÉÍÓÚüÜñÑ]/.test(answer);
    if (isJapanese && isPlaying) {
      Speech.stop();
      Speech.speak(answer, { language: "ja-JP" });
    } else if (isJapanese) {
      Speech.speak(answer, { language: "ja-JP" });
      setIsPlaying(true);
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    handleTTS(answer);
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      // If already submitted, proceed to the next question or finish the quiz
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsSubmitted(false);
      setSelectedAnswer(null);
    } else {
      // If not submitted, check the answer
      setIsSubmitted(true);
      if (isAnswerCorrect()) {
        setCorrectAnswers(correctAnswers + 1);
        await playSound(require("../assets/audio/correct.mp3")); // Play sound for correct answer
      } else {
        await playSound(require("../assets/audio/incorrect.mp3")); // Play sound for incorrect answer
        setLives(lives - 1);
      }
    }
  };

  const isAnswerCorrect = () => {
    if (currentQuestionIndex < questions.length) {
      return selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    }
    return false;
  };

  return (
    <View style={[styles.container, styles.background]}>
      {!gameOver ? (
        questions && questions.length > 0 && currentQuestionIndex < questions.length ? (
          <View style={styles.container}>
            <View style={styles.livesCounter}>
              <Image
                source={require("../assets/images/heart.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 20,
                }}
              ></Image>
              <Text style={styles.livesText}>{lives}</Text>
            </View>
            <Image
              source={require("../assets/images/catStudy.png")}
              style={{
                width: 150,
                height: 150,
                marginBottom: 5,
                marginTop: 100,
              }}
            />
            <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => handleAnswerSelection(answer)} disabled={isSubmitted}>
                <View style={[styles.answerButton, selectedAnswer === answer ? styles.selectedAnswer : null]}>
                  <Text style={[styles.answerText, selectedAnswer === answer ? styles.selectedAnswerText : null]}>{answer}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        ) : (
          <Text style={styles.question}>No questions available</Text>
        )
      ) : (
        <FinalScreen {...finalScreenProps} />
      )}
      <View style={[styles.feedbackBox, isSubmitted ? styles.feedbackBoxShow : null]}>
        <Text style={[styles.feedbackHeader, isAnswerCorrect() ? styles.correctAnswerText : styles.incorrectAnswerText]}>
          {isSubmitted ? (
            isAnswerCorrect() ? (
              <Icon name="check-circle" size={28} color="rgba(121, 210, 121, 1)" />
            ) : (
              <Icon name="times-circle" size={28} color="rgba(240, 50, 95, 1)" />
            )
          ) : null}
          {isSubmitted ? " La respuesta es " + (isAnswerCorrect() ? "correcta" : "incorrecta") : null}
        </Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitted ? (isAnswerCorrect() ? styles.correctAnswer : styles.incorrectAnswer) : null,
            !selectedAnswer ? styles.disabledButton : null,
            !gameOver ? null : { backgroundColor: "rgba(170, 209, 230, 1)" },
          ]}
          onPress={() => {
            if (!gameOver) {
              handleSubmit();
            } else {
              navigation.navigate("HomeScreen");
            }
          }}
          disabled={!selectedAnswer && !isSubmitted && !gameOver}
        >
          <Text style={styles.submitButtonText}>{!gameOver ? (isSubmitted ? "Siguiente" : "Checar") : "Volver"}</Text>
        </TouchableOpacity>
        {isSubmitted && (
          <Text style={[styles.feedbackText, isAnswerCorrect() ? styles.correctAnswerText : styles.incorrectAnswerText]}>
            La respuesta correcta es: {questions[currentQuestionIndex].correctAnswer}
          </Text>
        )}
      </View>
    </View>
  );
};

const FinalScreen = ({ headerText, imageSource, resultText }) => {
  return (
    <View style={styles.finalScreen}>
      <Text style={styles.finalScreenHeader}>{headerText}</Text>
      <Image
        source={imageSource}
        style={{
          width: 200,
          height: 200,
          margin: 20,
        }}
      />
      <Text style={styles.finalScreenText}>{resultText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(36, 36, 61, 1)",
  },
  finalScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  finalScreenHeader: {
    textAlign: "center",
    color: "rgba(250, 179, 27, 1)",
    fontSize: 50,
    fontWeight: "bold",
  },
  finalScreenText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    padding: 10,
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerButton: {
    width: "80%",
    height: "10%",
    borderWidth: 5,
    borderColor: "rgba(156, 174, 189, 1)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  answerText: {
    color: "white",
    fontSize: 20,
  },
  feedbackBox: {
    width: "100%",
    height: "25%",
    justifyContent: "flex-start",
    padding: 10,
  },
  feedbackBoxShow: {
    backgroundColor: "rgba(32, 32, 53, 1)",
  },
  feedbackHeader: {
    margin: 0,
    fontSize: 28,
    fontWeight: "bold",
  },
  feedbackText: {
    marginTop: 25,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  submitButton: {
    width: "80%",
    height: "30%",
    backgroundColor: "rgba(121, 210, 121, 1)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 20,
    color: "rgba(32, 32, 53, 1)",
    fontWeight: "bold",
  },
  correctAnswer: {
    backgroundColor: "rgba(121, 210, 121, 1)",
  },
  incorrectAnswer: {
    backgroundColor: "rgba(240, 50, 95, 1)",
  },
  correctAnswerText: {
    color: "rgba(121, 210, 121, 1)",
  },
  incorrectAnswerText: {
    color: "rgba(240, 50, 95, 1)",
  },
  selectedAnswer: {
    borderColor: "rgba(119, 164, 204, 1)",
  },
  selectedAnswerText: {
    color: "rgba(119, 164, 204, 1)",
  },
  disabledButton: {
    backgroundColor: "rgba(170, 209, 230, 0.5)",
  },
  livesCounter: {
    marginTop: 20,
    marginRight: 20,
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  livesText: {
    fontFamily: "8bitoperator_jve",
    color: "white",
    fontSize: 40,
  },
});

export default QuizGame;
