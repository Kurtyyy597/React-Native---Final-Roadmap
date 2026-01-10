import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};

const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};

type Players = {
  id: number;
  name: string;
  score: number;
};

export default function MapQuiz4() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [players, setPlayers] = useState<Players[]>([
    { id: 11, name: "Allen", score: 100 },
    { id: 12, name: "Mark", score: 70 },
    { id: 13, name: "Kyle", score: 90 },
  ]);

  const updateRanking = players.map(({id, name, score, }, index) => ({
    id,
    name,
    score,
    ranking: index + 1
  }));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      {updateRanking.map((up) => (
        <View key={up.id} style = {[styles.card, {backgroundColor: theme.surface}]}>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {up.id}. Name: {up.name} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Score: {up.score} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Ranking: {up.ranking} </Text>
        </View>
      ))}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  card: {
    width: "85%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",
    margin: 10

  },

  textOutput: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  }

  
})


