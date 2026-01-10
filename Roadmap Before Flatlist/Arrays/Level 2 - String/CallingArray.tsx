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


export default function ArraysTopic2() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  
  const cars: string[] = ['Lambo', 'Honda', 'Geely', 'Acura'];

  const newCars = [...cars, "Bentley"]

  const mixed: any[] = ["Hello", 123, true];

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.title, {color: theme.textPrimary}]}> Arrays of Cars: </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 1. {cars[0]} </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 2. {cars[1]} </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 3. {cars[2]} </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 4. {cars[3]} </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 5. {newCars[4]} </Text>

      </View>

       <View style = {[styles.card, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.title, {color: theme.textPrimary}]}> Mix Arrays: </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 1. {mixed[0]}  </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 2. {mixed[1]}  </Text>
        <Text style = {[styles.section, {color: theme.textPrimary}]}> 3. {mixed[2] ? "TRUE" : "FALSE"} </Text>
      
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

  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  section: {
    fontSize: 24,
    textAlign: 'center',
    fontStyle: 'italic'
  }
})