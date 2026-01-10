import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
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
  age: number
};

const STUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20 },
  { id: 2, name: "Maria Santos", age: 21 },
  { id: 3, name: "Pedro Reyes", age: 19 },
  { id: 4, name: "Ana Lopez", age: 22 },
  { id: 5, name: "Carlos Mendoza", age: 18 },
  { id: 6, name: "Juan Dela Cruz", age: 20 },
  { id: 7, name: "Maria Santos", age: 19 },
  { id: 8, name: "Carlos Reyes", age: 22 },
  { id: 9, name: "Anne Villanueva", age: 21 },
  { id: 10, name: "Mark Lopez", age: 18 },
]);

export default function FlatListLesson1() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(STUDENTS);

  const renderStudent = ({item, index}: {item: Student, index: number}) => {
    return (
      <View style = {[styles.card, {backgroundColor: theme.inputBackground, borderColor: theme.accent, borderWidth: 1}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> #{index + 1}. </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.name} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.age} </Text>
        </View>
      </View>
    )
  };

  const clearList = () => {
    setStudents([]);
  }

  const listHeader = () => (
    <View style = {[styles.headerContainer, {backgroundColor: theme.background}]}>
      <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists </Text>
        <Pressable
        onPress={clearList}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1 }]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Clear Students </Text>
        </Pressable>
    </View>
  );

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={() => (
        <View style = {[styles.empty, {backgroundColor: theme.background}]}>
          <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students yet </Text>
          <Text style = {[styles.textEmptySub, {color: theme.textPrimary}]}> Add Students to see them! </Text>
        </View>
      )}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  card: {
    marginTop: 10,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold'
  },

  divider: {
    paddingVertical: 2,
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
  },
  
  empty: {
    gap: 5

  },

  textEmpty: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"

  },

  textEmptySub: {
    fontSize: 14,
    textAlign: 'center'

  },

  headerContainer: {
    gap: 10

  },

  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor:  "#4ADE",
    borderRadius: 10

  },

  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  }

})

