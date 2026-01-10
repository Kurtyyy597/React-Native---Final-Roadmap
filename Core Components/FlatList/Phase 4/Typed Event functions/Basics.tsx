import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet, ListRenderItem} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme : Theme = {
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
const darkTheme : Theme = {
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

type Theme = {
  background: string        // Softer & cleaner than F5F5F5
  surface: string           
  textPrimary: string      // Deeper, modern black
  textSecondary: string    // Soft gray
  border: string          // Modern border gray
  accent: string           // Modern blue (Material 3 / iOS style)
  accentText: string
  ripple: string
  success: string
  warning: string
  error: string
  inputBackground: string   // Softest light gray
  divider: string
  cardShadow: string
};

type SelectStudentFn = (id: number) => void

type ToggleStudentFn = (id: number) => void

type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  isActive: boolean;
};

type StudentItemProps = {
  student: Student;
  onSelect: SelectStudentFn;
  ontoggle: ToggleStudentFn;
  isSelected: boolean;
  theme: Theme
};

const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "BSIT-41", isActive: true },
  { id: 2, name: "Maria Santos", age: 19, section: "BSIT-41", isActive: false },
  { id: 3, name: "Carlos Reyes", age: 21, section: "BSIT-42", isActive: true },
  { id: 4, name: "Anne Villanueva", age: 22, section: "BSIT-42", isActive: false },
  { id: 5, name: "Mark Lopez", age: 18, section: "BSIT-41", isActive: true },
  { id: 6, name: "Sophia Cruz", age: 20, section: "BSIT-43", isActive: false },
  { id: 7, name: "Daniel Mendoza", age: 23, section: "BSIT-43", isActive: true },
  { id: 8, name: "Ella Fernandez", age: 19, section: "BSIT-42", isActive: true },
  { id: 9, name: "Joshua Lim", age: 21, section: "BSIT-41", isActive: false },
  { id: 10, name: "Nicole Aquino", age: 20, section: "BSIT-43", isActive: true },
]);

const StudentItem = ({student, onSelect, isSelected, theme, ontoggle}: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => onSelect(student.id)}
      onLongPress={() => alert(`Long pressed: ${student.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
          <Text style = {[styles.textTitleCard, {color: theme.textPrimary}]}> Student Info </Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          
          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.name} </Text>
          </View>

          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.age} </Text>
          </View>

          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.section} </Text>
          </View>

          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {student.isActive ? styles.activeText : styles.inactiveText}> {student.isActive ? "Active" : "Inactive"} </Text>
            <Pressable
            onPress={() => ontoggle(student.id)}
            onLongPress={() => alert(`Long pressed: ${student.name}`)}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            styles.buttonToggle, {backgroundColor: theme.inputBackground},
            pressed && {opacity: 0.1},]}>
              <Text style = {[styles.textButtonToggle, {color: theme.textPrimary}]}> Change Status </Text> 
            </Pressable>
          </View>
      </Pressable>
  );
};

export default function TypedEventFunctions() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);



  const selectStudent = (id: number): void => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  };

  const selectedStudent = students.find(s => s.id === selectedId)
  

  const toggleIsActive = (id: number): void => {
    setStudents(prev =>
      prev.map(s => s.id === id ?
        {
          ...s,
          isActive: !s.isActive
        } : s 
      )
    )
  };

  const renderStudent : ListRenderItem<Student> = ({item}) => {
    return (
      <StudentItem
      student={item}
      onSelect={selectStudent}
      ontoggle={toggleIsActive}
      isSelected={item.id === selectedId}
      theme={theme}/>
    )
  };

  const header = () => (
    <>
      <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists </Text>
    </>
    );
    
  const footer = () => {
    return (
    <>
    <Text style = {[styles.textFooter, {color: theme.textPrimary}]}> Student Reached its maximum length </Text>
    </>
    )
  };
    
  const empty = () => {
    if (students.length === 0) {
    return (
      <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students yet </Text>
      )
    }
  };
    
  const separator = () => <View style = {[styles.separator]}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <View style = {{flex: 1}}> 
      <FlatList
      data={students}
      renderItem={renderStudent}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}/>
      </View>

      {selectedStudent && (
        <View style = {[styles.selectedStudentContainer, {backgroundColor: theme.background}]}>
          <Pressable
          onPress={() => `You tap ${selectedStudent.name}`}
          onLongPress={() => alert(`Long pressed: ${selectedStudent.name}`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.studentCardSelected, {backgroundColor: theme.background},
          pressed && {opacity: 0.1}]}>
            
            <Text style = {[styles.textTitleSelectedCard, {color: theme.accent}]}> Selected Student ✔️ </Text>
            <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

            <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
              <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
              <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.name} </Text>
            </View>

            <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
              <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
              <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.age} </Text>
            </View>

            <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
              <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
              <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.section} </Text>
            </View>

            <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
              <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status:  </Text>
              <Text style = {selectedStudent.isActive ? styles.activeText : styles.inactiveText}> {selectedStudent.isActive ? "Active" : "Inactive"} </Text>
            </View>  
        </Pressable>
        </View>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1

  },

  studentCard: {
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

  selectedCard: {
    borderRightWidth: 10,
    borderRightColor: "#EF4444",
    borderLeftColor: "#3B82F6", 
    borderLeftWidth: 10,

  },

  textTitleCard: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  divider: {
    paddingVertical: 2

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  activeText: {
    color: "#4ADE80",
    fontSize: 15,
    fontWeight: 'bold'

  },

  inactiveText: {
    color: "#EF4444",
    fontSize: 15

  },

  buttonToggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",

  },

  textButtonToggle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textFooter: {
    textAlign: 'center',
    fontSize: 16

  },

  textEmpty: {
    color:  "#EF4444",
    fontSize: 14,
    textAlign: 'center' 

  },

  separator: {
    height: 20

  },

  selectedStudentContainer: {
    

  },

  studentCardSelected: {
    width: "90%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",

  },

  textTitleSelectedCard: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  }



 




})

