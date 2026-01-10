import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F8F9FB",        // Softer & cleaner than F5F5F5
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",       // Deeper, modern black
  textSecondary: "#6B7280",     // Soft gray
  border: "#E5E7EB",            // Modern border gray
  accent: "#3B82F6",            // Modern blue (Material 3 / iOS style)
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",   // Softest light gray
  divider: "#E5E7EB",
  cardShadow: "#00000025",      // Softer natural shadow
};
const darkTheme = {
  background: "#0D0E11",       // Deeper, more modern dark
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",      // Slightly softer white
  textSecondary: "#9CA3AF",
  border: "#2D2F33",           // Clean, subtle border
  accent: "#60A5FA",           // Softer blue; beautiful in dark mode
  accentText: "#0D0E11",       
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",  // Matches modern dark surfaces
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type Student = {
  id: number;
  name: string;
};

export default function FindLesson1Task1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudents : Student[] = ([
    { id: 1, name: "Kurt" },
    { id: 2, name: "Allen" },
    { id: 3, name: "Marquez" },
  ]);

  const findStudent = originalStudents.find(s => s.id === 2);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      {findStudent ? (
        <Text style = {[styles.textSuccess, {color: theme.success}]}> {findStudent.name} </Text>
      ) : (
        <Text style = {[styles.textError, {color: theme.textPrimary}]}> Student not found </Text>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  textSuccess: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  textError: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})