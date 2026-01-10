import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ListRenderItem, Image, Alert} from 'react-native';
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

type ControlStudent = (id: number) => void;

type Section = "BSIT-41" | "BSIT-42" | "BSIT-43" | "BSIT-44" | "BSIT-45"

type Student = {
  id: number;
  name: string;
  age: number;
  section: Section;
  isActive: boolean;
  image?: any
};

type StudentItemProps = {
  student: Student
  onToggle: ControlStudent;
  onSelect: ControlStudent;
  onDelete: ControlStudent;
  isSelected: boolean | null;
  theme: Theme
};

const ORIGINALSTUDENTS: Student[] = ([
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

const StudentItem = ({student, onToggle, onSelect, onDelete, theme, isSelected}: StudentItemProps) => {
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
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> {student.name} Info </Text>
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
          <Text style = {student.isActive ? styles.textActive : styles.textInactive}> {student.isActive ? "Active" : "Inactive"} </Text>
          <Pressable
          onPress={() => onToggle(student.id)}
          onLongPress={() => alert(`Long pressed: ${student.name}`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonToggle, {backgroundColor: student.isActive ? theme.success : theme.error}, 
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonToggle, {color: theme.textPrimary}]}> {student.isActive ? "Inactivate" : "Activate"}  </Text> 
          </Pressable>
        </View>

        <Pressable
        onPress={() => onDelete(student.id)}
        onLongPress={() => alert(`Long pressed: ${student.name}`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonDelete,
        pressed && {opacity: 0.1},]}>
          <Text style = {[styles.textButtonDelete, {color: theme.textPrimary}]}> Delete  </Text> 
        </Pressable>

      </Pressable>
  )
};

export default function TypeFunctionMultiple() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectStudent = (id: number): void => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  };

  const selectedStudent = students.find(s => s.id === selectedId);

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

  const deleteStudent = (id: number): void => {
    const find = students.find(s => s.id === id);

    if (!find) {
      alert("Student not found!");
      return;
    }
    Alert.alert(
      "Confirmation",
      `Delete ${find.name}?`,
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Delete", style: 'destructive',
          onPress: () => {
            setStudents(prev =>
              prev.filter(s =>
                s.id !== id
              )
            );
            alert("Success!")
          }
        }
      ]
    )
  };

  const renderStudent : ListRenderItem<Student> = ({item}) => {
    return (
      <StudentItem
      student={item}
      onDelete={deleteStudent}
      onSelect={selectStudent}
      onToggle={toggleIsActive}
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

  const empty = () => (
    <>
    <Text style = {[styles.textEmpty, {color: theme.textPrimary}]}> No Students Yet </Text>
    </>
  );

  const separator = () => <View style = {[styles.separator]}/>
  
  
  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <View style = {{flex: 1}}> 
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}/>
      </View>

    {selectedStudent && (
      <View style = {[styles.selectedContainer, {backgroundColor: theme.background}]}>
        
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
          <Text style = {[styles.textTitleSelected, {color: theme.textPrimary}]}> Selected Student </Text>
          {selectedStudent.image && (
            <Image source={selectedStudent.image} style = {[styles.imageSelected]}/>
          )}
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

          <View style = {[styles.infoRow]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.name} </Text>
          </View>

          <View style = {[styles.infoRow]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.age} </Text>
          </View>

          <View style = {[styles.infoRow]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.section} </Text>
          </View>

          <View style = {[styles.infoRow]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status: </Text>
            <Text style = {selectedStudent.isActive ? styles.textActive : styles.textInactive}> {selectedStudent.isActive ? "Active" : "Inactive"} </Text>
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
    borderLeftWidth: 10,
    borderLeftColor: "#3B82F6", 

  },

  textTitle: {
    textAlign: 'center',
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
    paddingVertical: 1

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  textActive: {
    color: "#4ADE80",
    fontSize: 15,
    fontWeight: 'bold' 

  },

  textInactive: {
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
    fontWeight: 'bold',
    fontSize: 15

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#F87171",

  },

  textButtonDelete: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textFooter: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  textEmpty: {
     textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  separator: {
    height: 20

  },

  selectedContainer: {
    width: '100%'

  },

  studentCardSelected: {
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

  textTitleSelected: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  imageSelected: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center'

  }

  

  


})
