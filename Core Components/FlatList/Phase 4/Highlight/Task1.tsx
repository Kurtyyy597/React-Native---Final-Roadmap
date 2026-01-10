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
  section: string;
  isActive: boolean;
};

type StudentItemProps = {
  student: Student
  onSelect: (id: number) => void
  onPress: (id: number) => void
  onToggle: (id: number) => void;
  isSelected: boolean;
  theme: Theme

};

const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "BSIT-41", isActive: true },
  { id: 2, name: "Maria Santos", age: 19, section: "BSIT-41", isActive: false },
  { id: 3, name: "Carlos Reyes", age: 21, section: "BSIT-42", isActive: true },
  { id: 4, name: "Anne Villanueva", age: 22, section: "BSIT-42", isActive: true },
  { id: 5, name: "Mark Lopez", age: 18, section: "BSIT-43", isActive: false },
  { id: 6, name: "Sophia Cruz", age: 20, section: "BSIT-43", isActive: true },
  { id: 7, name: "Daniel Mendoza", age: 23, section: "BSIT-41", isActive: false },
  { id: 8, name: "Nicole Ramirez", age: 19, section: "BSIT-42", isActive: true },
  { id: 9, name: "Joshua Flores", age: 21, section: "BSIT-43", isActive: false },
  { id: 10, name: "Angelica Torres", age: 22, section: "BSIT-41", isActive: true },
]);

const StudentItem = ({student, onSelect, onPress, onToggle, isSelected, theme, }: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => {
        onSelect(student.id)
        onPress(student.id)
      }}
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
          styles.button, {backgroundColor: theme.inputBackground},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Change Status </Text> 
          </Pressable>
        </View>

       
    </Pressable>
  )
};

export default function HighlightingWithFlatListAkin() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  
  const selectStudent = (id: number) => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    )

  }
    

  const toggleIsActive = (id: number) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ? 
        {
          ...s,
          isActive: !s.isActive
        } : s
      )
    )
  };

  const selectedStudent = students.find(s =>
    s.id === selectedId
  );

  const onPress = (id: number) => {
    console.log(`You pressed`, id)
  };

  const renderStudent : ListRenderItem<Student> = ({item}) => {
    return (
      <StudentItem
      student={item}
      onSelect={selectStudent}
      onPress={onPress}
      onToggle={toggleIsActive}
      isSelected={item.id === selectedId}
      theme={theme}
      
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
      <View style = {{flex: 1}}> 
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListEmptyComponent={empty}
      ListFooterComponent={footer}
      ListHeaderComponent={header}
      ItemSeparatorComponent={separator}/>
      </View>

      

       
      {selectedStudent && (
        <View style = {[styles.selectedStudentCard, {backgroundColor: theme.background}]}>
          <Text style = {[styles.textTitle, {color: theme.accent}]}> Selected Student </Text>
          <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

          <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {selectedStudent.name} </Text>
          </View>
          <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {selectedStudent.age} </Text>
          </View>

           <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {selectedStudent.section} </Text>
          </View>

          <View style = {[styles.infoRow, {backgroundColor: theme.background}]}>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status: </Text>
            <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {selectedStudent.isActive ? "Active" : "Inactive"} </Text>
          </View>
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

  pressedStudent: {
    opacity: 0.1

  },

  selectedCard: {
    borderRightWidth: 10,
    borderRightColor: "#63fa60ff",
    borderLeftColor: "#ed6612ff",
    borderLeftWidth: 10 

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
    fontSize: 12

  },

  textContent: {
    fontWeight: 'bold',
    fontSize: 15

  },

  textActive: {
    color: "#4ADE80",
    fontSize: 15,
    fontWeight: 'bold'

  },

  textInactive: {
    color:  "#F87171",
    fontSize: 15,
    fontWeight: 'bold' 

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

  },
  
  selectedContainer: {
    gap: 5

  },

  textTitleSelected: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  textFooter: {
    fontSize: 14,
    textAlign: 'center'

  },

  textEmpty: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center'

  },

  separator: {
    height: 10

  },

  selectedStudentCard: {
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

  detailsPanel: {

  }
})