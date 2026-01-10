import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const lightTheme = {
  background: "#F8F9FB",        
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",       
  textSecondary: "#6B7280",     
  border: "#E5E7EB",           
  accent: "#3B82F6",            
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",   
  divider: "#E5E7EB",
  cardShadow: "#00000025",    
};
const darkTheme = {
  background: "#0D0E11",      
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",     
  textSecondary: "#9CA3AF",
  border: "#2D2F33",          
  accent: "#60A5FA",          
  accentText: "#0D0E11",       
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",  
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type Student = {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
};

type StudentFormProps = {
  student: Student
  toggleActive: (id: number) => void;
};

const StudentCard = ({student, toggleActive, } : StudentFormProps) => {
  const {id, name, age, isActive} = student

  return (
    <View key={id} style = {[styles.studentCard]}>
      <Text style = {styles.textTitle}> Student Info </Text>
      <View style = {styles.divider}/>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Name: </Text>
        <Text style = {styles.textContent}> {name} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Age: </Text>
        <Text style = {styles.textContent}> {age} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Active Status: </Text>
        <Text style = {[styles.textContent, {color: isActive ? "blue" : "red"}]}> {isActive ? "ACTIVE" : "NOT ACTIVE"} </Text>
      </View>
      <Pressable style = {[styles.buttonCheckActive]}
      onPress={()=>toggleActive(id)}>
        <Text style = {styles.textButton}> Check Active </Text>
      </Pressable>
    </View>
  )
};

export default function SomeBasics() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;
  const [activeStudents, setActiveStudents] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    isActive: true,
    },
    {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    isActive: false,
    },
    {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    isActive: true,
    },
    {
    id: 4,
    name: "John Paul Reyes",
    age: 20,
    isActive: true,
    },
    {
    id: 5,
    name: "Michael Torres",
    age: 22,
    isActive: false,
    },
    {
    id: 6,
    name: "Angelica Cruz",
    age: 21,
    isActive: true,
    },
    {
    id: 7,
    name: "Joshua Lim",
    age: 19,
    isActive: true,
    },
    {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    isActive: false,
    },
    {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    isActive: true,
    },
    {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    isActive: false,
    },
  ]);

  const checkActiveStudent = (id: number) => {
    const checkStudent = students.find(s => s.id === id);

    if (!checkStudent) {
      alert("No student found");
      return;
    } else {
      const checkActiveStudent = students.some(s =>
        s.isActive
      );
      setActiveStudents(checkActiveStudent);
    }

  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <StudentCard
        student={item}
        toggleActive={checkActiveStudent}/>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />

      {activeStudents && (
        <Text style = {[styles.textActiveOutput, {color: theme.textPrimary}]}>
          {activeStudents ? "YES" : "NO"}
        </Text>
      )}

      
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    
    
  },

  studentCard: {
  gap: 15,
  
  backgroundColor: "#3B82F6", 
  width: "90%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 2,
    paddingVertical: 2
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  textLabel: {
    fontSize :12
  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  buttonCheckActive: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",

  },

  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textActiveOutput: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
})

