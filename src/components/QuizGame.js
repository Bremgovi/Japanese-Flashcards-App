import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const QuizGame = ({ questions, navigation }) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      playSound(require("../assets/audio/lessonFinish.mp3"));
    }
  }, [currentQuestionIndex]);

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
      {currentQuestionIndex < questions.length ? (
        <View style={styles.container}>
          <Image
            source={require("../assets/images/catStudy.png")}
            style={{
              width: 150,
              height: 150,
              marginBottom: 5,
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
        <View style={styles.finalScreen}>
          <Text style={styles.finalScreenHeader}>Haz completado la lección!</Text>
          <Image
            source={require("../assets/images/endLesson.png")}
            style={{
              width: 200,
              height: 200,
              margin: 20,
            }}
          />
          <Text style={styles.finalScreenText}>
            Has contestado{" "}
            <Text style={{ color: "rgba(119, 164, 204, 1)" }}>
              {correctAnswers} de {questions.length}{" "}
            </Text>
            preguntas correctamente.
          </Text>
        </View>
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
            currentQuestionIndex < questions.length ? null : { backgroundColor: "rgba(170, 209, 230, 1)" },
          ]}
          onPress={() => {
            if (currentQuestionIndex < questions.length) {
              handleSubmit();
            } else {
              navigation.navigate("HomeScreen");
            }
          }}
          disabled={!selectedAnswer && !isSubmitted && currentQuestionIndex < questions.length}
        >
          <Text style={styles.submitButtonText}>{currentQuestionIndex < questions.length ? (isSubmitted ? "Siguiente" : "Checar") : "Volver"}</Text>
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
});

export default QuizGame;
