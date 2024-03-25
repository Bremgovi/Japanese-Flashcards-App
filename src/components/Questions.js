import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const QuizGame = ({ data }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const isAnswerCorrect = () => {
    return selectedAnswer === data.correctAnswer;
  };
  return (
    <View style={[styles.container, styles.background]}>
      <View style={styles.container}>
        <Text style={styles.question}>{data.question}</Text>
        {data.answers.map((answer, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handleAnswerSelection(answer)} disabled={isSubmitted}>
            <View style={[styles.answerButton, selectedAnswer === answer ? styles.selectedAnswer : null]}>
              <Text style={[styles.answerText, selectedAnswer === answer ? styles.selectedAnswerText : null]}>{answer}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={[styles.feedbackBox, isSubmitted ? styles.feedbackBoxShow : null]}>
        <Text style={[styles.feedbackHeader, isAnswerCorrect() ? styles.correctAnswerText : styles.incorrectAnswerText]}>
          {isSubmitted ? (
            isAnswerCorrect() ? (
              <Icon name="check-circle" size={30} color="rgba(121, 210, 121, 1)" />
            ) : (
              <Icon name="times-circle" size={30} color="rgba(240, 50, 95, 1)" />
            )
          ) : null}
          {isSubmitted ? " The answer is" + (isAnswerCorrect() ? " correct" : " wrong") : null}
        </Text>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitted ? (isAnswerCorrect() ? styles.correctAnswer : styles.incorrectAnswer) : null, !selectedAnswer ? styles.disabledButton : null]}
          onPress={handleSubmit}
          disabled={isSubmitted || !selectedAnswer}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
        {isSubmitted && (
          <Text style={[styles.feedbackText, isAnswerCorrect() ? styles.correctAnswerText : styles.incorrectAnswerText]}>The correct answer is: {data.correctAnswer}</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(36, 36, 61, 1)",
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    padding: 10,
    fontSize: 50,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
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
    height: "30%",
    justifyContent: "flex-start",
    padding: 10,
  },
  feedbackBoxShow: {
    backgroundColor: "rgba(32, 32, 53, 1)",
  },
  feedbackHeader: {
    margin: 10,
    fontSize: 30,
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
    height: "25%",
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
