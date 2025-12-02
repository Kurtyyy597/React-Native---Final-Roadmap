import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
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

interface Person {
  name: string;
  age: number;
  city: string;
};

export default function ObjectsLesson2BracketNotation() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme
  
  const person : Person = {
    name: "Kurt Marquez",
    age: 21,
    city: "Caloocan City"
  };

  return (
    <SafeAreaView style = {[styles.container, ]}>

      <View style = {[styles.card, {backgroundColor: theme.warning}]}>

        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Bracket Notation </Text>

        <Text style = {[styles.textBracketNotation, {color: theme.textPrimary}]}>
          {`${person["name"]}`}
        </Text>


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
    width: '100%',
    height: 150,
    padding: 10,
    
  },

  textTitle: {
    marginTop: 30,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textBracketNotation: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400'

  },


})