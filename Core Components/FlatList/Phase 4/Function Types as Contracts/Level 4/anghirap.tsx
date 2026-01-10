import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Alert, FlatList, ActivityIndicator, ListRenderItem} from 'react-native';
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
  firstName: string;
  lastName: string;
  maidenName?: string
  age: number;
  
};

type StudentAction =
| {type: "DELETE_STUDENT", payload: {id: number}}
| {type: "SELECT_STUDENT", payload: {id: number}}

type Result<T> =
| {ok: true, value: T}
| {ok: false, error: string}

type ActionResult = 
| {ok: true, selectedId?: number}
| {ok: false, error: string}

type findByIdFn<T extends {id: number}> = (
  list: readonly T[],
  id: number
) => Result<T>

const findById: findByIdFn<Student> = (list, id) => {
  const item = list.find((i) => i.id === id);

  if (!item) {
    return {ok: false, error: "Failed to load item"}
  }
  return {ok: true, value: item}
};

type fetchStudentsFn = () => Promise<Result<Student[]>>;

const fetchStudents: fetchStudentsFn = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users?");

    if (!response.ok) {
      return {ok: false, error: "Failed to load students"}
    }
    const data = await response.json();

    const students: Student[] = data.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      maidenName: u.maidenName,
      age: u.age
    }));
    return {ok: true, value: students}
  } catch {
    return {ok: false, error: "Network error"}
  }
};

type RenderItemProps = {
  student: Student;
  theme: Theme;
  isSelected: boolean;
  onAction: (action: StudentAction) => void
 };


 const RenderItem = ({student, theme, isSelected, onAction}: RenderItemProps) => {
  return (
    <Pressable
      onPress={() => onAction({type: "SELECT_STUDENT", payload: {id: student.id}})}
      onLongPress={() => alert(`Long pressed: ${student.firstName}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: isSelected ? "#FFFBEB" :  theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info From API </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <View style = {[styles.infoRow, {backgroundColor: isSelected ? "#FFFBEB" :  theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal First Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.firstName} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: isSelected ? "#FFFBEB" :  theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Maiden Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.maidenName ?? "N/A"} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: isSelected ? "#FFFBEB" :  theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Last Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.lastName} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: isSelected ? "#FFFBEB" :  theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age:  </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.age} </Text>
        </View>
        <Pressable
        onPress={() => onAction({type: "DELETE_STUDENT", payload: {id: student.id}})}
        onLongPress={() => alert(`Long pressed: Hi Baby `)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonDelete, {backgroundColor: theme.error},
        pressed && {opacity: 0.1},]}>
          <Text style = {[styles.textButtonDelete, {color: theme.inputBackground}]}> Delete </Text> 
        </Pressable>

        {isSelected && (
          <Text style = {[styles.textSelected, {color: theme.accent}]}> Selected Student ✅</Text>
        )}
      </Pressable>
  )
};

export default function SobrangDaliLang() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadStudents = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchStudents();
    
    setLoading(false);
    
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStudents(result.value);
  };

  const applyActionLocally = (action: StudentAction): ActionResult=> {
    switch (action.type) {
      case "SELECT_STUDENT": {
        const result = findById(students, action.payload.id);

        if (!result.ok) {
          return {ok: false, error: "Student not found"}
        }
        setSelectedId(prev =>
        (prev === action.payload.id ? null : action.payload.id)
        )
        return {ok: true, selectedId: action.payload.id }
      }
      case "DELETE_STUDENT": {
        const result = findById(students, action.payload.id);

        if (!result.ok) {
          return {ok: false, error: "Student not found"}
        }
        Alert.alert(
          "Confirmation",
          `Delete Student?`,
          [
            {text: "Cancel", style: "cancel"},
            {
              text: "Confirm", style: "destructive",
              onPress: () => {
                setStudents(prev =>
                (prev.filter(s =>
                  s.id !== action.payload.id
                ))
                )
                setSelectedId(prev =>
                (prev === action.payload.id ? null : action.payload.id)
                )
                alert("Success!");
              }
            }
          ]
        )
        return {ok: true, selectedId: action.payload.id}
      }
      default: {
        const _never: never = action;
        return _never;
      }
    }
  };

  const handleActionStudent = (action: StudentAction) => {
    applyActionLocally(action);
  };

  const header = () => {
    return (
      <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Students from API </Text>
    )
  };

  const footer = () => {
    if (loading) {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading student... </Text>
        </>
      )
    };

    return (
      <Pressable
      onPress={handleLoadStudents}
      onLongPress={() => alert(`Long pressed: Hi`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.loadButton, {backgroundColor: theme.success},
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButtonLoad, {color: theme.textPrimary}]}> Load Students </Text> 
    </Pressable>
    )

    
  };

  const empty = () => {
    return (
      <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students Yet </Text>
    )
  };

  const separator = () => <View style = {styles.separator}/>

  const Render: ListRenderItem<Student> = ({item}) => {
    return (
      <RenderItem
      student={item}
      theme={theme}
      onAction={handleActionStudent}
      isSelected={item.id === selectedId}/>
    )
  }

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={Render}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}/>
    </SafeAreaView>
  );
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
    alignSelf: "center"

  },

  selectedCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#FACC15",   // yellow accent
    borderRightWidth: 6,
    borderRightColor: "#F87171",  // red accent
    backgroundColor: "#FFFBEB",   // very light yellow

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 16,
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

  textHeader: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'

  },

  textLoading: {
    textAlign: 'center',
    fontSize: 12

  },

  loadButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",

  },

  textButtonLoad: {
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

  textSelected: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 20

  },

  textButtonDelete: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  }


})






