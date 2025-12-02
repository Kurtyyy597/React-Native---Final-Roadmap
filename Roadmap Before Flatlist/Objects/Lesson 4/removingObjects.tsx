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

interface User {
  name: string;
  age: number;
  city: string;
  religion: string;
  phone: number;
};

export default function ObjectLesson4() {

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const user : User = {
    name: "Kurt Allen A. Marquez",
    age: 21,
    city: "Caloocan City",
    religion: "Catholic",
    phone: 639694828850
  };

  const keepUser = {...user} //Keep user.

  const {city, ...userWithoutCity} = user; //Remove Property.
  

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <View style = {[styles.card, {backgroundColor: theme.border}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> REMOVING OBJECTS USING SPREAD </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textUserOriginalTitle, {color: theme.error}]}> Original User: </Text>
        <Text style = {[styles.textUserOriginalSection, {color: theme.textPrimary}]}> Name: {keepUser.name} </Text>
        <Text style = {[styles.textUserOriginalSection, {color: theme.textPrimary}]}> Age: {keepUser.age} </Text>
        <Text style = {[styles.textUserOriginalSection, {color: theme.textPrimary}]}> City: {keepUser.city} </Text>
        <Text style = {[styles.textUserOriginalSection, {color: theme.textPrimary}]}> Religion: {keepUser.religion} </Text>
        <Text style = {[styles.textUserOriginalSection, {color: theme.textPrimary}]}> Phone: {keepUser.phone} </Text>

        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        
        <Text style = {[styles.textNewOriginalTitle, {color: theme.error}]}> Original User: </Text>
        <Text style = {[styles.textNewOriginalSection, {color: theme.textPrimary}]}> Name: {userWithoutCity.name} </Text>
        <Text style = {[styles.textNewOriginalSection, {color: theme.textPrimary}]}> Age: {userWithoutCity.age} </Text>
        <Text style = {[styles.textNewOriginalSection, {color: theme.textPrimary}]}> Phone: {userWithoutCity.phone} </Text>
        <Text style = {[styles.textNewOriginalSection, {color: theme.textPrimary}]}> Religion: {userWithoutCity.religion} </Text>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    

  },

  card: {
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

  textTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  divider: {
     height: 2,
    
    width: '100%',
    marginVertical: 12,


  },

  textUserOriginalTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textUserOriginalSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'

  },

  textNewOriginalTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'


  },

  textNewOriginalSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'


  },
})


