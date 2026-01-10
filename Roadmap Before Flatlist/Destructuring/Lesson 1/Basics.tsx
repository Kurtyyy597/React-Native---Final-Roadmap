import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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


export default function DestructuringLesson1Basics() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "4A",
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "3B",
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "4C",
  },
  {
    id: 4,
    name: "John Paul Reyes",
    age: 20,
    section: "2A",
  },
  {
    id: 5,
    name: "Michael Torres",
    age: 22,
    section: "3A",
  },
  {
    id: 6,
    name: "Angelica Cruz",
    age: 21,
    section: "4B",
  },
  {
    id: 7,
    name: "Joshua Lim",
    age: 19,
    section: "1C",
  },
  {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    section: "3C",
  },
  {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    section: "2B",
  },
  {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    section: "4A",
  },
  ]);

 

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      <ScrollView
      contentContainerStyle={{ padding: 20 }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>
        
      

      {students.map(({id, name, age, section}, index) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.surface}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info </Text>
          <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {index + 1}. </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {name} </Text>
          </View>
          <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {age} </Text>
          </View>
          <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {section} </Text>
          </View>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },

  card: {

  },

  textTitle: {

  },

  infoRow: {

  },

  textLabel: {

  },

  textContent: {

  }
})