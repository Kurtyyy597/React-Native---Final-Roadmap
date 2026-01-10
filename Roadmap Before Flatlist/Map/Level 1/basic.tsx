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

export default function MapBasics() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const numbers : number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const addNum = numbers.map((num) => num + 10);

  const multiplyNum = numbers.map((num) => num * 4);

  const cars : string[] = ["Acura,", "Alfa Romeo,", "Aston Martin,", "Bentley,", "BMW"];
  const upperCars = cars.map((car) => car.toUpperCase());

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Map Introduction </Text>
      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        
        <Text style = {[styles.textTitleNumber, {color: theme.success}]}> Number Mapping </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Original Numbers:  </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {numbers.join(" ")} </Text>

        <Text style = {[styles.textSection, {color: theme.success}]}> Multiply Every Number:  </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {multiplyNum.join(" ")} </Text>

        <Text style = {[styles.textSection, {color: theme.success}]}> Add Every Number:  </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {addNum.join(" ")} </Text>
      </View>

      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        <Text style = {[styles.textTitle, {color: theme.error}]}> Map String </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Original Cars:  </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {cars.join(" ")} </Text>

        <Text style = {[styles.textSection, {color: theme.success}]}> Uppercase Cars </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {upperCars.join(" ")} </Text>

        
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center'
  },

  card: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 5,
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
    fontSize: 22,
    textAlign: 'center',
    fontStyle: 'italic'
  },

  textTitleNumber: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'

  }
})
