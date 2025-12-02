import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
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
}

export default function ObjectsLevel1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const person : Person = {
    name: "Kurt Marquez",
    age: 21,
    city: "Caloocan City"
  };

  const product = {
    id: 1,
    title: "Cofee",
    price: 100
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background }]}>

      <ScrollView
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center', padding: 20}}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      overScrollMode="always">

        <View style = {[styles.wrapper, {backgroundColor: theme.background}]}>
        <View style = {[styles.card, {backgroundColor: theme.success}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> OBJECTS INTRODUCTION </Text>
          
          <Text style = {[styles.objectPersonTextTitle, {color: theme.textPrimary}]}> PERSON OBJECT: </Text>
          <Text style = {[styles.objectPersonText, {color: theme.textPrimary}]}> Name: {person.name} </Text>
          <Text style = {[styles.objectPersonText, {color: theme.textPrimary}]}> Age: {person.age} </Text>
          <Text style = {[styles.objectPersonText, {color: theme.textPrimary}]}> City: {person.city} </Text>

          <Text style = {[styles.objectProductTextTitle, {color: theme.textPrimary}]}> PRODUCT OBJECT: </Text>
          <Text style = {[styles.objectProductText, {color: theme.textPrimary}]}> ID: {product.id} </Text>
          <Text style = {[styles.objectProductText, {color: theme.textPrimary}]}> TITLE: {product.title} </Text>
          <Text style = {[styles.objectProductText, {color: theme.textPrimary}]}> Price: {product.price} </Text>
        </View>

         </View>
     

      </ScrollView>

    </SafeAreaView>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  wrapper: {
    flex: 1,
    gap: 10,
    margin: 10,
    padding: 10,
    width: '100%',
    height: 100

  },

  card: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 1,

  

  },

  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    

  },

  objectPersonTextTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  objectPersonText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  

  },

  objectProductTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10

  },

  objectProductText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',


  }
})
