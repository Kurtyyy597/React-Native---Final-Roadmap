import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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

// 🌙 Dark Mode Colors
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

interface User {
  name: string;
  age: number;
  city: string;
  religion: string;

};



export default function ObjectsAdding() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const user : User = {
    name: "Kurt Marquez",
    age: 21,
    city: "Manila",
    religion: "Catholic"
  };

  const isAdmin = (user as any).isAdmin;

  const updatedUser = {
    ...user,
    hobby: "Coding"
  };
  
  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <View style = {[styles.card, {backgroundColor: theme.warning}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> ADDING OBJECTS </Text>
      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Direct Adding: </Text>
      <View style = {[styles.divider, {backgroundColor: theme.error}]}/>
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Admin true? {isAdmin ? "TRUE" : "FALSE"} </Text>

      <Text style = {[styles.textSection, {color: theme.textPrimary}]}> React Safe add spread: </Text>
      
     <View style={[styles.divider, { backgroundColor: theme.divider }]} />
      
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Name: {updatedUser.name} </Text>
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Age: {updatedUser.age} </Text>
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> City: {updatedUser.city} </Text>
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Religion: {updatedUser.religion} </Text>
      <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Added hobby: {updatedUser.hobby} </Text>
      </View>

    </SafeAreaView>
  )

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    padding: 20,
    paddingHorizontal: 30,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    width: '90%'

  },

  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  divider: {
    height: 2,
    
    width: '100%',
    marginVertical: 12,
    


  },

  textSection: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textSectionOutput: {
    bottom: 10,
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic'

  }


})
