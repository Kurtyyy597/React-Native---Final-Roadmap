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
import {View, TextInput, StyleSheet, Text } from 'react-native';

export default function UseEffectTopic3Quiz1() {
  const [darkMode, setDarkMode] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(10);
  const [message, setMessage] = useState<string>("");

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setMessage(`Done`)
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    }, []);

    return (
      <View style = {[styles.container, {backgroundColor: theme.background}]}>
        {seconds > 0 && (
          <Text style = {[styles.textOutput1, {color: theme.textPrimary}]}> {seconds}s</Text>
        )}

        {seconds === 0 && (
          <Text style = {[styles.textOutput1, {color: theme.textPrimary}]}> Count down Stops: {message} </Text>
        )}
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  textOutput1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50
  }
})



 
