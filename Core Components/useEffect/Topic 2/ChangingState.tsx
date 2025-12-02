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
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function UseEffectChangingState() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
  const theme = toggleDarkMode ? darkTheme : lightTheme;
 
  
  useEffect(() => {
    if (!name.trim()) {
      setMessage(`Please enter your name!`);
    } else {
      setMessage(`Hello ${name}!`)
    }
  }, [name]);

  return (
    <View style = {[styles.container, {backgroundColor: theme.background}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> USEFFECT WITH STATE CHANGES!</Text>
      <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]} placeholder='type your name' value={name} onChangeText={setName}/>
      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Message: {message} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"

  },

  

  textTitle: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold'

  },

  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16

  },

  textOutput: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold'

  },


})
