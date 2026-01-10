import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
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

export default function NonMutatingArrays() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme  : lightTheme;

  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4]);

  const badAdding = () => {
    numbers.push(5);
    setNumbers(numbers)
  };

  const goodAdding = () => {
    const newNumber = [...numbers, 5];
    setNumbers(newNumber);
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Text style = {[styles.title, {color: theme.textPrimary}]}> Mutating vs Non-Mutating </Text>
      <View style = {[styles.card, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.textTitleAllNumbers, {color: theme.textPrimary}]}> Current Numbers </Text>
        <Text style = {[styles.textAllNumbersSection, {color: theme.textPrimary}]}> {numbers.join(" ")}</Text>
        <Pressable onPress={badAdding}
        onLongPress={() => alert("Long pressed")}
        android_ripple={{ color: theme.ripple }}
        hitSlop={10}
        accessibilityRole="button"
        style={({pressed}) => [
          styles.buttonBadAdding,
          {backgroundColor: pressed ? theme.accent : theme.error}
        ]}>
          <Text style = {[styles.textBadButton, {color: theme.textPrimary}]}> Bad Mutating </Text>
        </Pressable>

        <Pressable onPress={goodAdding}
        onLongPress={() => alert("Long pressed")}
        android_ripple={{ color: theme.ripple }}
        hitSlop={10}
        accessibilityRole="button"
        style={({pressed}) => [
          styles.goodButtonAdding,
          {backgroundColor: pressed ? theme.accent : theme.error}
        ]}>
          <Text style = {[styles.textGoodButton, {color: theme.textPrimary}]}> Good Mutating </Text>
        </Pressable>



      </View>
        
     
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',


  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'

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

  textTitleAllNumbers: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textAllNumbersSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'

  },

  buttonBadAdding: {
  
  width: '55%',
  paddingVertical: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, 
  borderRadius: 20


  },

  textBadButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  goodButtonAdding: {
      width: '55%',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    borderRadius: 20


  },

  textGoodButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  }


})

