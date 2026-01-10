import React, {DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES, useState} from 'react';
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
  age: number;
};

export default function FindLesson1Task2() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudent : Student[] = ([
    {id: 1, name: "Kurt Allen A. Marquez", age: 21},
    {id: 2, name: "Nathaniel Abril", age: 23},
    {id: 3, name: "Zydane Battad", age: 29},
  ]);

  const [students, setStudents] = useState<Student[]>(originalStudent);

  const foundStudent = (id: number): Student | null => {
    const find = originalStudent.find(s => s.id === id);
    return find ?? null
  };
  const result = foundStudent(2);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      {result ? (
        <Text style = {[styles.success, {color: theme.textPrimary}]}> {result.name} - {result.age} </Text>
      ) : (
        <Text style = {[styles.error, {color: theme.error}]}> Not Found </Text>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  success: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  error: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})