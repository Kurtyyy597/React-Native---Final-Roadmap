import { DarkTheme } from '@react-navigation/native';
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

interface Contact {
  email: string;
  phone: number;
};

interface Person {
  name: string;
  age: number;
  religion: string;
  section: string;
  address: Address;
  contact: Contact
};

export default function NestedAddingObjectQuiz1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const student : Person = {
    name: "Kurt Allen A. Marquez",
    age: 21,
    religion: "Catholic",
    section: "BSIT-41",
    address: {
      zipcode: 1410,
      city: "Caloocan"
    },
    contact: {
      email: "Kurtmarquez238@gmail.com",
      phone: 639694828850
    }
  };

  const updatedStudent : Person = {
    ...student,
    address: {
      ...student.address,
      city: "Manila",
      zipcode: 2000,
    },
    contact: {
      ...student.contact,
      email: "KurtAllen@gmail.com"
    },
    religion: "INC"
  }

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
    <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Nested Objects Adding and updating  </Text>

    <View style = {[styles.card, {backgroundColor: theme.accent}]}>
      <Text style = {[styles.textOldStudentTitle, {color: theme.textPrimary}]}> Old Student Information </Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Name: {student.name} </Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Age: {student.age}</Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Religion: {student.religion}</Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Section: {student.section} </Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> City: {student.address.city}</Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Zipcode: {student.address.zipcode} </Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Email : {student.contact.email} </Text>
      <Text style = {[styles.textOldStudentSection, {color: theme.textPrimary}]}> Phone Number: {student.contact.phone} </Text>
    </View>

     <View style = {[styles.card, {backgroundColor: theme.warning}]}>
      <Text style = {[styles.textNewStudentTitle, {color: theme.textPrimary}]}> New Student Information </Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Name: {updatedStudent.name} </Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Age: {updatedStudent.age}</Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Religion: {updatedStudent.religion}</Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Section: {updatedStudent.section} </Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> City: {updatedStudent.address.city}</Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Zipcode: {updatedStudent.address.zipcode} </Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Email : {updatedStudent.contact.email} </Text>
      <Text style = {[styles.textNewStudentSection, {color: theme.textPrimary}]}> Phone Number: {updatedStudent.contact.phone} </Text>
    </View>
    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    margin: 10,
    padding: 10,
    justifyContent: 'center'

  },

  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    rowGap: 5,
    paddingVertical: 20,
    
    

  },

  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textOldStudentTitle: {
    includeFontPadding: false, 
    fontSize: 24,
    fontWeight: "800",
    textAlign: 'center'

  },

  textOldStudentSection: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center'

  },

  textNewStudentTitle: {
    includeFontPadding: false, 
    fontSize: 24,
    fontWeight: "800",
    textAlign: 'center'

  },

  textNewStudentSection: {
     fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center'


  },
})

