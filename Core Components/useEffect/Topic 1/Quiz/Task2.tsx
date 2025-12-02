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
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default function UseEffectTask2() {
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(5);
  const [message, setMessage] = useState<string>("");

  const theme = toggleDarkMode ? darkTheme : lightTheme;

  

  useEffect(() => {
    
    if (seconds <= 0) {
      setLoading(false);
      setMessage("wag ka sumuko please❤️");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
    }, [seconds])

    return (
      <View style = {[styles.container, {backgroundColor: theme.background}]}>
        {loading ? (
          <View style = {[styles.loadingContainer, {backgroundColor: theme.background}]}>
            <ActivityIndicator size={'large'} color={'blue'}/>
            <Text style = {[styles.textLoading]}> Loading... {seconds}s</Text>
            </View>
        ): (
          <View style = {[styles.textContainer, {backgroundColor: theme.background}]}>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {message} </Text>
            </View>
        )}
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  loadingContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },

  textLoading: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  textContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },

  textOutput: {
     marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  }
})


 