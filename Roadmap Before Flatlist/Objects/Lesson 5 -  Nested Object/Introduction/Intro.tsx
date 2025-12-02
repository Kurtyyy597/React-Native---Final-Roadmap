import React, {useState} from 'react'
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

interface Address {
  city: string;
  zipcode: number;
};

interface Person {
  name: string;
  age: number;
  religion: string;
  address: Address
};

export default function ObjectsNestedLesson5() {
  const [darkMode, setDarkMode] =  useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const user : Person = {
    name: "Kurt Marquez",
    age: 21,
    religion: "Catholic",
    address: {
      city: "Manila",
      zipcode: 1410
    }
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.warning}]}> 
      <Text style = {[styles.title, {color: theme.textPrimary}]}> Nested Objects Introduction</Text>
      <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
      <Text style = {[styles.textTitleNestedObjects, {color: theme.textPrimary}]}> Nested Objects: </Text>
      <Text style = {[styles.textNestedSection, {color: theme.textPrimary}]}> Name: {user.name} </Text>
      <Text style = {[styles.textNestedSection, {color: theme.textPrimary}]}> Age: {user.age} </Text>
      <Text style = {[styles.textNestedSection, {color: theme.textPrimary}]}> Religion: {user.religion} </Text>
      <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
      
      <Text style = {[styles.textNestedTitle, {color: theme.success}]}> Address: </Text>
      

      <Text style = {[styles.textNestedSection, {color: theme.textPrimary}]}> City: {user.address.city} </Text>
      <Text style = {[styles.textNestedSection, {color: theme.textPrimary}]}> Zip Code: {user.address.zipcode} </Text>
      </View>
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

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

  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  textNestedTitle: {
    textAlign: 'center',
    fontSize: 22,

  },

  divider: {
    height: 2,
    width: 'auto',
    marginVertical: 20,

  },

  textTitleNestedObjects: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '900'

  },

  textNestedSection: {
    textAlign: 'center',

  }
})

