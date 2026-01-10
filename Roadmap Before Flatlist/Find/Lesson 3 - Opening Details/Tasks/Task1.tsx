import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, findNodeHandle, Alert, ScrollView} from 'react-native';
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
  studentNo: number;
  section: string;
  course: string;
};

export default function FindOpeningTask1() {
  const scrollRef = useRef<ScrollView>(null);
  const detailsY = useRef<number>(0);
   const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudents : Student[] = ([
      {
      id: 1,
      name: "Kurt Allen Marquez",
      age: 21,
      studentNo: 2021001,
      section: "BSIT-4A",
      course: "Bachelor of Science in Information Technology",
    },
    {
      id: 2,
      name: "Alyssa Mae Cruz",
      age: 20,
      studentNo: 2021002,
      section: "BSIT-4A",
      course: "Bachelor of Science in Information Technology",
    },
    {
      id: 3,
      name: "John Michael Reyes",
      age: 22,
      studentNo: 2021003,
      section: "BSIT-4B",
      course: "Bachelor of Science in Information Technology",
    },
    {
      id: 4,
      name: "Sophia Anne Dela Rosa",
      age: 21,
      studentNo: 2021004,
      section: "BSIT-4B",
      course: "Bachelor of Science in Information Technology",
    },
    {
      id: 5,
      name: "Daniel Joseph Santos",
      age: 23,
      studentNo: 2021005,
      section: "BSIT-4C",
      course: "Bachelor of Science in Information Technology",
    },
    ]);
  
    const [students, setStudents] = useState<Student[]>(originalStudents);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const selectStudent = (id: number) => {
      const foundStudent = students.find(s => s.id === id);

      if (!foundStudent) {
        Alert.alert("student not found");
        return
      }
      setSelectedStudent(foundStudent);
    };

    const closeDetail = () => {
      setSelectedStudent(null);
    };

useEffect(() => {
  if (!selectedStudent) return;

  requestAnimationFrame(() => {
    scrollRef.current?.scrollTo({
      y: detailsY.current,
      animated: true,
    });
  });
}, [selectedStudent]);

    return (
      <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ padding: 20 }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>
        
      

        <View style = {[styles.card, {backgroundColor: theme.accent}]}>
          {students.map((s, index) =>  (
            <View key={s.id} style = {[styles.outputContainer, {backgroundColor: theme.accent}]}>
              <Text style = {[styles.textDetailsTitle, {color: theme.textPrimary}]}> Click to see more info </Text>
              <Text style = {[styles.textDetailsOutput, {color: theme.textPrimary}]}> {index + 1}. {s.name}</Text>
                <Pressable
                onPress={() => selectStudent(s.id)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.button,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButton, {color: theme.textPrimary}]}> see details </Text>
                </Pressable>
      
            </View>
          ))}
            {selectedStudent && (
          <View
          onLayout={(event) => {
            detailsY.current = event.nativeEvent.layout.y;
          }}
          style={[styles.outputContainer, { backgroundColor: theme.background }]}
        >
            <Text style = {[styles.textOutputTitle, {color: theme.accent}]}> Student Info </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {selectedStudent.name} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {selectedStudent.age} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Section: {selectedStudent.section} </Text>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Student No: {selectedStudent.studentNo} </Text>
                <Pressable
                onPress={closeDetail}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.button,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Close details </Text>
                </Pressable>
          </View>
        )}
     
        </View>

    
        </ScrollView>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    

  },

  card: {
  width: "100%",
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

  outputContainer: {
    borderRadius: 20,
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 20

  },

  textOutputTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textOutput: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left'

  },

  

  textDetailsTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight :'bold'

  },

  textDetailsOutput: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left'

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