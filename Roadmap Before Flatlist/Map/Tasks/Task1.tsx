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

export default function MappingQuiz1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const fruits : string[] = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
  const listedFruits = fruits.map((fruit, index) => `Fruit #${index + 1}. ${fruit.toUpperCase()}\n` );
 

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Map Quiz 1</Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textOutputTitle, {color: theme.textPrimary}]}> Fruits Without List. </Text>
        <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> {fruits.join("\n")} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textOutputTitle, {color: theme.textPrimary}]}> Listed Fruits </Text>
        <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> {listedFruits.join("")} </Text>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  card: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 30,
    padding: 30,
    borderRadius: 20
  },

  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  divider: {
    height: 2,
    width: '100%',
    marginVertical: 10,
  },

  textOutputTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  textOutputSection: {
    fontSize: 18,
    textAlign: "center",
    
  }
})