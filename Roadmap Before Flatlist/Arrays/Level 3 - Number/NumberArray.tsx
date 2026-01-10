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

// 🌙 Dark Mode Colors
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

export default function ArraysOfNumbers() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const scores : number[] = [10, 20, 30, 40, 50, 60, 70];

  const calculateScores = scores[0] + scores[1] + scores[2] + scores[3] + scores[4] + scores[5] + scores[6];

  const addNumber = [...scores, 21]

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.success}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Arrays of Numbers </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 1. {scores[0]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 2. {scores[1]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 3. {scores[2]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 4. {scores[3]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 5. {scores[4]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 6. {scores[5]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> 7. {scores[6]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Added Number: {addNumber[7]} </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Scores Summary: {calculateScores} </Text>
        
      </View>
    </SafeAreaView>
  )

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  
  card: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 30,
    padding: 30,
    borderRadius: 20
  },

  textTitle: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  textSection: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  }
})