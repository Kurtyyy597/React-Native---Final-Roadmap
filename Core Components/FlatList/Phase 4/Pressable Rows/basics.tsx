import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ListRenderItem} from 'react-native';
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
  isActive: boolean;
};

type StudentItemProps = {
  student: Student;
  onPress: (id: number) => void
  onToggle: (id: number) => void
  isSelected: boolean;
  theme: Theme;
  onSelected: (id: number) => void
};

const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, isActive: true },
  { id: 2, name: "Maria Santos", age: 19, isActive: false },
  { id: 3, name: "Carlos Reyes", age: 21, isActive: true },
  { id: 4, name: "Anne Villanueva", age: 22, isActive: true },
  { id: 5, name: "Mark Lopez", age: 18, isActive: false },
  { id: 6, name: "Sophia Cruz", age: 20, isActive: true },
  { id: 7, name: "Daniel Mendoza", age: 23, isActive: false },
  { id: 8, name: "Nicole Ramirez", age: 19, isActive: true },
  { id: 9, name: "Joshua Flores", age: 21, isActive: false },
  { id: 10, name: "Angelica Torres", age: 22, isActive: true },
]);

const StudentItem = ({student, onPress, onToggle, theme, isSelected, onSelected} : StudentItemProps) => {
  return (
    <Pressable
      onPress={() => {
        onPress(student.id)
        onSelected(student.id)
      }}
      onLongPress={() => alert(`Long pressed: ${student.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      isSelected && styles.selectedHighlight,
      pressed && styles.pressedStudent]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info </Text>
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
          <Text style = {student.isActive ? styles.textActive : styles.textInactive}> {student.isActive ? "Active" : "Inactive"} </Text>
          <Pressable
          onPress={() => onToggle(student.id)}
          onLongPress={() => alert(`Long pressed: ${student.name}`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          student.isActive ? styles.activeButton : styles.inactiveButton,
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Change Status </Text> 
          </Pressable>
        
        </View>
    </Pressable>
  )
};

export default function PressableRowsWithFlatList() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;
  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectStudent = (id: number) => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  }

  const studentOnPress = (id: number): void => {
    console.log(`You pressed`, id)
  };

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
      onPress={studentOnPress}
      onToggle={toggleIsActive}
      onSelected={selectStudent}
      theme={theme}
      isSelected={item.id === selectedId}
      />
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
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ItemSeparatorComponent={separator}
      ListEmptyComponent={empty}
      ListFooterComponent={footer}
      ListHeaderComponent={header}
      
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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

  pressedStudent: {
    opacity: 0.1

  },

  textTitle: {
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
    color: "#F87171",
    fontSize: 15,
    fontWeight: 'bold'

  },

  activeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",

  },

  inactiveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#F87171",

  },

  textButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textFooter: {
    fontSize: 14,
    textAlign: 'center'

  },

  textEmpty: {
    color: "#EF4444",
    textAlign: 'center',
    fontSize: 14

  },

  separator: {
    height: 10
  },

  selectedHighlight: {
    borderRightWidth: 10,
    borderRightColor: "#60A5FA",
    borderLeftColor: "#60A5FA",
    borderLeftWidth: 10
  }

  


})



