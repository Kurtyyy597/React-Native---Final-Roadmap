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
  city?: string;
  zipcode: number;
  barangay: string;
};

interface Person {
  name: string;
  age: number;
  religion: string;
  section: string;
  sex: string;
  address: Address
};

export default function RemovingNestedObject() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const student : Person = {
    name: "Kurt Allen A. Marquez",
    age: 21,
    religion: "Catholic",
    section: "BSIT-41",
    sex: "Male",
    address: {
      city: "Caloocan City",
      zipcode: 1410,
      barangay: "BARANGAY 33"
    }
  };

  const {city, ...studentWithoutCity} = student.address //removingObjects

  const updatedStudent : Person = { //update
    ...student,
    address: studentWithoutCity,
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
     
      
      
      <View style = {[styles.card, {backgroundColor: theme.success}]}> 
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Removing Object </Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textStudentTitle, {color: theme.textPrimary}]}> Student Information: </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Name: {updatedStudent.name}  </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Age: {updatedStudent.age} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Religion: {updatedStudent.religion} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Section: {updatedStudent.section} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Sex: {updatedStudent.sex} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> City: {updatedStudent.address.city} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Zipcode: {updatedStudent.address.zipcode} </Text>
        <Text style = {[styles.textStudentSection, {color: theme.textPrimary}]}> Barangay: {updatedStudent.address.barangay} </Text>
      </View>
    </SafeAreaView>
  );




};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

  },

  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
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

  divider: {
    height: 2,
    width: 'auto',
    marginVertical: 20

  },

  textStudentTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textStudentSection: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic'

  }
})
