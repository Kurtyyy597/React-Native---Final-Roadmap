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

export default function ObjectsLesson4Quiz1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme: lightTheme;

  const user : Person = {
    name: "Kurt Marquez",
    age: 21,
    city: "Manila"
  };

  const keepUser = {...user}

  const personwithHobby = {
    ...user,
    hobby: "Coding"
  };

  (personwithHobby as any).isStudent = true;
  const isStudent = (personwithHobby as any).isStudent;

  const {city, ...personWithoutCity} = personwithHobby;
  
  const personUpdated = personWithoutCity;

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      


      <View style = {[styles.card, {backgroundColor: theme.warning}]}>
        
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> ADDING AND REMOVING QUIZ </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textOriginalUserTitle, {color: theme.success}]}> Original User: </Text>
        <Text style = {[styles.textOriginalUserSection, {color: theme.textPrimary}]}> Name: {keepUser.name} </Text>
        <Text style = {[styles.textOriginalUserSection, {color: theme.textPrimary}]}> Age: {keepUser.age} </Text>
        <Text style = {[styles.textOriginalUserSection, {color: theme.textPrimary}]}> City: {keepUser.city} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textOriginalUserwithHobby, {color: theme.ripple}]}> User with Hobby: </Text>
        <Text style = {[styles.textOriginalUserWithHobbySection, {color: theme.textPrimary}]}> Name: {personwithHobby.name} </Text>
        <Text style = {[styles.textOriginalUserWithHobbySection, {color: theme.textPrimary}]}> Age: {personwithHobby.age} </Text>
        <Text style = {[styles.textOriginalUserWithHobbySection, {color: theme.textPrimary}]}> City: {personwithHobby.city} </Text>
        <Text style = {[styles.textOriginalUserWithHobbySection, {color: theme.textPrimary}]}> Hobby: {personwithHobby.hobby} </Text>
        <Text style = {[styles.textOriginalUserWithHobbySection, {color: theme.textPrimary}]}> Is Student True: {isStudent? "True" : "False"} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textUserTitleWithoutCity, {color: theme.error}]}> Person without City: </Text>
        <Text style = {[styles.textUserWithoutCitySection, {color: theme.textPrimary}]}> Name: {personUpdated.name} </Text>
        <Text style = {[styles.textUserWithoutCitySection, {color: theme.textPrimary}]}> Age: {personUpdated.age} </Text>
        <Text style = {[styles.textUserWithoutCitySection, {color: theme.textPrimary}]}> Hobby: {personUpdated.hobby} </Text>
      

        
        

      </View>

    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    
  },

  card: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
    borderRadius: 20,
    padding: 20,
    
    
  },

  textTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  divider: {
    height: 3,
    marginVertical: 10,
    width: '100%'
  },

  textOriginalUserTitle: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20
  },

  textOriginalUserSection: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },

  textOriginalUserwithHobby: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20

  },

  textOriginalUserWithHobbySection: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'

  },

  textUserTitleWithoutCity: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20

  },

  textUserWithoutCitySection: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'

  }
})