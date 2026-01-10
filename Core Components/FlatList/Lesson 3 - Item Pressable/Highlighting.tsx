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

type Students = {
  id: number;
  name: string;
  age: number;
  section: string;
};

const ORIGINALSTUDENTS : Students[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "A" },
  { id: 2, name: "Maria Santos", age: 19, section: "B" },
  { id: 3, name: "Carlos Reyes", age: 21, section: "A" },
  { id: 4, name: "Anne Villanueva", age: 22, section: "C" },
  { id: 5, name: "Mark Lopez", age: 18, section: "B" },
  { id: 6, name: "Sophia Cruz", age: 20, section: "A" },
  { id: 7, name: "Daniel Mendoza", age: 23, section: "C" },
  { id: 8, name: "Patricia Gomez", age: 21, section: "B" },
  { id: 9, name: "Joshua Navarro", age: 19, section: "A" },
  { id: 10, name: "Angela Torres", age: 22, section: "C" },
]);

export default function FlatListHighlighting() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Students[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectStudent = (id: number) => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  };

  const renderStudent = ({item, index} : {item: Students,  index: number}) => {
    const isSelected = item.id === selectedId
    return (
      <Pressable
        onPress={() => selectStudent(item.id)}
        onLongPress={() => alert(`Long pressed: ${item.name}`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.studentCard, {backgroundColor: theme.inputBackground},
        pressed && styles.selectedStudent,
        isSelected && styles.selectedCard
        ]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student #{index + 1} Info  </Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.name} </Text>
          </View>
          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.age} </Text>
          </View>
          <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
            <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.section} </Text>
          </View>

          {isSelected && (
            <Text style = {[styles.check, {color: "#2563EB"}]}> ✓ Selected </Text>
          )}
        </Pressable>
    )
  };

  const separator = () => <View style = {[styles.separator]}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ItemSeparatorComponent={separator}/>
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

  selectedStudent: {
    opacity: 0.1
  },

  selectedCard: {
    borderColor: "#60A5FA",
    borderWidth: 10


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
    justifyContent: 'space-between'

  },

  textLabel: {
    fontSize: 12,

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  separator: {
    height: 10
  },

  check: {
  marginTop: 8,
  fontWeight: "600",
  textAlign: 'center'
  }

})