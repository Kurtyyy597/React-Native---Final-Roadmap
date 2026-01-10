import React, {use, useState} from 'react';
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

type Section =
| "BSIT-41"
| "BSIT-42"
| "BSIT-43"

type Student = {
  id: number;
  name: string;
  age: number
  gender: string;
  contact: {
    email: string;
    phone: string;
  }
};

type StudentAction = 
| {type: "SELECT_STUDENT", payload: {id: number}}
| {type: "DELETE_STUDENT", payload: {id: number}}


type Result<T> = 
| {ok: true, value: T}
| {ok: false, error: string}

type StudentItemProps = {
  student: Student;
  isSelected: boolean;
  onAction: (action: StudentAction) => void;
  theme: Theme
};

const loadStudentsfromApi = async (): Promise<Result<Student[]>> => {
  try {
    const res = await fetch("https://dummyjson.com/users");

    if (!res) {
      return {ok: false, error: "Failed to load users"}
    }

    const json = await res.json();

    const students: Student[] = json.users.map((u: any) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      age: u.age,
      gender: u.gender,
      contact: {
        email: u.email,
        phone: u.phone
      }

    }));
    return {ok: true, value: students}
  } catch {
    return {ok: false, error: "Network failed!"}
  }
};

const RenderStudent = ({student, isSelected, onAction, theme}: StudentItemProps) => {
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
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> API PEOPLE INFO </Text>
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
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Gender: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.gender} </Text>
        </View>

        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textTitleSubHead, {color: theme.textPrimary}]}> Contact Information </Text>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Phone: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.contact.phone} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Email: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.contact.email} </Text>
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

export default function AsyncRealApi() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadStudents = async () => {
    setLoading(true);
    setError(null);

    const result = await loadStudentsfromApi();

    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setStudents(result.value)
  };

 const applyActionLocally = (action: StudentAction) => {
  switch (action.type) {
    case "DELETE_STUDENT":
      setStudents(prev =>
        prev.filter(s => s.id !== action.payload.id)
      );
      setSelectedId(prev =>
        prev === action.payload.id ? null : prev
      );
      return;

    case "SELECT_STUDENT":
      setSelectedId(prev =>
        prev === action.payload.id ? null : action.payload.id
      );
      return;

    default: {
      const _never: never = action;
      return _never;
    }
  }
};

  const handleStudentAction = (action: StudentAction) => {
  applyActionLocally(action);
};

  const header = () => (
    <Text style = {[styles.textHeader, {color: theme.textPrimary}]}>
      API Student List
    </Text>
  );

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
    <Text style = {[styles.textEmpty, {color: theme.error}]}> No Students Yet </Text>
  );

  const separator = () => <View style = {styles.separator}/>

  const renderItem: ListRenderItem<Student> = ({item}) => {
    return (
      <RenderStudent
      student={item}
      isSelected={item.id === selectedId}
      theme={theme}
      onAction={handleStudentAction}/>
    )
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Pressable
      onPress={handleLoadStudents}
      onLongPress={() => alert(`Long pressed: Hi}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.buttonAdd, {backgroundColor: theme.success},
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Add from API  </Text> 
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
    borderLeftColor: "#60A5FA", 
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

  textTitleSubHead: {
    textAlign: 'center',
    fontSize: 20,
  
    
  },

  buttonDelete: {
    paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",


  },

  textButtonDelete: {
      textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textHeader: {
      textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textError: {
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

  }




})