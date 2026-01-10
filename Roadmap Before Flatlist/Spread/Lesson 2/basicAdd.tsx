import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Alert, ScrollView} from 'react-native';
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
  course: string;
};

export default function SpreadBasicAdd() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {id: 1, name: "Kurt Marquez", age: 21, section: "BSIT-41", course: "Bachelor in Science Information Technology"},
    {id: 2, name: "Nathaniel Abril", age: 21, section: "BSIT-41", course: "Bachelor in Science Information Technology"},
  ]);

  const addStudent = () => {
    const newStudent = {
      id: Date.now(),
      name: "Kathlyn Cruz",
      age: 24,
      section: "BSIT-41",
      course: "Bachelor in Science Information Technology"
    };
    const updated = [...students, newStudent,];
    setStudents(updated);
    console.log(`You Added Student`)
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.inputBackground}]}>
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

        
      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        {students.map(({id, name, age, section, course}) => (
          <View key={id} style = {[styles.studentsContainer, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {name} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {age} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Section: {section} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Course: {course} </Text>
              <Pressable
              onPress={addStudent}
              onLongPress={() => alert("Long pressed")}
              delayLongPress={400}
              android_ripple={{ color: "#4818e5ff" }}
              hitSlop={10}
              accessibilityRole="button"
              style={({ pressed }) => [
              styles.button,
              pressed && {opacity: 0.1 }]}>
                <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Add Student </Text>
              </Pressable>
        </View>
        ))}
      </View>
      </ScrollView>
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

  studentsContainer: {
    justifyContent: 'center',
    gap: 5

  },

  textOutput: {
    fontSize: 14,
    textAlign: 'auto',
    fontWeight: 'bold'

  },

  button: {
    alignSelf: 'center',
    width: '60%',
    backgroundColor: "#3B82F6", 
    borderRadius: 20,
    paddingVertical: 10

  },

  textButton: {
    fontWeight: 'semibold',
    textAlign: 'center',
    fontSize: 20

  }
})