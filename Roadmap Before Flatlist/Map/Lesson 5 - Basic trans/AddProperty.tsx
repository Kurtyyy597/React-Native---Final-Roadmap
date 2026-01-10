import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};
const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};

type Students = {
  id: number;
  name: string;
  age: number;
  address: string;
};

export default function AddingPropertyUsingMap() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme

  const [students, setStudents] = useState<Students[]>([
    {id: 1, name: "Kurt Marquez", age: 21, address: "Barangay 33"},
    {id: 2, name: "Nathaniel Abril", age: 24, address: "Barangay 36"},
    {id: 3, name: "Zydane Battad", age: 22, address: "Barangay 38"},
    {id: 4, name: "Gerald Marisctoes", age: 27, address: "Barangay 39"},
  ]);

  const updated = students.map((student) => ({
    ...student,
    status: "active",
    religion: "Catholic"
  }));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
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

      
      <View style = {[styles.card, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textTitleRoot, {color: theme.accent}]}> Adding Property using Map </Text>
        {updated.map((update, index) => {
          return (
            <View key={index} style = {[styles.studentCard, {backgroundColor: theme.background}]}>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {index + 1}. Name: {update.name.toUpperCase()}</Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {update.age.toString()}</Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Address:{update.name}</Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Religion: {update.religion} </Text>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Active? {update.status.startsWith("active") ? "Active" : "Not Active"}</Text>
             
              </View>
          )
        })}
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 30,
    padding: 30,
    borderRadius: 20
  },

  textTitleRoot: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },

  studentCard: {
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 20,
    padding: 10,
    borderRadius: 20

  },

  textOutput: {
    
    fontSize: 22,
    fontWeight: 'bold'
  }
})