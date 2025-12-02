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
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function UseEffectTopic2Quiz1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const theme = darkMode ? darkTheme : lightTheme;

  const color = () => {
    if (!email.trim()) return theme.warning;
    if (!email.includes("@gmail.com")) return theme.error
    return theme.success

  }

  useEffect(() => {
    if (!email.trim()) {
      setMessage(`Please enter your email!`);
    } else if (!email.includes("@")) {
      setMessage(`Invalid email please use ("@")`) 
    } else {
      setMessage(`Valid!`);
    }
  }, [email]);

  return (
    <View style = {[styles.container, {backgroundColor: theme.background}]}>
      <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
      placeholder='type your email' value={email} onChangeText={setEmail}/>

      <Text style = {[styles.textOutput, {color: color() }]}> Status: {message} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '85%',
    marginTop: 50,
    fontSize: 18,
    alignItems: 'center'
  },

  textOutput: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})