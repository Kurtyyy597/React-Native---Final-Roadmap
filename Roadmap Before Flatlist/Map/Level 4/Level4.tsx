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

type Person = {
  name: string;
  age: number;
  religion: string;
};

export default function MappingArraysofObjects() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [users, setUsers] = useState<Person[]>([
    {name: "Kurt Marquez", age: 21, religion: "Catholic"},
    {name: "Kathlyn Cruz", age: 21, religion: "Catholic"},
    {name: "Nathaniel Abril", age: 27, religion: "Catholic"}
  ]);

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

        <View style = {[styles.card, {backgroundColor: theme.success}]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Mapping in Arrays of Objects </Text>
          {users.map((user, index) => (
            <View key={index} 
            style = {[styles.userCard, {backgroundColor: theme.background}]}>
              <View style = {[styles.textContainer]}/>
              <Text style = {[styles.textTitleOutput, {color: theme.textPrimary}]}> User </Text>
              <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> {index + 1}. Name: {user.name} </Text>
              <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Age: {user.age} </Text>
              <Text style = {[styles.textSectionOutput, {color: theme.textPrimary}]}> Religion: {user.religion} </Text>
              </View> 
          ))}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    
  
  },

  card: {
    
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 30,
    margin: 30,
    padding: 20,
    borderRadius: 20,
  
    

    
  },

  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"

  },

  userCard: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    
    
    
  



  },

  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  textTitleOutput: {
    paddingHorizontal: 30,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textSectionOutput: {
    fontSize: 20,
    textAlign: 'justify',
    fontStyle: 'italic'

  }
})