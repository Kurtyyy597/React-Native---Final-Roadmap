import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
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
  nickname?: string
  status?: string;
};

export default function UpdatingField() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
  { id: 1, name: "Kurt Marquez", age: 21, section: "BSIT-41", course: "Bachelor of Science in Information Technology" },
  { id: 2, name: "Zydane Battad", age: 22, section: "BSIT-43", course: "Bachelor of Science in Information Technology" },
  { id: 3, name: "Nathaniel Abril", age: 25, section: "BSIT-42", course: "Bachelor of Science in Information Technology" },
  { id: 4, name: "Rio Jay Magalona", age: 21, section: "BSIT-41", course: "Bachelor of Science in Information Technology" },
  { id: 5, name: "Mark Angelo Santos", age: 23, section: "BSIT-44", course: "Bachelor of Science in Information Technology" },
  { id: 6, name: "John Carlo Dela Cruz", age: 20, section: "BSIT-41", course: "Bachelor of Science in Information Technology" },
  { id: 7, name: "Anthony Ramirez", age: 22, section: "BSIT-42", course: "Bachelor of Science in Information Technology" },
  { id: 8, name: "Jericho Soriano", age: 24, section: "BSIT-43", course: "Bachelor of Science in Information Technology" },
  { id: 9, name: "Paolo Gutierrez", age: 21, section: "BSIT-44", course: "Bachelor of Science in Information Technology" },
  { id: 10, name: "Leo Fernandez", age: 23, section: "BSIT-41", course: "Bachelor of Science in Information Technology" }
  ]);

  const update = () => {
  const updated = students.map(student =>
    student.id === 3
      ? { ...student, name: "Iya Claire Papasin", age: 21, section: "BSIT-42", nickname: "SUPER GANDA", status: "Pasado" }
      : student
  );

  setStudents(updated);
};

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      <ScrollView
      contentContainerStyle={{ padding: 20}}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>

      <View style = {[styles.containerCard, {backgroundColor: theme.surface}]}> 
      {students.map(({id, name, age, section, course, nickname, status}) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student List </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Name: {name} </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Age: {age} </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Section: {section} </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Course: {course} </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Nickname: {nickname ? `${nickname}` : "WALA"} </Text>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Status: {status ? `${status}` : "WALA"} </Text>
          
        </View>
      ))}

      
      </View>
      <Pressable
      onPress={update}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1 }
      ]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Update Iya </Text>
      </Pressable>
      </ScrollView>
    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    
    
    

  },

 containerCard: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingBottom: 20,
  gap: 10
},

card: {
  width: "48%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  // ★ gives each card space!
  
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,

  
  



  },

  textTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textOutput: {
    fontSize: 12,
    textAlign: 'left',
    fontStyle: 'italic'

  },

  button: {
    backgroundColor: "#3B82F6", 
    borderColor: "#E5E7EB",
    width: '100%',
    paddingVertical: 5,

  },

  textButton: {
   textAlign: 'center',
   fontSize: 18,
   fontWeight: 'bold'

  },
})