import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Alert, Modal, ScrollView, Image} from 'react-native';
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
  studentNo: number;
  section: string;
  course: string;
  religion: string;
  isActive: boolean;
  contact: {
    phone: number;
    email: string;
  };
  adddress: {
    barangay: string;
    city: string;
    zipcode: number;
  };
  image?: any;
};

export default function FindTask1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalStudents : Student[] = ([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    studentNo: 2021001,
    section: "BSIT-4A",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    isActive: true,
    contact: {
      phone: 639694828850,
      email: "kurtmarquez238@gmail.com",
    },
    adddress: {
      barangay: "Barangay 33",
      city: "Caloocan City",
      zipcode: 1410,
    },
    image: require('../..//../Images/Kurt.jpg'),
  },
  {
    id: 2,
    name: "Alyssa Mae Cruz",
    studentNo: 2021002,
    section: "BSIT-4A",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    isActive: true,
    contact: {
      phone: 639175432210,
      email: "alyssa.cruz@email.com",
    },
    adddress: {
      barangay: "Barangay 12",
      city: "Quezon City",
      zipcode: 1105,
    },
    image: require('../..//../Images/women1.jpg'),
  },
  {
    id: 3,
    name: "John Michael Reyes",
    studentNo: 2021003,
    section: "BSIT-4B",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    isActive: false,
    contact: {
      phone: 639287654321,
      email: "john.reyes@email.com",
    },
    adddress: {
      barangay: "Barangay 7",
      city: "Manila",
      zipcode: 1004,
    },
    image: require('../..//../Images/men1.jpg'),
  },
  {
    id: 4,
    name: "Sophia Anne Dela Rosa",
    studentNo: 2021004,
    section: "BSIT-4B",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    isActive: true,
    contact: {
      phone: 639456789123,
      email: "sophia.delarosa@email.com",
    },
    adddress: {
      barangay: "Barangay 19",
      city: "Makati City",
      zipcode: 1203,
    },
    image: require('../..//../Images/women2.jpg'),
  },
  {
    id: 5,
    name: "Daniel Joseph Santos",
    studentNo: 2021005,
    section: "BSIT-4C",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    isActive: true,
    contact: {
      phone: 639334455667,
      email: "daniel.santos@email.com",
    },
    adddress: {
      barangay: "Barangay 5",
      city: "Pasig City",
      zipcode: 1600,
    },
    image: require('../..//../Images/men3.jpg'),
  },
  {
    id: 6,
    name: "Mark Anthony Villanueva",
    studentNo: 2021006,
    section: "BSIT-4C",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    isActive: false,
    contact: {
      phone: 639998877665,
      email: "mark.villanueva@email.com",
    },
    adddress: {
      barangay: "Barangay 22",
      city: "Taguig City",
      zipcode: 1630,
    },
    image: require('../..//../Images/men4.jpg'),
  },
  {
    id: 7,
    name: "Christine Joy Mendoza",
    studentNo: 2021007,
    section: "BSIT-4D",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    isActive: true,
    contact: {
      phone: 639111222333,
      email: "christine.mendoza@email.com",
    },
    adddress: {
      barangay: "Barangay 14",
      city: "Marikina City",
      zipcode: 1800,
    },
    image: require('../..//../Images/woemn3.jpg'),
  },
  {
    id: 8,
    name: "Nathaniel James Aquino",
    studentNo: 2021008,
    section: "BSIT-4D",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    isActive: true,
    contact: {
      phone: 639222333444,
      email: "nathaniel.aquino@email.com",
    },
    adddress: {
      barangay: "Barangay 8",
      city: "Valenzuela City",
      zipcode: 1440,
    },
    image: require('../..//../Images/men4.jpg'),
  },
  {
    id: 9,
    name: "Angela Marie Flores",
    studentNo: 2021009,
    section: "BSIT-4E",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    isActive: false,
    contact: {
      phone: 639555666777,
      email: "angela.flores@email.com",
    },
    adddress: {
      barangay: "Barangay 3",
      city: "San Juan City",
      zipcode: 1500,
    },
    image: require('../..//../Images/women4.jpg'),
  },
  {
    id: 10,
    name: "Ryan Paul Bautista",
    studentNo: 2021010,
    section: "BSIT-4E",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    isActive: true,
    contact: {
      phone: 639888777666,
      email: "ryan.bautista@email.com",
    },
    adddress: {
      barangay: "Barangay 11",
      city: "Mandaluyong City",
      zipcode: 1550,
    },
    image: require('../..//../Images/men5.jpg'),
  },
  ]);

  const [students, setStudents] = useState<Student[]>(originalStudents);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const viewStudentDetails = (id: number) => {
    const findStudent = students.find(s => s.id === id);

    if (!findStudent) {
      Alert.alert("No Student Found!");
      return;
    }
      setSelectedStudent(findStudent);
      setModalVisible(true);
  };

  const toggleStudentStatus = (id: number) => {
    const find = students.findIndex(s => s.id === id);

    if (find === -1) {
      Alert.alert("No Student found");
      return;
    }
      setStudents(prev =>
        prev.map(s => s.id === id ? 
          {...s, isActive: !s.isActive} : s 
        )
    );
  };

  const deleteInactive = () => {
    const find = students.find(s => s.isActive === false)

    if (!find) {
      Alert.alert(`No inactive students!`);
      return;
    }
    setStudents(prev =>
      prev.filter(s => s.isActive === true)
    )
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

            <View style = {[styles.containerCard, {backgroundColor: theme.inputBackground}]}>
              {students.map((s, index) => (
                <Pressable key={s.id} 
                onPress={() => {
                  viewStudentDetails(s.id)
                }}
                style={[styles.card, {backgroundColor: theme.inputBackground}]}>
                  <Text style = {[styles.textDetailsTitle, {color: theme.textPrimary}]}> Click to see more Info </Text>
                  <Text style = {[styles.textDetailsOutput, {color: theme.textPrimary}]}> {index + 1}. {s.name} </Text>
                  <Text style = {[styles.textDetailsOutput, {color: theme.textPrimary}]}> Section: {s.section} </Text>
                  <Text style = {[styles.textDetailsOutput, {color: theme.textPrimary}]}> Active Status:  {s.isActive ? "ACTIVE" : "NOT ACTIVE"} </Text>
                  <Pressable
                    onPress={() => toggleStudentStatus(s.id)}
                    onLongPress={() => alert("Long pressed")}
                    delayLongPress={400}
                    android_ripple={{ color: "#4818e5ff" }}
                    hitSlop={10}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                    styles.buttonToggleStatus,
                    pressed && {opacity: 0.1 }]}>
                      
                        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Toggle Status </Text>
                    
                    </Pressable>
                </Pressable>
              ))}
            </View>

            <Modal visible={modalVisible}
            animationType='slide'
            onRequestClose={() => setModalVisible(false)}
            hardwareAccelerated={true}
            statusBarTranslucent={true}>
              <ScrollView
              contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              decelerationRate="normal"
              nestedScrollEnabled={true}
              overScrollMode="always"
              scrollEventThrottle={16}
              onScrollBeginDrag={() => console.log("Scrolling...")}>
                
                <View style = {[styles.modalContainer, {backgroundColor: theme.accent}]}>
                  {selectedStudent && (
                    <Pressable onPress={() => console.log(`You pressed ${selectedStudent.name}`)}
                    style={[styles.modalCard, {backgroundColor: theme.accent}]}>

                      {/* Image and Details Head Container */}
                      <View style = {[styles.imageandHeadContainer, {backgroundColor: theme.accent}]}>
                        {selectedStudent.image && (
                          <Image source={selectedStudent.image} style = {[styles.imageModalOutput]}/>
                        )}
                        {/* Container for text Head */}
                        <View style = {[styles.textHeadContainer, {backgroundColor: theme.accent}]}>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Name: {selectedStudent.name} </Text>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Student No: {selectedStudent.studentNo} </Text>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Section: {selectedStudent.section} </Text>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Course: {selectedStudent.course} </Text>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Religion: {selectedStudent.religion} </Text>
                          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Active Status: {selectedStudent.isActive ? "ACTIVE" : "NOT ACTIVE"} </Text>
                        </View>
                        {/* Container for text Head */}
                      </View>
                      {/* Image and Details Head Container */}
                      
                      <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                      <Text style = {[styles.textSubHeadTitle, {color: theme.textPrimary}]}> Contact Information </Text>
                      <Text style = {[styles.textSubHeadOutput, {color: theme.textPrimary}]}> Phone Number: {selectedStudent.contact.phone} </Text>
                      <Text style = {[styles.textSubHeadOutput, {color: theme.textPrimary}]}> Email: {selectedStudent.contact.email} </Text>
                      <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                      
                      <Text style = {[styles.textSubHeadTitle, {color: theme.textPrimary}]}> Address Information </Text>
                      <Text style = {[styles.textSubHeadOutput, {color: theme.textPrimary}]}> Barangay: {selectedStudent.adddress.barangay} </Text>
                      <Text style = {[styles.textSubHeadOutput, {color: theme.textPrimary}]}> City: {selectedStudent.adddress.city} </Text>
                      <Text style = {[styles.textSubHeadOutput, {color: theme.textPrimary}]}> Zipcode: {selectedStudent.adddress.zipcode} </Text>
                    </Pressable>
                  )}

                </View>
                <Pressable
                onPress={() => setModalVisible(false)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonModalClose,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Close </Text>
                </Pressable>
              </ScrollView>
               
            </Modal>

            <Pressable
            onPress={deleteInactive}
            onLongPress={() => alert("Long pressed")}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            styles.buttonInactive,
            pressed && {opacity: 0.1 }]}>
              <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Delete Inactive Students </Text>
            </Pressable>
          
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  containerCard: {
    borderRadius: 20,
    gap: 10

  },

  card: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    textAlign: 'left',
    fontSize: 14,
    fontStyle: 'italic'

  },



  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  modalContainer: {
    borderRadius: 20



  },

  modalCard: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",

  },

  imageandHeadContainer: {
    flexDirection: 'row',
    gap: 10

  },

  imageModalOutput: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: 'center',

  },

  textHeadContainer: {
    flex: 1,
    justifyContent: 'center'

  },

  textOutput: {
    textAlign: 'left',
    fontSize: 14,
    fontStyle: 'italic'
    

  },

  divider: {
    paddingVertical: 2,
    height: 3,

  },

  textSubHeadTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  textSubHeadOutput: {
    textAlign: 'left',
    fontSize: 14,

  },

  buttonModalClose: {
    marginTop: 20,
    backgroundColor: "#edbc09ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center'
  },

  buttonToggleStatus: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center'
  },

  buttonInactive: {
    marginTop: 10,
    backgroundColor: "#f55e0dff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center'
  }






})