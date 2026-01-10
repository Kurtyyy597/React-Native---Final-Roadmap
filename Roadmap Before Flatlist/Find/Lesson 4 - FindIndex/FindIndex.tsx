import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Animated,  Pressable, ScrollView, Modal} from 'react-native';
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

export default function FindIndex() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const scrollRef = useRef<ScrollView>(null);
  const detailsY = useRef<number>(0);

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
    {
    id: 6,
    name: "Mark Anthony Villanueva",
    age: 24,
    studentNo: 2021006,
    section: "BSIT-4C",
    course: "Bachelor of Science in Information Technology",
    },
    {
    id: 7,
    name: "Christine Joy Mendoza",
    age: 20,
    studentNo: 2021007,
    section: "BSIT-4D",
    course: "Bachelor of Science in Information Technology",
    },
    {
    id: 8,
    name: "Nathaniel James Aquino",
    age: 22,
    studentNo: 2021008,
    section: "BSIT-4D",
    course: "Bachelor of Science in Information Technology",
    },
    {
    id: 9,
    name: "Angela Marie Flores",
    age: 21,
    studentNo: 2021009,
    section: "BSIT-4E",
    course: "Bachelor of Science in Information Technology",
    },
    {
    id: 10,
    name: "Ryan Paul Bautista",
    age: 23,
    studentNo: 2021010,
    section: "BSIT-4E",
    course: "Bachelor of Science in Information Technology",
    },
  ]);

  const [students, setStudents] = useState<Student[]>(originalStudents);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const viewInfoStudent = (id: number) => {
    const findStudent = students.find(s => s.id === id);

    if (!findStudent) {
      Alert.alert("Student not found");
      return;
    }
    setSelectedStudent(findStudent);
    setModalVisible(true)
    console.log(`You selected ${findStudent.name}`);
  };

  const closeDetails = () => {
    setSelectedStudent(null);
    setModalVisible(false);
  }


  const updateAgeandName = (id: number) => {
  

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      Alert.alert(`Student not found!`);
      return;
    }

    setStudents(prev => {
      const copy = [...prev]

      copy[index] = {
        ...copy[index],
        name: "New Name",
        age: copy[index].age + 1
      };
      return copy
    });
  };

  const deleteStudent = (id: number) => {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      Alert.alert(`Student not found`);
      return;
    } else {
      Alert.alert(
        "Confirmation",
        `Are you sure you want to delete this student?`,
        [
          {text: "Cancel", style: 'cancel'},
          {
            text: "Confirm", style: 'destructive',
            onPress: () => {
              setStudents(prev =>
                prev.filter(s => s.id !== id)
              );
              Alert.alert(`Student deleted!`)
            
            }
          }
        ]
      )
    }
};




return (
  <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
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
        
        <View style = {[styles.containerCard, {backgroundColor: theme.accent}]}>
          {students.map(({id, name, age}, index) => (
            <Pressable key={id}
            onPress={() => viewInfoStudent(id)}
            style={[styles.card, {backgroundColor: theme.accent}]}>
              <Text style = {[styles.textDetailsTitle, {color: theme.textPrimary}]}> Click to see more details </Text>
              <Text style = {[styles.textDetailsSection, {color: theme.textPrimary}]}> {index + 1}. {name} - {age} </Text>
                <Pressable
                onPress={() =>updateAgeandName(id)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonUpdate,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Update </Text>
                </Pressable>

                <Pressable
                onPress={() =>deleteStudent(id)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonDelete,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Delete  </Text>
                </Pressable>

            </Pressable>
          ))}
        </View>

        <Modal visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        hardwareAccelerated={true}
        statusBarTranslucent={true}>
           <ScrollView
          contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          decelerationRate="normal"
          nestedScrollEnabled={true}
          overScrollMode="always"
          scrollEventThrottle={16}
          onScrollBeginDrag={() => console.log("Scrolling...")}>
            
            <View style = {[styles.modalContainer, {backgroundColor: theme.background}]}>
              <View style = {[styles.modalCard, {backgroundColor: theme.inputBackground}]}>
                {selectedStudent && (
                  <View style = {[styles.outputContainer, {backgroundColor: theme.inputBackground}]}>
                    <Text style = {[styles.textOutputTitle, {color: theme.textPrimary}]}> ${selectedStudent.name} Full Information </Text>
                    <View style = {[styles.divider, {backgroundColor: theme.inputBackground}]}/>
                    <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> Name: {selectedStudent.name} </Text>
                    <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> Student No: {selectedStudent.studentNo} </Text>
                    <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> Age: {selectedStudent.age} </Text>
                    <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> Section: {selectedStudent.section} </Text>
                    <Text style = {[styles.textOutputSection, {color: theme.textPrimary}]}> Course: {selectedStudent.course} </Text>
                    <Pressable
                    onPress={closeDetails}
                    onLongPress={() => alert("Long pressed")}
                    delayLongPress={400}
                    android_ripple={{ color: "#4818e5ff" }}
                    hitSlop={10}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                    styles.buttonClose,
                    pressed && {opacity: 0.1 }]}>
                      <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Close  </Text>
                    </Pressable>
                      </View>
                )}
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerCard: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
    

  },

  card: {
  
  width: "48%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 20,
  gap: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",


  },

  textDetailsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  textDetailsSection: {
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: 14

  },

  buttonUpdate: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#FACC15",

  },

  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#F87171",

  },

  modalContainer: {
    width: '100%',
    
  

  },

  modalCard: {
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
    gap: 10

  },

  textOutputTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  divider: {
    height: 1,
    width: "100%",
    marginVertical: 14,

  },

  textOutputSection: {
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: 14

  },

  buttonClose: {
     paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#F87171",

  }


})