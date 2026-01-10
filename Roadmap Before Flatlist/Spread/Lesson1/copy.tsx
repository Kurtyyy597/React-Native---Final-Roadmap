import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

type Students = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: string;
};

export default function SpreadCopy() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Students[]>([
    {id: 1, name: "Kurt Allen", age: 21, section: "BSIT-41", course: "Bachelor in Science Information Technology"},
    {id: 2, name: "Zydane Battad", age: 24, section: "BSIT-43", course: "Bachelor in Science Information Technology"},
  ]);

  const copy = [...students];

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      {students.map(({id, name, age, section, course}) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Original: </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Name: {name} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Age: {age} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Section: {section} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Course: {course} </Text>
        </View>
      ))}

      <Text style = {[styles.textCopy, {color: theme.textPrimary}]}> Copy: </Text>
      {copy.map(({id, name, age, section, course}) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Copy: </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Name: {name} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Age: {age} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Section: {section} </Text>
          <Text style = {[styles.textOrig, {color: theme.textPrimary}]}> Course: {course} </Text>
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

  },

  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'heavy'

  },

  textOrig: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic'
    
  },

  textCopy: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic'

  }
})