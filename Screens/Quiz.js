import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const Quiz = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]); // Store answers here
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false); // Track if the quiz is submitted

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://192.168.189.182:3001/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);  // Stop loading indicator when done
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  if (!quiz) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No quiz data found</Text>
      </View>
    );
  }

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    if (!submitted) {  // Allow answer selection only if the quiz is not submitted
      const updatedAnswers = [...answers];
      updatedAnswers[questionIndex] = selectedAnswer;
      setAnswers(updatedAnswers); // Update the selected answer for the question
    }
  };

  const handleSubmit = () => {
    if (!userName) {
      Alert.alert('Error', 'Please enter your name before submitting.');
      return;
    }

    // Calculate how many answers are correct
    let correctAnswersCount = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });

    Alert.alert(`Quiz Submitted`, `You answered ${correctAnswersCount} out of ${quiz.questions.length} questions correctly.`, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('LeaderBoard', { score: correctAnswersCount, userName: userName });
        },
      },
    ]);
    setSubmitted(true); // Mark the quiz as submitted
  };

  // Function to get the background color of each option
  const getOptionColor = (questionIndex, option) => {
    if (submitted) {
      // If the quiz is submitted, show the correct/incorrect answer
      if (option === quiz.questions[questionIndex].correctAnswer) {
        return 'green'; // Correct answer - green
      } else if (answers[questionIndex] === option) {
        return 'red'; // Selected wrong answer - red
      }
      return 'gray'; 
    } else {
      return answers[questionIndex] === option ? 'blue' : 'gray'; // Selected option is blue
    }
  };

  return (
    <ScrollView>
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{quiz.title}</Text>
      {quiz.questions.map((question, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text>{question.questionText}</Text>
          {question.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: getOptionColor(index, option),
                padding: 10,
                marginVertical: 5,
                borderRadius: 5,
              }}
              onPress={() => handleAnswerSelect(index, option)}
              disabled={submitted}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        style={{ borderWidth: 1, padding: 10, marginTop: 20 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
    </ScrollView>

  );
};

export default Quiz;
