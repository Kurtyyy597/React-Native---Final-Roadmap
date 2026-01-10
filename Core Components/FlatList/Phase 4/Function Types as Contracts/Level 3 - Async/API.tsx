import React, {act, useState} from 'react';
import {View, Text, Pressable,  StyleSheet, Alert, FlatList, ListRenderItem, ActivityIndicator} from 'react-native';
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

type Section = 
| "BSIT-41"
| "BSIT-42"
| "BSIT-43"

type Student = {
  id: number;
  name: string;
  age: number;
  section: Section;
  isActive: boolean;
};

const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "BSIT-41", isActive: true },
  { id: 2, name: "Maria Santos", age: 19, section: "BSIT-41", isActive: false },
  { id: 3, name: "Carlos Reyes", age: 21, section: "BSIT-42", isActive: true },
  { id: 4, name: "Anne Villanueva", age: 22, section: "BSIT-42", isActive: true },
  { id: 5, name: "Mark Lopez", age: 18, section: "BSIT-43", isActive: false },
  { id: 6, name: "Sophia Cruz", age: 20, section: "BSIT-43", isActive: true },
  { id: 7, name: "Daniel Mendoza", age: 21, section: "BSIT-41", isActive: false },
  { id: 8, name: "Jasmine Torres", age: 19, section: "BSIT-42", isActive: true },
  { id: 9, name: "Paolo Navarro", age: 22, section: "BSIT-43", isActive: true },
  { id: 10, name: "Kimberly Aquino", age: 20, section: "BSIT-41", isActive: true },
])

type StudentAction = 
| {type: "DELETE_STUDENT", payload: {id: number}}
| {type: "TOGGLE_STUDENT", payload: {id: number}}
| {type: "SELECT_STUDENT", payload: {id: number}}
| {type: "ADD_STUDENT"}

type StudentItemProps = {
  student: Student;
  isSelected: boolean;
  onAction: (action: StudentAction) => void;
  theme: Theme
};

type Result<T> =
| {ok: true, value: T}
| {ok: false, error: string}

const executeStudentAction = async (action: StudentAction): Promise<Result<void>> => {
  await new Promise(resolve => setTimeout(resolve, 20000));

  switch (action.type) {
    case "DELETE_STUDENT": {
      if (action.payload.id <= 0) {
        return {ok: false, error: "Invalid Student Id"}
      }
      return {ok: true, value: undefined}
    }
    case "ADD_STUDENT":
    case "SELECT_STUDENT":
    case "TOGGLE_STUDENT":
      return {ok: true, value: undefined}

    default: {
      const _never: never = action;
      return _never
    }
  };
};

const RenderItem = ({student, isSelected, onAction, theme} : StudentItemProps) => {
  return (
    <Pressable
      onPress={() => onAction({type: "SELECT_STUDENT", payload: {id: student.id}})}
      onLongPress={() => alert(`Long pressed: ${student.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitleCard, {backgroundColor: theme.inputBackground}]}> Student Info </Text>
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
          onPress={() => onAction({type: "TOGGLE_STUDENT", payload: {id: student.id}})}
          onLongPress={() => alert(`Long pressed: Hi Baby`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonToggle, {backgroundColor: student.isActive ? theme.success : theme.error},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonToggle]}> Change Status </Text> 
          </Pressable>
        </View>

        <Pressable
          onPress={() => onAction({type: "DELETE_STUDENT", payload: {id: student.id}})}
          onLongPress={() => alert(`Long pressed: Hi Baby`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonDelete, {backgroundColor: theme.error},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonDelete, {color: theme.inputBackground}]}> Delete </Text>
          </Pressable>
      </Pressable>
  )
};

export default function AsyncWithApiFunctions() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStudentAction = async (action: StudentAction) => {
    setLoading(true);
    setError(null);

    const result = await executeStudentAction(action);

    setLoading(false);

    if (!result.ok) {
      setError(result.error)
      return;
    }
    applyActionLocally(action);
  };

  const applyActionLocally = (action: StudentAction) => {
    switch(action.type) {
      case "ADD_STUDENT": {
        const newStudent : Student = {
          id: Date.now(),
          name: "Siraulo",
          age: 21,
          section: "BSIT-41",
          isActive: true
        }
        setStudents(prev => [...prev, newStudent]);
        return;
      }
      case "DELETE_STUDENT": {
        setStudents(prev =>
          prev.filter(s =>
            s.id !== action.payload.id
          )
        )
        setSelectedId(prev =>
        (prev === action.payload.id ? null : action.payload.id)
        );
        return;
      }
      case "SELECT_STUDENT": {
        setSelectedId(prev =>
        (prev === action.payload.id ? null : action.payload.id)
        )
        return;
      }
      case "TOGGLE_STUDENT": {
        setStudents(prev =>
          prev.map(s => s.id === action.payload.id ?
            {
              ...s,
              isActive: !s.isActive
            } : s
          )
        )
        return;
      }
      default: {
        const _never: never = action
        return _never
      }
    };
  };

  const renderItem: ListRenderItem<Student> = ({item}) => {
    return (
      <RenderItem
      student={item}
      theme={theme}
      onAction={handleStudentAction}
      isSelected={item.id === selectedId}/>
    )
  };

  const header = () => {
    return (
      <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists. </Text>
    )
  };

  const footer = () => {
    if (loading) {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        {error && (
          <Text style = {[styles.textError, {color: theme.error}]}> {error} </Text>
        )}
        </>
      )
    }
  };

  const empty = () => (
    <Text style = {[styles.textEmpty, {color: theme.error}]}> No More Students </Text>
  );

  const separator = () => <View style = {[styles.separator]}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <Pressable
      onPress={() => handleStudentAction({type: "ADD_STUDENT"})}
      onLongPress={() => alert(`Long pressed: Hi Baby`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.buttonAdd, {backgroundColor: theme.accent},
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Add </Text> 
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
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1

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
    borderRightColor: "#F87171",
    borderLeftWidth: 10,
    borderLeftColor: "#FACC15",

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
    alignItems: 'center'

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  buttonToggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",


  },

  textActive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#4ADE80",

  },

  textInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#F87171",

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",

  },

  textButtonDelete: {
    fontSize: 18,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textError: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  textEmpty: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  separator: {
    height: 20

  },

  textButtonToggle: {
    fontSize: 16,
    fontWeight: 'black'
  }






})

