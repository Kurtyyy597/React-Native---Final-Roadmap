import React, {useState} from 'react';
import {View, Text, Pressable, ActivityIndicator, StyleSheet, Alert, FlatList, ListRenderItem} from 'react-native';
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
| {type: "SELECT_STUDENT"; payload: {id: number}}
| {type: "DELETE_STUDENT"; payload: {id: number}}

type Result<T> =
|{ok: true, value: T}
|{ok: false, error: string}

type StudentState = Readonly<{
  students: Student[];
  selectedId: number | null
}>;

type ApplyStudentActionFn = (
  state: StudentState,
  action: StudentAction
) => Result<StudentState>;


const applyStudentAction: ApplyStudentActionFn = (state, action) => {
  switch (action.type) {
    case "SELECT_STUDENT": {
      const result = findByIdFnStudents(state.students, action.payload.id);

      if (!result) {
        return {ok: false, error: "Student ID not found"}
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
      const result = findByIdFnStudents(state.students, action.payload.id);

      if (!result) {
        return {ok: false, error: "Student ID not Found"}
      }
      return {
        ok: true,
        value: {
          students: state.students.filter(s => s.id !== action.payload.id),
          selectedId: state.selectedId === action.payload.id ? null : action.payload.id
        }
      }
    }
    default: {
      const _never: never = action
      return _never
    }
  }
}



type FetchStudentFn = () => Promise<Result<Student[]>>;

const fetchStudentApi : FetchStudentFn = async () => {
  try {
    const response = await fetch("https://dummyjson.com/urs");

    if (!response.ok) {
      return {ok: false, error: "Failed to load students"}
    }

    const result = await response.json();

    const students: Student[] = result.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      maidenName: u.maidenName,
      lastName: u.lastName,
      age: u.age,
      height: u.height,
      weight: u.weight
    }))
    return {ok: true, value: students}
  } catch {
    return {ok: false, error: "Network Failed"}
  };
};




type findStudentFn<T extends {id: number}> = (
  list: readonly Student[],
  id: number
)  => Result<T>

const findByIdFnStudents : findStudentFn<Student> = (list, id) => {
  const item = list.find(i => i.id === id);

  if (!item) {
    return {ok: false, error: "Id not found"}
  }
  return {ok: true, value: item}
};

type StudentItemProps = {
  students: Student;
  theme: Theme;
  onAction: (action: StudentAction) => void;
  isSelected: boolean 
};

const RenderItem = ({students, theme, onAction, isSelected}: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => onAction({type: "SELECT_STUDENT", payload: {id: students.id}})}
      onLongPress={() => alert(`Long pressed: ${students.firstName}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info From API </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal First Name: </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.firstName} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Maiden Name: </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.maidenName} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Last Name: </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.lastName} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.age} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Height:  </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.height} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Weight: </Text>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> {students.weight} </Text>
        </View>
      </Pressable>
  )
};

export default function PullToRefreshBitch() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const FetchStudentForReal = async () => {
    if (loading) return;

    setRefreshing(true);
    setLoading(true);
    setError(null);

    const result = await fetchStudentApi();

    setLoading(false);
    setRefreshing(false);
    refreshResetState();

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStudents(result.value);
    
  };

  const executeAction = (action: StudentAction) => {
    const result = applyStudentAction({students, selectedId}, action);

    if (!result.ok) {
      setError(result.error);
      return
    }
    setStudents(result.value.students);
    setSelectedId(result.value.selectedId);
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
              executeAction(action)
            }
          }
        ]
      )
      return;
    }
    executeAction(action);
  };

  const renderItem: ListRenderItem<Student> = ({item}) => {
    return (
      <RenderItem
      students={item}
      theme={theme}
      isSelected={item.id === selectedId}
      onAction={handleActionStudent}/>
    )
  };

  const header = () => {
    if (students.length >= 1) {
      return (
        <>
       <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists. </Text>
        </>
      )
    };

    return error && (
      <Pressable
      onPress={FetchStudentForReal}
      onLongPress={() => alert(`Long pressed: Hi`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Retry  </Text> 
      </Pressable>
    )    
  
  }
    
    
  

  const footer = () => {
    if (loading && students.length >= 1) {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading Students... </Text>
        </>
      )
    };

  }

  const separator = () => <View style = {styles.separator}/>

  const empty = () => {
    return error ? (
      <Text style = {[styles.textError, {color: theme.error}]}> {error} </Text>
    ) : (
      <Text style = {[styles.textEmpty, {color: theme.textPrimary}]}> NO STUDENTS YET </Text>
    )
  }
   

  const refreshResetState = (): void => {
    setError(null);
    setSelectedId(null);
  }

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}
      refreshing={refreshing}
      onRefresh={FetchStudentForReal}/>
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
    

  },

  divider: {
    paddingVertical: 2

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between"

  },

  textLabel: {
    fontSize: 12

  },

  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: "center"

  },

  textLoading: {
    textAlign: "center",
    fontSize: 16,

  },

  textEmpty: {
    textAlign: "center",
    fontSize: 14

  },

  separator: {
    height: 20

  },

  textError: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'

  },

  button: {
    padding: 14,
    backgroundColor: "#4F46E5",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 12,

  },

  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  
  },

  


})






