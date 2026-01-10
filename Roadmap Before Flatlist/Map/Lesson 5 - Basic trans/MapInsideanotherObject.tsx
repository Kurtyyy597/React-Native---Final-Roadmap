import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  // Backgrounds
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surface2: "#FAFAFA",
  surface3: "#F0F0F0",

  // Text Colors
  textPrimary: "#1B1B1B",
  textSecondary: "#555",
  textMuted: "#888",

  // Borders + Dividers
  border: "#D6D6D6",
  divider: "#E5E5E5",

  // Primary Accent (Main Color)
  accent: "#1976D2",
  accentLight: "#2196F3",
  accentDark: "#0D47A1",
  accentText: "#FFFFFF",

  // Status Colors
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  info: "#0288D1",

  // Inputs
  inputBackground: "#F8F8F8",
  inputBorderFocus: "#2196F3",

  // Shadows
  shadowLow: "rgba(0,0,0,0.08)",
  shadowMedium: "rgba(0,0,0,0.12)",
  shadowHigh: "rgba(0,0,0,0.18)",

  // Ripple
  ripple: "#BBDEFB",

  // Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },

  // Opacity for pressed states
  pressOpacity: 0.85,
};
const darkTheme = {
  // Backgrounds
  background: "#0F0F0F",
  surface: "#1A1A1A",
  surface2: "#222222",
  surface3: "#2E2E2E",

  // Text Colors
  textPrimary: "#EDEDED",
  textSecondary: "#A5A5A5",
  textMuted: "#777",

  // Borders + Dividers
  border: "#333",
  divider: "#3A3A3A",

  // Accent
  accent: "#90CAF9",
  accentLight: "#BBDEFB",
  accentDark: "#63A4FF",
  accentText: "#000000",

  // Status Colors
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  info: "#4FC3F7",

  // Inputs
  inputBackground: "#2A2A2A",
  inputBorderFocus: "#90CAF9",

  // Shadows (dark mode rarely uses elevation)
  shadowLow: "rgba(0,0,0,0.4)",
  shadowMedium: "rgba(0,0,0,0.55)",
  shadowHigh: "rgba(0,0,0,0.7)",

  // Ripple
  ripple: "#2B3646",

  // Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },

  // Opacity
  pressOpacity: 0.9,
};

type Student = {
  id: number;
  name: string;
  age: number;

};

export default function MapInsideObjects() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  
  const [students, setStudents] = useState<Student[]>([
    {id: 1, name: "Kurt Allen A. Marquez", age: 21},
    {id: 2, name: "Nathaniel Abril", age: 24},
    {id: 3, name: "Zydane Battad", age: 25},
    {id: 4, name: "Kyle Cruz", age: 26},
    {id: 5, name: "Gerald Mariscotes", age: 23},
    
  ]);

  const update = students.map((stud) => ({
    ...stud,
    members: stud.name
  }));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Text style = {[styles.textTitle, {color: theme.accent}]}> Map inside map </Text>
      {update.map((up) => (
        <View style = {[styles.card, {backgroundColor: theme.surface3}]}> 
        <Text  style = {[styles.textOutput, {color: theme.textPrimary}]}> {up.id}. Members: {up.members} </Text>
        <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {up.age} - {up.age > 18 ? "Adult" : "Minor"} </Text>
        </View>
      ))}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  textTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  textOutput: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  card: {
    width: "85%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",
    margin: 10
  }
  
})

