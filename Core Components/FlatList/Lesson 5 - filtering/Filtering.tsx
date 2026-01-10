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
  age: number;
  section: "A" | "B" | "C";
  isActive: boolean
};


const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "A", isActive: true },
  { id: 2, name: "Maria Santos", age: 19, section: "B", isActive: false  },
  { id: 3, name: "Carlos Reyes", age: 21, section: "A", isActive: false  },
  { id: 4, name: "Anne Villanueva", age: 22, section: "C", isActive: false  },
  { id: 5, name: "Mark Lopez", age: 18, section: "B", isActive: false  },
  { id: 6, name: "Sophia Cruz", age: 20, section: "A", isActive: false  },
  { id: 7, name: "Daniel Mendoza", age: 23, section: "C", isActive: false  },
  { id: 8, name: "Patricia Gomez", age: 19, section: "B", isActive: false  },
  { id: 9, name: "Joshua Ramirez", age: 21, section: "A", isActive: false  },
  { id: 10, name: "Nicole Fernandez", age: 18, section: "C", isActive: false  },
]);

export default function FlatListFiltering() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [allStudents, setAllStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [studemts, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const filterName = () => {
    setStudents(allStudents.filter(s =>
      s.name.trim().toLowerCase().includes("daniel")
    ))
  };

  const filterSection = (section: Student["section"]) => {
    setStudents(allStudents.filter(s => s.section === section))
  };

  const showAllActive = () => {
    setStudents(allStudents.filter(s =>
      s.isActive 
    ))
  };

  const showAllInactive = () => {
    setStudents(allStudents.filter(s =>
      !s.isActive
    ))
  };

  const showAdult = () => {
    setStudents(allStudents.filter(s =>
      s.age >= 18
    ))
  };

  const clearAll = () => {
    setStudents([]);
  };

  const showAllStudents = () => {
    setStudents(allStudents);
  };

 const toggleIsActive = (id: number) => {
  setAllStudents(prev => {
    const updated = prev.map(s =>
      s.id === id
        ? { ...s, isActive: !s.isActive }
        : s
    );

    setStudents(updated); // keep view in sync
    return updated;
  });
};

 

  

  const renderStudent = ({item, index} : {item: Student, index: number}) => (
    <View style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
      <Text style = {[styles.textCardTitle, {color: theme.textPrimary}]}> Student #{index + 1}. Info </Text>
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
      <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
        <Text style = {item.isActive ? styles.textActiveStudent : styles.textInactiveStudent}> Active Status: {item.isActive ? "Active" : "Inactive"} </Text>
        <Pressable
        onPress={() => toggleIsActive(item.id)}
        onLongPress={() => alert(`Long pressed: ${item.name}`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonToggle, {backgroundColor: theme.inputBackground},
        pressed && {opacity: 0.1} ]}>
          <Text style = {[styles.textButtonToggle, {color: theme.textPrimary}]}> Toggle </Text>
        </Pressable>
        </View>
    </View>
  );

  const header = () => (
    <>
    <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists </Text>
    </>
  );

  const footer = () => (
    <>
    <Text style = {[styles.textFooter, {color: theme.textPrimary}]}> Add + to add more </Text>
    </>
  );

  const emptyComponent = () => (
    <>
    <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students yet </Text>
    </>
  );

  const Separator = () => <View style = {[styles.separator]}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={studemts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListEmptyComponent={emptyComponent}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ItemSeparatorComponent={Separator}/>

       <Pressable
        onPress={filterName}
        onLongPress={() => alert(`hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Filter Name </Text>
        </Pressable>

        <Pressable
        onPress={()=>filterSection("A")}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> section A </Text>
        </Pressable>

        <Pressable
        onPress={showAllActive}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Active </Text>
        </Pressable>

        <Pressable
        onPress={showAllInactive}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Inactive </Text>
        </Pressable>

        <Pressable
        onPress={showAdult}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Adult </Text>
        </Pressable>

        <Pressable
        onPress={clearAll}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Clear All </Text>
        </Pressable>

        <Pressable
        onPress={showAllStudents}
        onLongPress={() => alert(`Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button, 
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Restore </Text>
        </Pressable>

       
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  card: {
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

  textCardTitle: {
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

  textActiveStudent: {
    color: "#60A5FA",
    fontSize: 15,
    fontWeight: 'bold'

  },

  textInactiveStudent: {
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
    fontSize: 14

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textFooter: {
     textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textEmpty: {
     textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  separator: {
    height: 10

  },

  button: {
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
}

  




})