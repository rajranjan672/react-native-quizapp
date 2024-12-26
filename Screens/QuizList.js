import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const QuizList = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // const response = await axios.get('http://localhost:3001/quizzes'); --for android emulator

        const response = await axios.get('http://192.168.189.182:3001/quizzes'); //for expo app use your pc address
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Available Quizzes</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Button
              title="Take Quiz"
              onPress={() => navigation.navigate('Quiz', { quizId: item._id })}
            />
          </View>
        )}
      />
    </View>
  );
};

export default QuizList;
