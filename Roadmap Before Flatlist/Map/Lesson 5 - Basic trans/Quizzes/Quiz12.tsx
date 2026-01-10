import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
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

type People = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  job: string;
};

export default function MapQuiz12() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [people, setPeople] = useState<People[]>([
  { id: 1, firstName: "Juan", lastName: "Dela Cruz", age: 21, job: "Developer" },
  { id: 2, firstName: "Maria", lastName: "Santos", age: 19, job: "Designer" },
  { id: 3, firstName: "Pedro", lastName: "Reyes", age: 24, job: "Writer" },
  { id: 5, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  { id: 6, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  { id: 7, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  { id: 8, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  { id: 9, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  { id: 10, firstName: "Anna", lastName: "Lopez", age: 22, job: "Nurse" },
  ]);

  const updated = people.map(({id, firstName, lastName, age, job}) => ({
    id,
    firstName,
    lastName,
    age,
    job,
    fullName: firstName + lastName,
    status: age >= 18 ? "Adult" : "Minor"
  }));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.accent}]}>
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

      
      <View style = {[styles.cardContainer, {backgroundColor: theme.accent}]}>
        
        {updated.map(({id, firstName, lastName, age, job, fullName, status}) => (
          <View key={id} style = {[styles.card, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> First Name: {firstName} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Last Name: {lastName} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {age} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Job: {job} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Full Name: {fullName} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Status: {status} </Text>
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
    justifyContent: 'center',
    flexDirection: 'row'
  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    gap: 10
  
    

  },

  card: {
  width: "48%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 20,
  gap: 15 ,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",
   
    
  

  },

  textOutputContainer: {
    justifyContent: 'center'

  },

  textOutput: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "left"

  }
})
