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

export default function AsyncWithActivityIndicator() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await new Promise (resolve => setTimeout(resolve, 2000));

      setMessage(`Data loaded`);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <View style = {[styles.container, {backgroundColor: theme.background}]}>
      {loading ? (
        <>
        <ActivityIndicator size={'large'} color={'blue'}/>
        <Text style = {[styles.textLoading]}> Loading... </Text>
        </>
      ) : (
        <Text style = {[styles.textOutput]}> {message} </Text>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'

  },

  textLoading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20

  },

  textOutput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20

  },
})