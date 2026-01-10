import React, {useState} from 'react';
import {View, Text, Image, Switch, Pressable, ScrollView, StyleSheet} from 'react-native';
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

type Student = {
  id: number;
  name: string;
  age: number;
  course: string;
  religion: string;
  active: boolean;
  image?: any;
};

export default function MapQuiz7() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Kurt Marquez", age: 21, course: "BSIT-41", religion: "Catholic", active: true, image: require('../../../Images/Kurt.jpg') },
    { id: 2, name: "John Dela Cruz", age: 22, course: "BSIT-41", religion: "Christian", active: false },
    { id: 3, name: "Mark Santos", age: 20, course: "BSCS-21", religion: "Catholic", active: true },
    { id: 4, name: "Alexis Rivera", age: 19, course: "BSIT-11", religion: "Born Again", active: true },
    { id: 5, name: "Jerome Fernandez", age: 23, course: "BSIS-31", religion: "Christian", active: false },
    { id: 6, name: "Gabriel Aquino", age: 18, course: "BSCS-12", religion: "Catholic", active: true },
    { id: 7, name: "James Bautista", age: 24, course: "BSIT-42", religion: "Iglesia", active: false },
    { id: 8, name: "Calvin Rey", age: 20, course: "BSIT-32", religion: "Catholic", active: false },
    { id: 9, name: "Renz Villanueva", age: 22, course: "BSCS-41", religion: "Christian", active: true },
    { id: 10, name: "Joshua Ramos", age: 19, course: "BSIT-21", religion: "Born Again", active: true }
  ]);

 

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
      contentContainerStyle={{ padding: 20,  }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>

      

      {students.map(({id, name, age, course, religion, active, image}) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.cardShadow}]}>
          {image && <Image source={image} style = {[styles.imageOutput]}/>}
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {name} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {age} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Course: {course} </Text>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Religion: {religion} </Text>

          <View style = {[styles.switchContainer]}>
            <Text style = {[styles.textOutput, {color: active ? theme.textPrimary : theme.error}]}> Active: {active ? "Active" : "Not Active"} </Text>
            <Switch value={active} 
            onValueChange={() => {
              setStudents(prev => prev.map((student => student.id === id ? {...student, active: !student.active} : student)))
            }}
            trackColor={{true: theme.ripple, false: theme.error}}
            thumbColor={active ? theme.ripple : theme.error}/>
          </View>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },

  card: {
    width: "85%",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    gap: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    alignSelf: "center",
    marginTop: 10

  },

  textOutput: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  switchContainer: {
    flexDirection: 'row',
    gap: 5
  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: 'center'
  }
})