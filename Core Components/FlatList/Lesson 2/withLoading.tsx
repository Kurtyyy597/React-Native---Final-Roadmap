import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
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
};

const ORIGINALSTUDENTS : Student[] = ([
  { id: 1, name: "Juan Dela Cruz", age: 20 },
  { id: 2, name: "Maria Santos", age: 21 },
  ]);

export default function FlatListWithLoading() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);


  const [loading, setLoading] = useState<boolean>(false);
  const [hasmore, setHasmore] = useState<boolean>(true);

  const renderStudents = ({item, index} : {item: Student, index: number}) => {
    return (
      <View style = {[styles.studentCard, {backgroundColor: theme.inputBackground}]}>
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

  const loadMore = () => {
    if (loading || !hasmore) return;

    setLoading(true);

    setTimeout(() => {
      setStudents((prev) => [
        ...prev,
        {id: prev.length + 1, name: "Nathaniel Abril", age: 25}
      ]);
      setLoading(false);

      if (students.length === 6) {
        setHasmore(false);
      }
    }, 3000);
  };

  const listFooter = () => {
    if (loading) {
      return (
        <View style = {[styles.footer, {backgroundColor: theme.background}]}>
          <ActivityIndicator size={'large'} color={'blue'}/>
          <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading More Students... </Text>
        </View>
      )
    };

    if (!hasmore) {
      return (
        <View style = {[styles.footer, {backgroundColor: theme.background}]}>
          <Text style = {[styles.textNoStudents, {color: theme.error}]}> No More Students </Text>
        </View>
      )
    };

    return null;
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudents}
      ListFooterComponent={listFooter}/>

      <Pressable
      onPress={loadMore}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1 }]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Load More Students  </Text>
      </Pressable>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  studentCard: {
    marginBottom: 10,
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
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: 'bold'

  },

  footer: {
    gap: 5

  },

  textLoading: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'

  },

  textNoStudents: {
    textAlign: 'center',
    fontSize: 14,
    

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