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
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default function Practice1Task1() {
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  const theme = toggleDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setMessage("Welcome")

    const timer = setTimeout(() => {
      setWelcomeMessage("KAYA MO YAN KURT!")
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    }, []);

    return (
      <View style = {[styles.container, {backgroundColor: theme.background}]}>
        <Text style = {[styles.welcomeText, {color: theme.textPrimary}]}> {message} </Text>

        {loading ? (
          <View style = {[styles.container, {backgroundColor: theme.background}]}>
            <ActivityIndicator size={'large'} color={'blue'}/>
            <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading...</Text>
            </View>
        ): (
          <Text style = {[styles.textOutput]}> {welcomeMessage} </Text>
        )}
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

  },

  welcomeText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },

  textLoading: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold'
  },

  textOutput: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
})



 
  
   

   


 
