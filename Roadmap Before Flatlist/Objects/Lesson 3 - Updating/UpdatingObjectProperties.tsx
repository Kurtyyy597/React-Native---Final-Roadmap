import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

interface Person {
  name: string;
  age: number;
  city: string;
};

export default function ObjectsLesson3() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const person : Person = {
    name: "Kurt Marquez",
    age: 21,
    city: "Manila"
  };

  person.age = 23

  const updatedPerson : Person = {
    ...person,
    city: "City of Caloocan"
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

     

      <View style = {[styles.card, {backgroundColor: theme.error}]}>
        <Text style = {[styles.title, {color: theme.textPrimary}]}> Updating Object Properties </Text>
         <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <Text style = {[styles.textDirectMutationTitle, {color: theme.textPrimary}]}> Direct Mutation </Text>
        <Text style = {[styles.textMutationOutput, {color: theme.textPrimary}]}> Age: {person.age} </Text>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />

        <Text style = {[styles.textTitleSpreadUpdate, {color: theme.textPrimary}]}> Spread Operator Update </Text>
        <Text style = {[styles.textSpreadOutput, {color: theme.textPrimary}]}> New city: {updatedPerson.city} </Text>
        <Text style = {[styles.textSpreadOutput, {color: theme.textPrimary}]}> Old Name: {updatedPerson.name} </Text>
        <Text style = {[styles.textSpreadOutput, {color: theme.textPrimary}]}> Old Age: {updatedPerson.age} </Text>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    

  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  card: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    borderRadius: 20


  },

  textDirectMutationTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  divider: {
    paddingVertical: 1,
    width: '100%',
    marginVertical: 12,
    
    
  },

  
    


  

  textMutationOutput: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',

  },

  textTitleSpreadUpdate: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textSpreadOutput: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',

  },
})