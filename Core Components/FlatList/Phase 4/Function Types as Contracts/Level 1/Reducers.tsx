import React, {act, useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet, FlatList, Alert, ListRenderItem} from 'react-native';
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

type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  isActive: boolean;
  image?: any
};

const ORIGINALSTUDENTS : Student[] = ([
  {
    id: 1,
    name: "Kurt Allen A. Marquez",
    age: 21,
    section: "BSIT-41",
    isActive: true,
    image: require(".././../../../Images/Kurt.jpg"),
  },
  {
    id: 2,
    name: "Maria Santos",
    age: 19,
    section: "BSIT-42",
    isActive: false,
    image: require(".././../../../Images/women1.jpg"),
  },
  {
    id: 3,
    name: "Carlos Reyes",
    age: 21,
    section: "BSIT-43",
    isActive: true,
    image: require(".././../../../Images/men1.jpg"),
  },
  {
    id: 4,
    name: "Anne Villanueva",
    age: 22,
    section: "BSIT-44",
    isActive: false,
    image: require(".././../../../Images/women2.jpg"),
  },
  {
    id: 5,
    name: "Mark Lopez",
    age: 18,
    section: "BSIT-45",
    isActive: true,
    image: require(".././../../../Images/men2.jpg"),
  },
  {
    id: 6,
    name: "Sophia Cruz",
    age: 20,
    section: "BSIT-41",
    isActive: false,
    image: require(".././../../../Images/woemn3.jpg"),
  },
  {
    id: 7,
    name: "Daniel Mendoza",
    age: 23,
    section: "BSIT-42",
    isActive: true,
    image: require(".././../../../Images/men3.jpg"),
  },
  {
    id: 8,
    name: "Ella Fernandez",
    age: 19,
    section: "BSIT-43",
    isActive: true,
    image: require(".././../../../Images/women4.jpg"),
  },
  {
    id: 9,
    name: "Joshua Lim",
    age: 21,
    section: "BSIT-44",
    isActive: false,
    image: require(".././../../../Images/men4.jpg"),
  },
  {
    id: 10,
    name: "Nicole Aquino",
    age: 20,
    section: "BSIT-45",
    isActive: true,
    image: require(".././../../../Images/women5.jpg"),
  },
]);


type StudentAction = 
| {type: "DELETE_STUDENT"; payload: {id: number}}
| {type: "SELECT_STUDENT"; payload: {id: number}}
| {type: "TOGGLE_STUDENT"; payload: {id: number}}

type AddStudentFn = () => void;

type StudentItemProps = {
  student: Student;
  isSelected: boolean;
  onAction: (action: StudentAction) => void;
  theme: Theme
  index?: number
};

const StudentItem = ({student, isSelected, onAction, theme, index}: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => {
        onAction({
          type: "SELECT_STUDENT",
          payload: {id: student.id}
        })
      }}
      onLongPress={() => alert(`Long pressed: ${student.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitleCard, {color: theme.textPrimary}]}> Student  Info </Text>
        {student.image && (
          <Image source={student.image} style = {[styles.imageOutput]}/>
        )}
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
          <Text style = {student.isActive ? styles.textActive : styles.textInactive}> {student.isActive ? "ACTIVE"  : "Inactive"} </Text>
          <Pressable
          onPress={() => {
            onAction({
              type: "TOGGLE_STUDENT",
              payload: {id: student.id}
            })
          }}
          onLongPress={() => alert(`Long pressed: ${student.name}`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonToggle, 
          pressed && {opacity: 0.1},]}>
            <Text style = {student.isActive ? styles.activeTextButton : styles.inactiveTextButton}> {student.isActive ? "INACTIVATE" : "ACTIVATE"} </Text> 
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            onAction({
              type: "DELETE_STUDENT",
              payload: {id: student.id}
            })
          }}
          onLongPress={() => alert(`Long pressed: ${student.name}`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonToggle, 
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonDelete, {color: theme.textPrimary}]}> Delete </Text> 
          </Pressable>
      </Pressable>
  )
};

export default function FunctionTypesWithReducers() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAction = (action: StudentAction) => {
    switch (action.type) {
      case "SELECT_STUDENT" : {
        setSelectedId(prev =>
        (prev === action.payload.id ? null : action.payload.id)
        )
        break;
      }
      case "DELETE_STUDENT": {
        const find = students.find(s => s.id === action.payload.id);

        if (!find) {
          alert("Student not found!");
          return
        }
        setStudents(prev => 
          prev.filter(s => s.id !== action.payload.id)
        )
        setSelectedId(prev => 
        (prev === action.payload.id ? null : action.payload.id)
        )
        alert("Success!")
        break;
      }
      case "TOGGLE_STUDENT" : {
        setStudents(prev =>
        prev.map(s =>
          s.id === action.payload.id ?
          {
            ...s,
            isActive: !s.isActive
          } : s
        )
        )
      }
    }
  };

  const selectedStudent = students.find(s => s.id === selectedId);

  const addStudent : AddStudentFn = () => {
    const newStudent : Student = {
      id: Date.now(),
      name: "Pakyu ka boi",
      age: 21,
      section: "BSIT-45",
      isActive: true,
      image: require('../../../../Images/airforce.jpg')
    }
    Alert.alert(
      "Confirmation",
      `Add ${newStudent.name}?`,
      [
        {text: "Cancel", style: "cancel"},
        {
          text: "Confirm", style: "destructive",
          onPress: () => {
            setStudents(prev => [...prev, newStudent]);
            alert(`Success!, you added ${newStudent.name}`);
          }
        }
      ]
    )
  };

  const renderItem : ListRenderItem<Student> = ({item}) => {
    return (
      <StudentItem
      student={item}
      onAction={handleAction}
      theme={theme}
      isSelected={item.id === selectedId}/>
    )
  }

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
      <Pressable
      onPress={addStudent}
      onLongPress={() => alert(`Long pressed: Hi Baby `)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.buttonAdd, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Add Student  </Text> 
      </Pressable>
      
      <View style = {{flex: 1}}> 
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}/>
      </View>

      {selectedStudent && (
        <Pressable
        onPress={() => console.log(selectedStudent.id)}
        onLongPress={() => alert(`Long pressed: ${selectedStudent.name}`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.studentCardSelected, {backgroundColor: theme.background},
        pressed && {opacity: 0.1},]}>
          <Text style = {[styles.textTitleSelected, {color: theme.textPrimary}]}> Student Selected </Text>
          {selectedStudent.image && (
            <Image source={selectedStudent.image} style = {[styles.imageSelected]}/>
          )}
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
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status: </Text>
            <Text style = {selectedStudent.isActive ? styles.textActive : styles.textInactive}> {selectedStudent.isActive ? "Active" : "Inactive"} </Text>
          </View>
        </Pressable>
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
    borderRightColor: "#F87171",
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderLeftColor: "#3B82F6", 

  },

  textTitleCard: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'

  },

  imageOutput: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center'

  },

  divider: {
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
    fontSize: 16,
    fontWeight: 'bold'

  },

  textActive: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: 'bold'

  },

  textInactive: {
    color: "#F87171",
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonToggle: {
     paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",

  },

  activeTextButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  inactiveTextButton: {
    color: "#F87171",
    fontSize: 16,
    fontWeight: 'bold'

  },

  textButtonDelete: {
      color: "#60A5FA",
    fontSize: 16,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
    

  },

  textFooter: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textEmpty: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  separator: {
    height: 20

  },

  buttonAdd: {
      paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",

  },

  textButtonAdd: {
     textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
    

  },

  studentCardSelected: {
      width: "85%",
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

  textTitleSelected: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  imageSelected: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',

  },



})






