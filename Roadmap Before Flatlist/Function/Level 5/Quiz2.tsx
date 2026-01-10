import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
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
  section: string;
  course: string;
  isActive: boolean;
};

type StudentItemProps = {
  student: Student;
  onToggle: (id: number) => void;
  
};


const StudentItem = ({student, onToggle} : StudentItemProps) => {
  return (
    <View style = {[styles.card]}>
      <Text style = {[styles.textOutputTitle]}> Student Info </Text>
      <View style = {[styles.divider]}/>
      <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Name: </Text>
        <Text style = {[styles.textContent]}> {student.name}</Text>
      </View>
       <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Age: </Text>
        <Text style = {[styles.textContent]}> {student.age}</Text>
      </View>
       <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Section: </Text>
        <Text style = {[styles.textContent]}> {student.section}</Text>
      </View>
       <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Course: </Text>
        <Text style = {[styles.textContent]}> {student.course}</Text>
      </View>
       <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel, {color: student.isActive ? "blue" : "red"}]}> Active Status: </Text>
        <Text style = {[styles.textContent]}> {student.isActive ? "ACTIVE" : "INACTIVE"}</Text>
      </View>
      <Pressable style = {[styles.buttonToggle]}
      onPress={() => onToggle(student.id)}>
        <Text style = {[styles.textButton]}> Toggle Student </Text>
      </Pressable>
      
      
    </View>
    
  )
};

export default function FunctionLevel5Quiz2() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "4A",
    course: "BS Information Technology",
    isActive: true,
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "3B",
    course: "BS Computer Science",
    isActive: false,
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "4C",
    course: "BS Information Systems",
    isActive: true,
  },
  {
    id: 4,
    name: "John Paul Reyes",
    age: 20,
    section: "2A",
    course: "Software Engineering",
    isActive: true,
  },
  {
    id: 5,
    name: "Michael Torres",
    age: 22,
    section: "3A",
    course: "Web & Mobile App Development",
    isActive: false,
  },
  {
    id: 6,
    name: "Angelica Cruz",
    age: 21,
    section: "4B",
    course: "Cybersecurity",
    isActive: true,
  },
  {
    id: 7,
    name: "Joshua Lim",
    age: 19,
    section: "1C",
    course: "BS Information Technology",
    isActive: true,
  },
  {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    section: "3C",
    course: "Data Science",
    isActive: false,
  },
  {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    section: "2B",
    course: "BS Computer Science",
    isActive: true,
  },
  {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    section: "4A",
    course: "Information Systems",
    isActive: false,
  },
  ]);

  const toggleStudentStatus = (id: number) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ?
        {
          ...s,
          isActive: !s.isActive
        } : s
      )
    )
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
      <ScrollView
      contentContainerStyle={{ padding: 20, gap: 15 }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>
        
      
      <Text style = {[styles.textTitleOutput, {color: theme.textPrimary}]}> Nababaliw na aketch beshywapsiri </Text>
      {students.map(s => (
        <StudentItem
        key={s.id}
        student={s}
        onToggle={toggleStudentStatus}/>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    
  },

  textTitleOutput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  card: {
  backgroundColor: "#F3F4F6",   
  width: "100%",
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

  textOutputTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 1,
    paddingVertical: 2 

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },

  textLabel: {
    fontSize: 12,
    fontStyle: 'italic'

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  

  buttonToggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#3B82F6", 
    alignSelf: 'center' 

  },

  textButton: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'

  }


})