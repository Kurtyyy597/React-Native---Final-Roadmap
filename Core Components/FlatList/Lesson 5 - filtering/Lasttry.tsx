import React, {useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet, FlatList} from 'react-native';
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
  section: string;
  image: any;
  isActive: boolean 
};

type Section = "BSIT-41" | "BSIT-42" | "BSIT-43"

type Filters = {
  isActive: boolean | null
  section: Section | null;
  age: number | null
};


const ORIGINALSTUDENTS : Student[] = ([
    {
    id: 1,
    name: "Kurt Allen A. Marquez",
    age: 21,
    section: "BSIT-41",
    image: require("../../../Images/Kurt.jpg"),
    isActive: true,
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    age: 20,
    section: "BSIT-41",
    image: require("../../../Images/men1.jpg"),
    isActive: false,
  },
  {
    id: 3,
    name: "Maria Santos",
    age: 19,
    section: "BSIT-42",
    image: require("../../../Images/women1.jpg"),
    isActive: true,
  },
  {
    id: 4,
    name: "Carlos Reyes",
    age: 21,
    section: "BSIT-42",
    image: require("../../../Images/men2.jpg"),
    isActive: true,
  },
  {
    id: 5,
    name: "Anne Villanueva",
    age: 22,
    section: "BSIT-43",
    image: require("../../../Images/women2.jpg"),
    isActive: false,
  },
  {
    id: 6,
    name: "Mark Lopez",
    age: 18,
    section: "BSIT-43",
    image: require("../../../Images/men3.jpg"),
    isActive: true,
  },
  {
    id: 7,
    name: "Sophia Cruz",
    age: 20,
    section: "BSIT-41",
    image: require("../../../Images/woemn3.jpg"),
    isActive: true,
  },
  {
    id: 8,
    name: "Daniel Mendoza",
    age: 21,
    section: "BSIT-42",
    image: require("../../../Images/men4.jpg"),
    isActive: false,
  },
  {
    id: 9,
    name: "Nicole Fernandez",
    age: 19,
    section: "BSIT-43",
    image: require("../../../Images/women5.jpg"),
    isActive: true,
  },
  {
    id: 10,
    name: "Joshua Ramos",
    age: 22,
    section: "BSIT-41",
    image: require("../../../Images/men5.jpg"),
    isActive: false,
  },
]);

export default function FlatListFilteringLastTry() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectStudent = (id: number) => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )
  };

  const [allStudents, setAllStudents] = useState<Student[]>(ORIGINALSTUDENTS);
  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [filters, setFilters] = useState<Filters>({
    isActive: null,
    section: null,
    age: null
  });

  const applyFilters = (nextFilters: Filters, source: Student[]) => {
    let result = source;

    if (nextFilters.isActive !== null) {
      result = result.filter(
        s => s.isActive === nextFilters.isActive
      );
    }

    if (nextFilters.section) {
      result = result.filter(
        s => s.section === nextFilters.section
      );
    }

    if (nextFilters.age !== null) {
      result = result.filter(
        s => s.age === nextFilters.age
      );
    }

    setStudents(result);
  };

  const updateFilters = (partial: Partial<Filters>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    applyFilters(next, allStudents);
  };

  const header = () => (
    <>
    <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists </Text>
    </>
  );

  const footer = () => {
    return (
      <>
      {students.length >= 10 && (
        <Text style = {[styles.textFooter, {color: theme.textPrimary}]}> Student reached its maximum length. </Text>
      )}
      </>
    )
  }

   const toggleIsActive = (id: number) => {
    setAllStudents(prev => {
      const updated = prev.map(s =>
        s.id === id
          ? { ...s, isActive: !s.isActive }
          : s
      );

      applyFilters(filters, updated); // ✅ CRITICAL FIX
      return updated;
    });
  };
   

  const empty = () => {
    if (students.length === 0) {
      return (
        <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students yet </Text>
      )
    }
  };

  const separator = () => <View style = {[styles.separator]}/>

  const renderStudent = ({item, index} : {item: Student, index: number}) => {
    const isSelected = item.id === selectedId;
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
        pressed && styles.pressedStudent,
        isSelected && styles.selectedStudentHighlight]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student #{index + 1}. Information </Text>
          {item.image && (
            <Image source={item.image} style= {[styles.imageOutput]}/>
          )}
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
            <Text style = {item.isActive ? styles.textActive : styles.textInactive}> {item.isActive ? "Active" : "Inactive"} </Text>
            <Pressable
            onPress={() => toggleIsActive(item.id)}
            onLongPress={() => alert(`Long pressed: Hi`)}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            item.isActive ? styles.buttonActive : styles.buttonInactive,
            pressed && {opacity: 0.1},]}>
              <Text style = {[styles.textButtonActive, {color: theme.textPrimary}]}> Update Status  </Text> 
            </Pressable>
          </View>
      </Pressable>
    )
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Pressable
        onPress={() => updateFilters({isActive: true})}
        onLongPress={() => alert(`Long pressed: Hi `)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Active  </Text> 
        </Pressable>
        <Pressable
        onPress={() => updateFilters({isActive: false})}
        onLongPress={() => alert(`Long pressed: Hi`)}
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
        onPress={() => updateFilters({age: 18})}
        onLongPress={() => alert(`Long pressed: Hi`)}
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
        onPress={() => updateFilters({age: 10})}
        onLongPress={() => alert(`Long pressed: Hi `)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Minor </Text> 
        </Pressable>

        <Pressable
        onPress={() => updateFilters({section: "BSIT-41"})}
        onLongPress={() => alert(`Long pressed: Hi `)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> BSIT-41 </Text> 
        </Pressable>
         <Pressable
        onPress={() => updateFilters({section: "BSIT-42"})}
        onLongPress={() => alert(`Long pressed: Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> BSIT-42 </Text> 
        </Pressable>
         <Pressable
        onPress={() => updateFilters({section: "BSIT-43"})}
        onLongPress={() => alert(`Long pressed: Hi`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.button,
        pressed && {opacity: 0.1}]}>
          <Text style = {[styles.textButton, {color: theme.textPrimary}]}> BSIT-43 </Text> 
        </Pressable>

        <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={empty}
        ListFooterComponent={footer}
        ListHeaderComponent={header}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  textFooter: {
    textAlign: 'center',
    fontSize: 14

  },

  textEmpty: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14

  },

  separator: {
    height: 15
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

  selectedStudentHighlight: {
    borderRightColor: "#60A5FA",
    borderRightWidth: 10,
    borderLeftColor: "#60A5FA",
    borderLeftWidth: 10

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  imageOutput: {
    height: 150,
    width: 150,
    borderRadius: 30,
    alignSelf: 'center'

  },

  divider: {
    paddingVertical: 2
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: "#60A5FA",
 

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  textActive: {
    fontSize: 15,
    color: "#4ADE80",
    fontWeight: 'bold'

  },

  textInactive: {
    fontSize: 15,
    color: "#F87171",

  },

  textButton: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18

  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",


  },
  
  buttonActive: {
    backgroundColor: "#4ADE80",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 3

  },

  buttonInactive: {
    backgroundColor: "#F87171",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 3
  },

  textButtonActive: {
    fontWeight: 'bold'
  }



 





})