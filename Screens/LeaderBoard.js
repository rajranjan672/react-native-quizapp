import React from 'react';
import { View, Text } from 'react-native';

const LeaderBoard = ({ route }) => {
  const { score, userName } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Leaderboard</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>User: {userName}</Text>
      <Text style={{ fontSize: 18 }}>Your Score: {score}</Text>
    </View>
  );
};

export default LeaderBoard;
