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
  age: number;
  section: string;
};

export default function FindLesson1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudents : Student[] = ([
    {id: 1, name: "Kurt Marquez", age: 21, section: "BSIT-41"},
    {id: 2, name: "Nathaniel Abril", age: 23, section: "BSIT-43"},
    {id: 3, name: "Zydane Battad", age: 27, section: "BSIT-43"},
  ]);

  const [students, setStudents] = useState<Student[]>(originalStudents);

  const student = originalStudents.find(s => s.id === 2);

  const findAge = originalStudents.find(s => s.age > 18 )

  const findSection = originalStudents.find(s => s.section.trim().toLowerCase().includes("bsit-41"))

  const findNameandAge = originalStudents.find(s => s.name.trim().toLowerCase().includes("a") && s.age === 21);


  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      <View style = {[styles.card, {backgroundColor: theme.accent}]}>
        {student ? (
          <Text style = {[styles.textSuccess, {color: theme.textPrimary}]}> {student.name} - {student.age} </Text>
        ) : (
          <Text style = {[styles.textError, {color: theme.error}]}> Not Found </Text>
        )}

        {findAge ? (
          <Text style = {[styles.textSuccess, {color: theme.textPrimary}]}> {findAge.name} - {findAge.age} </Text>
        ) : (
          <Text style = {[styles.textError, {color: theme.error}]}> Not Found </Text>
        )}

        {findSection ? (
          <Text style = {[styles.textSuccess, {color: theme.textPrimary}]}> {findSection.name} - {findSection.age} </Text>
        ) : (
          <Text style = {[styles.textError, {color: theme.error}]}> Not Found </Text>
        )}

        {findNameandAge ? (
          <Text style = {[styles.textSuccess, {color: theme.textPrimary}]}> {findNameandAge.name} - {findNameandAge.age} - {findNameandAge.section} </Text>
        ) : (
          <Text style = {[styles.textError, {color: theme.error}]}> Not Found </Text>
        )}

        
      </View>
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
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",
  },

  textSuccess: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },

  textError: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }


})