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

interface Address {
  zipcode: number;
  city: string;
};

interface Person {
  name: string;
  age: number;
  religion: string;
  address: Address 
};

export default function NestedObjectsUpdate() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const user : Person = {
    name: "Kurt Allen Marquez",
    age: 21,
    religion: "Catholic",
    address: {
      zipcode: 2019,
      city: "Manila"
    }
  };

  const updatedReligion : Person = {
    ...user,
    religion: "Caloocan City",
    age: 32,
    address: {
      ...user.address,
      zipcode: 1410
    }
    
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.textTitle, {color: theme.accentText}]}> Updating Nested Objects </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textPersonTitle, {color: theme.textPrimary}]}> Kurt Information: </Text>
        <Text style = {[styles.textPersonSection, {color: theme.textPrimary}]}> Name: {updatedReligion.name} </Text>
        <Text style = {[styles.textPersonSection, {color: theme.textPrimary}]}> Age: {updatedReligion.age} </Text>
        <Text style = {[styles.textPersonSection, {color: theme.textPrimary}]}> Religion: {updatedReligion.religion} </Text>
        <Text style = {[styles.textPersonSection, {color: theme.textPrimary}]}> Zipcode: {updatedReligion.address.zipcode} </Text>
        <Text style = {[styles.textPersonSection, {color: theme.textPrimary}]}> City: {updatedReligion.address.city} </Text>
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
    fontWeight: 'bold',
    textAlign: 'center'

  },

  divider: {
    height: 2,
    marginVertical: 10,
    width: 'auto'

  },

  textPersonTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center'

  },

  textPersonSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'

  },
})