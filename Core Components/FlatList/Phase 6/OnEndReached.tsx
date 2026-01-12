import React, {act, useState} from 'react';
import {View, Text, Pressable, StyleSheet, ActivityIndicator, Alert, FlatList, ListRenderItem} from 'react-native';
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
  maidenName?: string;
  lastName: string;
  age: number;
  height: string;
  weight: string;
};

type StudentAction = 
| {type: "DELETE_STUDENT"; payload: {id: number}}
| {type: "SELECT_STUDENT"; payload: {id: number}}



const LIMIT = 10;

type Result<T> = 
| {ok: true, value: T}
| {ok: false, error: string}

type findByIdFn<T extends {id: number}> = (
  list: readonly T[],
  id: number
) => Result<T>;

const findStudentById : findByIdFn<Student> = (list, id) => {
  const item = list.find(s => s.id === id);

  if (!item) {
    return {ok: false, error: "Student Id Not Found"}
  }
  return {ok: true, value: item}
};

type FetchStudent = (
  skip: number,
  limit: number
) => Promise<Result<{ students: Student[]; total: number }>>;

const fetchStudentFromApi: FetchStudent = async (skip, limit) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    );

    if (!response.ok) {
      return { ok: false, error: "Failed to load students from API" };
    }

    const data = await response.json();

    const students: Student[] = data.users.map((s: any) => ({
      id: s.id,
      firstName: s.firstName,
      maidenName: s.maidenName,
      lastName: s.lastName,
      age: s.age,
      height: s.height,
      weight: s.weight,
    }));

    return {
      ok: true,
      value: {
        students: students,
        total: data.total,
      },
    };
  } catch {
    return { ok: false, error: "Network error failed" };
  }
};

type StudentStateOnly = Readonly<{
  students: Student[],
  selectedId: number | null
}>;

type ApplyStudentActionFn = (
  state: StudentStateOnly,
  action: StudentAction
) => Result<StudentStateOnly>;

const applyStudentAction : ApplyStudentActionFn = (state, action) => {
  switch (action.type) {
    case "SELECT_STUDENT": {
      const result = findStudentById(state.students, action.payload.id);

      if (!result.ok) {
        return {ok: false, error: result.error}
      }
      return {
        ok: true,
        value: {
          students: state.students,
          selectedId: state.selectedId === action.payload.id ? null : action.payload.id
        }
      }
    }
    case "DELETE_STUDENT": {
      const result = findStudentById(state.students, action.payload.id);

      if (!result.ok) {
        return {ok: false, error: result.error}
      }
      return {
        ok: true,
        value: {
          students: state.students.filter(s =>
            s.id !== action.payload.id
          ),
          selectedId: state.selectedId === action.payload.id ? null : action.payload.id
        }
      }
    }
    default: {
      const _never : never = action
      return _never
    }
  }
};

type RenderItem = {
  student: Student;
  theme: Theme;
  onAction: (action: StudentAction) => void;
  isSelected: boolean; 
};

const RenderItemStudents = ({student, theme, onAction, isSelected}: RenderItem) => {
  return (
    <Pressable
      onPress={() => onAction({type: "SELECT_STUDENT", payload: {id: student.id}})}
      onLongPress={() => alert(`Long pressed: ${student.firstName}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && styles.selectedStudent,
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info From API </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal First Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.firstName} </Text>
        </View>

         <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Maiden Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.maidenName} </Text>
        </View>

         <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Last Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.lastName} </Text>
        </View>

         <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Age: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.age} </Text>
        </View>

         <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Height: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.height} </Text>
        </View>

         <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Weight: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.weight} </Text>
        </View>
      </Pressable>
  )
};

export default function OnEndReached() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;
  const [students, setStudents] = useState<Student[]>([]);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const loadMoreUsers = async () => {
    if (isLoadingMore) return;
    if (!hasMore) return;

    setRefreshing(true);
    setIsLoadingMore(true);
    setError(null);

    const result = await fetchStudentFromApi(skip, LIMIT);
 

    if (!result.ok) {
      setError(result.error);
      setIsLoadingMore(false);
      return;
    }
    setStudents(prev => [...prev, ...result.value.students]);

    const nextSkip = skip + LIMIT
    
    setSkip(nextSkip);
    setHasMore(nextSkip < result.value.total);
    setRefreshing(false);
    setIsLoadingMore(false);
  };

  const executeAction = (action: StudentAction) => {
    const result = applyStudentAction({students, selectedId}, action);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStudents(result.value.students);
    setSelectedId(result.value.selectedId)
  };

  const handleActionStudent = (action: StudentAction) => {
    if (action.type === "DELETE_STUDENT") {
      Alert.alert(
        "Confirmation",
        "Delete Student?",
        [
          {text: "Cancel", style: "cancel"},
          {
            text: "Confirm", style: "destructive",
            onPress: () => {
              executeAction(action);
            }
          }
        ]
      )
      return;
    }
    executeAction(action);
  };

  const renderItemStudentsFinal : ListRenderItem<Student> = ({item}) => {
    return (
      <RenderItemStudents
      student={item}
      theme={theme}
      onAction={handleActionStudent}
      isSelected={item.id === selectedId}/>
    )
  };

  const header = () => {
    if (students.length >= 1) {
      return <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists. </Text>
    }
    
  };

  const footer = () => {
    if (isLoadingMore && students.length >= 1) {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading students from API... </Text>
        </>
      )
    }
  };

  const empty = () => {
    if (students.length === 0) {
      return (
        <>
        <Text style = {[styles.textEmpty, {color: theme.textPrimary}]}> No Students Yet. Refresh to load </Text>
        </>
      )
    }
  };

  const separator = () => <View style = {[styles.separator]}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <Pressable
      onPress={loadMoreUsers}
      onLongPress={() => alert(`Long pressed: Hello`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Load users  </Text> 
      </Pressable>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItemStudentsFinal}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}
      onEndReached={loadMoreUsers}
      onEndReachedThreshold={0.4}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1

  },

  studentCard: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F9FAFB", // soft gray
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

  },

  selectedStudent: {
   opacity: 0.1

  },

  selectedCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#FACC15",   // yellow accent
    borderRightWidth: 6,
    borderRightColor: "#F87171",  // red accent
    backgroundColor: "#FFFBEB",

  },

  textTitle: {
    textAlign: "center",
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
    fontSize: 15,
    fontWeight: 'bold'

  },

  textHeader: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 'bold'

  },

  textLoading: {
    textAlign: "center",
    fontSize: 14

  },

  textEmpty: {
    textAlign: "center",
    fontSize: 14
  

  },

  separator: {
    height: 20

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
 


