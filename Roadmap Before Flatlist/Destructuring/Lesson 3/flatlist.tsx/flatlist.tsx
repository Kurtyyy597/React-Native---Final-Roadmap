import React, {useState} from 'react';
import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F8F9FB",        // Softer & cleaner than F5F5F5
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",       // Deeper, modern black
  textSecondary: "#6B7280",     // Soft gray
  border: "#E5E7EB",            // Modern border gray
  accent: "#3B82F6",            // Modern blue (Material 3 / iOS style)
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",   // Softest light gray
  divider: "#E5E7EB",
  cardShadow: "#00000025",      // Softer natural shadow
};
const darkTheme = {
  background: "#0D0E11",       // Deeper, more modern dark
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",      // Slightly softer white
  textSecondary: "#9CA3AF",
  border: "#2D2F33",           // Clean, subtle border
  accent: "#60A5FA",           // Softer blue; beautiful in dark mode
  accentText: "#0D0E11",       
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",  // Matches modern dark surfaces
  divider: "#2F3135",
  cardShadow: "#00000060",
};


type Student = {
  id: number;
  name: string;
  age: number;
  course: string;
};

type StudentCardProps = {
  student: Student
}


const StudentCard = ({student} : StudentCardProps) => {
  const {id, name, age, course } = student

  return (
    <View key={id} style = {[styles.studentCard]}>
      <Text style = {styles.textTitle}> Student Info </Text>
      <View style = {styles.divider}/>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Name </Text>
        <Text style = {styles.textContent}> {name} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Age </Text>
        <Text style = {styles.textContent}> {age} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Course </Text>
        <Text style = {styles.textContent}> {course} </Text>
      </View>
    </View>
  )
};

export default function DestructuringLesson3() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    course: "BS Information Technology",
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    course: "BS Computer Science",
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    course: "BS Information Systems",
  },
  {
    id: 4,
    name: "John Paul Reyes",
    age: 20,
    course: "Software Engineering",
  },
  {
    id: 5,
    name: "Michael Torres",
    age: 22,
    course: "Data Science",
  },
  {
    id: 6,
    name: "Angelica Cruz",
    age: 21,
    course: "Cybersecurity",
  },
  {
    id: 7,
    name: "Joshua Lim",
    age: 19,
    course: "Game Development",
  },
  {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    course: "Web & Mobile App Development",
  },
  {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    course: "Artificial Intelligence",
  },
  {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    course: "Computer Engineering",
  },
  ]);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface} ]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Destructuring with Flatlist </Text>

      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <StudentCard student={item}/>
      )}/>
      
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  studentCard: {
  margin: 10,
  backgroundColor: "#F3F4F6",  
  width: "90%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",


  },

  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 1,
    paddingVertical: 2 

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  }

})