import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert, ScrollView, Modal} from 'react-native';
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

export default function FindOpeningDetails() {
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
  const [selectedId, setSelectedId] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const selectStudent = (id: number) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      Alert.alert("Student not found");
      return;
    }
      setSelectedId(find);
      setModalVisible(true);

  };

  const closeDetails = () => {
    setSelectedId(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
      contentContainerStyle={{ padding: 20, gap: 15 }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>

        {students.map((s, index) => (
          <Pressable key={index}
          onPress={() => selectStudent(s.id)}
          style={[styles.card, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textDetailsTitle, {color: theme.textPrimary}]}> Tap to see more details </Text>
            <Text style = {[styles.textDetailsOutput, {color: theme.textPrimary}]}> {s.name} - {s.age}  </Text>
          </Pressable>
        ))}

        <Modal visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        hardwareAccelerated={true}
        statusBarTranslucent={true}>

          <ScrollView
          contentContainerStyle={{ padding: 20 }}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          decelerationRate="normal"
          nestedScrollEnabled={true}
          overScrollMode="always"
          scrollEventThrottle={16}
          onScrollBeginDrag={() => console.log("Scrolling...")}>

            <View style = {[styles.modalContainer, {backgroundColor: theme.inputBackground}]}>
              <View style = {[styles.modalCard, {backgroundColor: theme.inputBackground}]}>
                {selectedId && (
                  <View key={selectedId.id} style = {[styles.outputContainer, {backgroundColor: theme.inputBackground}]}>
                  <Text style = {[styles.textOutputTitle, {color: theme.textPrimary}]}> Student Info </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {selectedId.name} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Age: {selectedId.age} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Section: {selectedId.section} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Course: {selectedId.course} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Student No: {selectedId.studentNo} </Text>
                  <Pressable
                  onPress={closeDetails}
                  onLongPress={() => alert("Long pressed")}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.button,
                  pressed && {opacity: 0.1 }]}>
                    <Text style = {[styles.textButton, {color: theme.error}]}> Close Details </Text>
                  </Pressable>
                  </View>
                )}
               

              </View>
            </View>
          </ScrollView>


        </Modal>
        
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15

  },

  card: {
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

  textDetailsTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textDetailsOutput: {
    fontSize: 16,
    textAlign: 'left',
    

  },

  modalContainer: {
    marginTop: 250,
    justifyContent: 'center',
    borderRadius: 20,
  },

  modalCard: {
    
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
    alignSelf: 'center'


  },

  outputContainer: {
    gap: 10

  },

  textOutputTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textOutput: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'left',


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