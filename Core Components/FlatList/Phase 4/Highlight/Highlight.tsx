import React, {useState} from 'react';
import {View, Text, Pressable, ListRenderItem, StyleSheet, FlatList} from 'react-native';
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
  student: Student
  isSelected: boolean;
  onSelected: (id: number) => void;
  onToggle: (id: number) => void;
  theme: Theme
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

const StudentItem = ({student, isSelected, onSelected, theme, onToggle}: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => onSelected(student.id)}
      onLongPress={() => alert(`Long pressed: ${student.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && styles.pressedStudent,
      isSelected && styles.selectedCard]}>
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
          onLongPress={() => alert(`Long pressed: Hi `)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          student.isActive ? styles.activeButton : styles.inactiveButton,
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Change Status  </Text> 
          </Pressable>
        </View>
      </Pressable>
  )
}

export default function HighlightingWithFlatList() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const selectStudent = (id: number): void => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  };

  const renderStudent: ListRenderItem<Student> = ({item}) => {
    return (
    <StudentItem
    student={item}
    onToggle={toggleIsActive}
    onSelected={selectStudent}
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
        <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
        ListFooterComponent={footer}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        ItemSeparatorComponent={separator}/>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  studentCard: {

  },

  pressedStudent: {

  },

  selectedCard: {

  },

  textTitle: {

  },

  divider: {

  },

  infoRow: {

  },

  textLabel: {

  },

  textContent: {

  },

  activeButton: {

  },

  inactiveButton: {

  },

  textButton: {

  },

  textHeader: {

  },

  textFooter: {

  },

  textEmpty: {

  },

  separator: {
    height: 10
  },

  textActive: {

  },

  textInactive: {

  }


})