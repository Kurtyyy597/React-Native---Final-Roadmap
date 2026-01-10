import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView, Modal} from 'react-native';
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

type Students = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: "BS Information Technology (BSIT)"
  | "BS Computer Science (BSCS)"
  | "BS Information Systems (BSIS)"
  | "Software Engineering"
  | "Data Science"
  | "Cybersecurity"
  | "Game Development"
  | "Web & Mobile App Development"
  | "Artificial Intelligence"
  | "Computer Engineering";
  isActive: boolean;
};

type StudentItemProps = {
  student: Students;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
};

const Studentitem = ({student, onToggle, onDelete, onSelect} : StudentItemProps) => {
  return (
    <Pressable style = {[styles.card, student.isActive && styles.activeCard ]}
    onPress={() => onSelect(student.id)}> 
      <Text style = {[styles.textTitle]}> Click to view full info </Text>
      <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Name: </Text>
        <Text style = {[styles.textContent]}> {student.name}</Text>
      </View>

        <View style = {[styles.infoRow]}>
        <Text style = {[styles.textLabel]}> Active Status: </Text>
        <Text style = {student.isActive ? styles.textActive : styles.textInactive}> {student.isActive ? "Active" : "Inactive"}</Text>
      </View>

      <Pressable style = {[styles.buttonToggle]}
      onPress={() => onToggle(student.id)}>
        <Text style = {[styles.textToggle]}> Toggle </Text>
      </Pressable>

      <Pressable style = {[styles.buttonDelete]}
      onPress={() => onDelete(student.id)}>
        <Text style = {[styles.textDelete]}> Delete </Text>
      </Pressable>

    </Pressable>
  )
};

export default function FunctionLevel5Quiz3() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);

  const [students, setStudents] = useState<Students[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "4A",
    course: "BS Information Technology (BSIT)",
    isActive: true,
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "3B",
    course: "BS Computer Science (BSCS)",
    isActive: false,
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "4C",
    course: "BS Information Systems (BSIS)",
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
    course: "Data Science",
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
    course: "Game Development",
    isActive: true,
  },
  {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    section: "3C",
    course: "Web & Mobile App Development",
    isActive: false,
  },
  {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    section: "2B",
    course: "Artificial Intelligence",
    isActive: true,
  },
  {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    section: "4A",
    course: "Computer Engineering",
    isActive: false,
  },
  ]);

  const toggleActiveStudents = (id: number) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id?
        {
          ...s,
          isActive: !s.isActive
        } : s
      )
    )
  };

  const deleteStudent = (id: number) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      alert("Student not found!");
      return
    }
    setStudents(prev =>
      prev.filter(s =>
        s.id !== id
      )
    )
  };

  const selectStudent = (id: number) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      alert("Student not found");
      return 
    }
    setSelectedStudent(find);
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
        {students.map(s => (
          <Studentitem
          key={s.id}
          student={s}
          onDelete={deleteStudent}
          onToggle={toggleActiveStudents}
          onSelect={selectStudent}
          />
        ))}
      </ScrollView>

      <Modal visible={!!selectedStudent}
      animationType='slide'
      hardwareAccelerated={true}
      statusBarTranslucent={true}>
        <SafeAreaView style = {[styles.cardContainer]}> 
           
          {selectedStudent && (
            <View style = {[styles.modalCard, selectedStudent.isActive && styles.activeCard]}>
              <Text style = {[styles.textFinalOutputTitle, {color: theme.textPrimary}]}> Student Info </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.name} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.age} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.section} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Course: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.course} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status: </Text>
                <Text style = {[styles.textContent, {color: selectedStudent.isActive ? theme.success : theme.error}]}> {selectedStudent.isActive ? "Active" : "Inactive"} </Text>
              </View>
               <Pressable
                onPress={() => setSelectedStudent(null)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonClose,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButtonClose, {color: theme.textPrimary}]}> Close </Text>
                </Pressable>
              </View>
            )}
          
          </SafeAreaView>
          
          </Modal>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    
    
  },
  
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    alignItems: "center",
  
    
    

  },

  modalCard: {
    
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

  textFinalOutputTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  divider: {
    paddingVertical: 2,
    height: 2

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  textLabel: {
    fontSize: 12,
    fontStyle: 'italic'

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold',

  },

  buttonClose: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#F87171",

  },

  textButtonClose: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  card: {
  borderWidth: 5,
  borderColor: "#EF4444",
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

  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  buttonToggle: {
     paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",


  },

  textToggle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  buttonDelete: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#F87171",

  },

  textDelete: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textActive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#22C55E", 

  },

  activeCard: {
     
    borderWidth: 10,
    borderColor: "#22C55E", 
    
  },

  textInactive: {
    fontSize: 15,
    color: "#EF4444",

  },

  activeCardModal: {
    borderWidth: 10,
    borderColor: "#22C55E", 
  }



  
})