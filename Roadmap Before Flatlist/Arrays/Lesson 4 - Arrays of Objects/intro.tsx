import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textsecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardshadow: "#00000020",
};

// 🌙 Dark Mode Colors
const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textsecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardshadow: "#00000040",
};

type User = {
  id: number;
  name: string;
  age: number;
  religion: string;
};


export default function ArraysObjects() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const users : User[] = [
    {id: 1, name: "Kurt Marquez", age: 21, religion: "Catholic"},
    {id: 2, name: "Nathaniel Abril", age: 21, religion: "Catholic"},
    {id: 3, name: "Gerald Mariscotes", age: 24, religion: "INC"},
  ];

  const newUsers = [...users, {name: "Kyle Cruz", age: "21"}];

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      overScrollMode="always"
      nestedScrollEnabled={true}> 
        <View style = {[styles.card, {backgroundColor: theme.success}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Arrays of Objects Introduction </Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          <Text style = {[styles.textUserTitle, {color: theme.textPrimary}]}> User 1: </Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Name: {users[0].name}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Age: {users[0].age}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Religion: {users[0].religion}</Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          <Text style = {[styles.textUserTitle, {color: theme.textPrimary}]}> User 2: </Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Name: {users[1].name}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Age: {users[1].age}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Religion: {users[1].religion}</Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          <Text style = {[styles.textUserTitle, {color: theme.textPrimary}]}> User 3: </Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Name: {users[2].name}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Age: {users[2].age}</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Religion: {users[2].religion}</Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          <Text style = {[styles.textUserTitle, {color: theme.textPrimary}]}> New User: </Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Name: {newUsers[3].name}.</Text>
          <Text style = {[styles.textUserSection, {color: theme.textPrimary}]}> Age: {newUsers[3].age}.</Text>
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

  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  textUserTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '900'
  },

  textUserSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'
  },

  divider: {
    height: 2,
    width: '100%',
    marginVertical: 10
  }

  
})