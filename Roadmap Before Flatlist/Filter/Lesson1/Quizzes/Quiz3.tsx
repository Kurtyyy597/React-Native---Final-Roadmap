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
};

export default function FilterQuiz3() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudents : Student[] = ([
    { id: 1, name: "Kurt Allen", age: 21 },
    { id: 2, name: "Nathaniel Abril", age: 15 },
    { id: 3, name: "Zydane Battad", age: 18 },
    { id: 4, name: "Kyle Cruz", age: 29 },
    { id: 5, name: "Anna Marie", age: 23 },
  ]);

  const [students, setStudents] = useState<Student[]>(originalStudents);

  const filterAgeandName = () => {
    const filtered = originalStudents.filter(s =>
      s.age >= 18 && s.name.toLowerCase().includes("a")
    );
    setStudents(filtered)
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      <View style = {[styles.card, {backgroundColor: theme.success}]}>
        {students.map(({id, name, age}) => (
          <View key={id} style = {[styles.outputContainer, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {name} - {age} </Text>
          </View>
        ))}

          <Pressable
          onPress={filterAgeandName}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.button,
          pressed && {opacity: 0.1 }]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Filter </Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
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

  outputContainer: {
    gap: 15,
  },

  textOutput: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#22C55E",
    borderRadius: 20,
    alignSelf: 'center'
  },

  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }
})