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

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function UseEffectCleanup() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    console.log(`⏳Timer started!`);

    const timer = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000);

      return () => {
        console.log(`🧹 Timer cleaned up`);
        clearInterval(timer);
      }
    }, []);

    return (
      <View style = {[styles.container, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {timer}s </Text>
      </View>

    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    textOutput: {
      marginTop: 40,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })


