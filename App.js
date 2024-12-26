import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import QuizList from './Screens/QuizList';  
import Quiz from './Screens/Quiz';
import LeaderBoard from './Screens/LeaderBoard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator initialRouteName="QuizList">
          <Stack.Screen 
            name="QuizList" 
            component={QuizList} 
            options={{ title: 'Available Quizzes' }} 
          />
          <Stack.Screen 
            name="Quiz" 
            component={Quiz} 
            options={{ title: 'Take Quiz' }} 
          />
          <Stack.Screen 
            name="LeaderBoard" 
            component={LeaderBoard} 
            options={{ title: 'Top Scores' }} 
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
} 
