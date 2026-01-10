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

type Person = {
  id: number;
  name: string;
  active: boolean;
};


export default function MapQuiz2() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [persons, setPersons] = useState<Person[]>([
    { id: 1, name: "John", active: false },
    { id: 2, name: "Sarah", active: false },
    { id: 3, name: "Mike", active: false },
  ]);

  const updateSarah = persons.map(pers => 
    pers.id === 2 ?
    {...pers, active: true} : pers
  );

 

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      {updateSarah.map((update) => (
        <View key={update.id} style = {[styles.card, {backgroundColor: theme.surface}]}>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {update.id}. Name: {update.name} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Active: {update.active ? "True" : "False"} </Text>
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
  },

  textOutput: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 24
  }
})
