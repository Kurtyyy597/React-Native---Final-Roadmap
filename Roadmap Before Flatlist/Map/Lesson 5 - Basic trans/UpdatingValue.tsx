import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
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

type Students = {
  id: number;
  name: string;
  age: number;
  address: string;
};

export default function UpdatingValue() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme

  const [students, setStudents] = useState<Students[]>([
    {id: 1, name: "Kurt Marquez", age: 21, address: "Barangay 33"},
    {id: 2, name: "Nathaniel Abril", age: 24, address: "Barangay 36"},
    {id: 3, name: "Zydane Battad", age: 22, address: "Barangay 38"},
    {id: 4, name: "Gerald Marisctoes", age: 27, address: "Barangay 39"},
  ]);

  const updateAge = students.map((stud) => ({
    ...stud,
    age: stud.age + 1
  }));

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

   
      <View style = {[styles.card, {backgroundColor: theme.surface, borderColor: theme.divider + "55" }]}>
        {updateAge.map((up, index) => (
          <View key={index} style = {[styles.outputContainer, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Information </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {up.name} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {up.age}</Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Address: {up.address} </Text>
            </View>


        ))}
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
  width: "85%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  borderWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
  alignSelf: "center",
  },

  outputContainer: {
  width: "85%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 10,
  gap: 10,
  borderWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
  alignSelf: "center",

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold'
  },

  textOutput: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'left'
  }
})