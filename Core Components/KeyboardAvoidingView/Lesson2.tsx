import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet, ScrollView, TextInput, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F5F5F5",
 
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

export default function KeyboardAvoidingViewLesson2() {
  const [darkMode, setDarkmode] = useState<boolean>(false);

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <KeyboardAvoidingView
      behavior='height'
      style = {[styles.container, {backgroundColor: theme.background}]}>

        <ScrollView
        style = {{flex: 1}}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ padding: 20 }} >

          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Login </Text>

          <TextInput placeholder='type your name' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your age' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your religion' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your section' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your birthyear' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your gender' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your address' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your Zip Code' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your Phone' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your Password' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>
          <TextInput placeholder='type your Email' placeholderTextColor={theme.textPrimary} style = {[styles.input]}/>

          <Pressable
          onPress={() => alert("Pressed")}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: theme.ripple }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: theme.accent}]}>
            <Text style={[styles.textButton, { color: theme.textPrimary }]}>
               Login
            </Text>
          </Pressable>

          
          




































        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },

  textTitle: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',


  },

  input: {
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    justifyContent: 'center'
    


  },

 
  



  button: {
    width: '85%',
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: "#36fa0aff",
    elevation: 1,
    borderRadius: 5,
    alignSelf: 'center'

  },

  textButton: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    

  }
})
