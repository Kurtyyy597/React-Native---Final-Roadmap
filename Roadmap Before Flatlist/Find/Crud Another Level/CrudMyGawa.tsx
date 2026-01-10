import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, ScrollView, Pressable, Image, Platform, KeyboardAvoidingView, StyleSheet, Switch, ActivityIndicator, Alert, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import *as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { findNodeHandle } from "react-native";


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

type Course =
  | "BS Information Technology (BSIT)"
  | "BS Computer Science (BSCS)"
  | "BS Information Systems (BSIS)"
  | "Software Engineering"
  | "Data Science"
  | "Cybersecurity"
  | "Game Development"
  | "Web & Mobile App Development";

type YearLevel = "1st-Year" | "2nd-Year" | "3rd-Year" | "4th-Year";
type Sex = "Male" | "Female";

const COURSE_OPTIONS: readonly Course[] = [
  "BS Information Technology (BSIT)",
  "BS Computer Science (BSCS)",
  "BS Information Systems (BSIS)",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "Game Development",
  "Web & Mobile App Development",
];

const YEAR_LEVEL_OPTIONS: readonly YearLevel[] = [
  "1st-Year",
  "2nd-Year",
  "3rd-Year",
  "4th-Year",
];

const SEX_OPTIONS: readonly Sex[] = ["Male", "Female"];

 type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: Course
  year: YearLevel
  sex: Sex
  birthday: string;
  religion: string;
  isActive?: boolean;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: number;
  };
  image?: any
};

type StudentForms = {
  name: string;
  age: string;
  section: string;
  course: Course;
  year: YearLevel;
  sex: Sex
  birthday: string;
  religion: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: string
  };
  image: any;
};

type StudentErrors = {
  name: string;
  age: string;
  sex: string;
  phone: string;
  email: string;
  zipcode: string;
  religion: string
};

type SaveMode = "add" | "edit" | null

export default function CrudGawaKo() {
const studentPositions = useRef<Record<number, number>>({});
const loadingY = useRef<number>(0);
const lastSavedIdRef = useRef<number | null>(null);
const listScrollRef = useRef<ScrollView>(null);
const studentRefs = useRef<Record<number, View | null>>({});
const loadingRef = useRef<View>(null);


const scrollRef = useRef<ScrollView>(null);  
const nameRef = useRef<View>(null);
const ageRef = useRef<View>(null);
const phoneRef = useRef<View>(null);
const emailRef = useRef<View>(null);
const zipcodeRef = useRef<View>(null);
const religionRef = useRef<View>(null);

const fieldRefs = useRef<Record<keyof StudentErrors, View | null>>({
  name: null,
  age: null,
  phone: null,
  email: null,
  zipcode: null,
  religion: null,
  sex: null,
});

const scrollToFirstError = (errors: StudentErrors): void => {
  const firstKey = Object.keys(errors).find(
    key => errors[key as keyof StudentErrors]
  ) as keyof StudentErrors | undefined;

  if (!firstKey) return;

  const targetRef = fieldRefs.current[firstKey];
  const scrollView = scrollRef.current;

  if (!targetRef || !scrollView) return;

  targetRef.measureLayout(
    scrollView.getInnerViewNode(),
    (_x: number, y: number) => {
      scrollView.scrollTo({
        y: Math.max(y - 20, 0),
        animated: true,
      });
    },
    () => {
      console.warn("measureLayout failed");
    }
  );
};

useEffect(() => {
  fieldRefs.current = {
    name: nameRef.current,
    age: ageRef.current,
    phone: phoneRef.current,
    email: emailRef.current,
    zipcode: zipcodeRef.current,
    religion: religionRef.current,
    sex: null,
  };
}, []);

  const formatBirthday = (text: string) => {
  const digits = text.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

 const formatPhoneInput = (text: string) => {
  const digits = text.replace(/\D/g, "");

  if (digits.length === 0) return "";
  if (!digits.startsWith("09")) return digits.slice(0, 11);

  return digits.slice(0, 11);
};

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Kurt Allen A. Marquez",
      age: 21,
      section: "BSIT-41",
      course: "BS Information Technology (BSIT)",
      year: "4th-Year",
      sex: "Male",
      birthday: "June 10, 2004",
      religion: "Catholic",
      contact: {
        phone: "09694828850",
        email: "kurtmarquez238@gmail.com"
      },
      address: {
        barangay: "Barangay 33",
        city: "Caloocan City",
        zipcode: 1410
      },
      image: require('../../../Images/Kurt.jpg')
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);

  const viewStudent = (id: number) => {
    const findStudent = students.find(s => s.id === id);

    if (!findStudent) {
      Alert.alert("Student not found!");
      return;
    }
    Alert.alert(
      "Confirmation",
      `View ${findStudent.name} full information?`,
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Continue", style: 'destructive',
          onPress: () => {
            setSelectedStudent(findStudent)
            setViewModalVisible(true);
          }
        }
      ]
    )
   
  };

  const toggleActiveStatus = (id: number) => {
    setStudents(prev => 
      prev.map(s => s.id === id ?
        {...s, isActive: !s.isActive} : s
      )
    )
  };

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMode, setSaveMode] = useState<SaveMode>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const startSaving = (mode: SaveMode, onFinish: () => void) => {
    setSaveMode(mode);
    setIsSaving(true);
    setSecondsLeft(3);

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSaving(false);
          setSaveMode(null);
          onFinish();
          return 0
        }
        return prev - 1
      })
    }, 1000);
  };

 useEffect(() => {
  if (!isSaving || !scrollRef.current) return;

  requestAnimationFrame(() => {
    scrollRef.current?.scrollTo({
      y: Math.max(loadingY.current - 20, 0),
      animated: true,
    });
  });
}, [isSaving]);

  const [forms, setForms] = useState<StudentForms>({
    name: "",
    age: "",
    section: "",
    course: 'BS Computer Science (BSCS)',
    year: "4th-Year",
    sex: "Male",
    birthday: "",
    religion: "",
    contact: {
      phone: "",
      email: ""
    },
    address: {
      barangay: "",
      city: "",
      zipcode: ""
    },
    image: null
  });

  const updateForm = (key: keyof StudentForms, value: string) => {
    setForms(prev => ({
      ...prev,
      [key] : value
    }))
  };
  
  const updateContact = (
    key: keyof StudentForms["contact"],
    value: string
  ) => {
    setForms(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value
      }
    }));
  };

  const updateAddress = (
    key: keyof StudentForms["address"],
    value: string
  ) => {
    setForms(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value
      }
    }));
  };

  const [errors, setErrors] = useState<StudentErrors>({
    name: "",
    age: "",
    phone: "",
    email: "",
    sex: "",
    zipcode: "",
    religion: ""
  });

  const validateErrors = (): boolean => {
  const newError: StudentErrors = {
    name: "",
    age: "",
    sex: "",
    phone: "",
    email: "",
    zipcode: "",
    religion: "",
  };

  // 🔴 REQUIRED FIELDS CHECK (optional alert)
  if (
    !forms.name.trim() ||
    !forms.section.trim() ||
    !forms.contact.email.trim() ||
    !forms.contact.phone.trim()
  ) {
    Alert.alert("Please fill in required fields!");
  }

  // 🧍 NAME
  if (forms.name.length < 4) {
    newError.name = "Name is too short!";
  } else if (/\d/.test(forms.name)) {
    newError.name = "Name must not contain numbers!";
  }

  // 🛐 RELIGION
  if (/\d/.test(forms.religion)) {
    newError.religion = "Religion must not contain numbers!";
  }

  // 🎂 AGE
  if (!/^\d{1,3}$/.test(forms.age)) {
    newError.age = "Age must be 1–3 digits only";
  } else if (Number(forms.age) <= 0 || Number(forms.age) > 99) {
    newError.age = "Age must be between 1 and 99 only!";
  }

  // ☎️ PHONE
  if (forms.contact.phone.length !== 11) {
    newError.phone = "Phone must be 11 numbers only!";
  }

  // 📧 EMAIL
  if (!forms.contact.email.trim().endsWith("@gmail.com")) {
    newError.email = "Invalid Email Format! Use (@gmail.com)";
  }

  // 🏠 ZIPCODE
  if (forms.address.zipcode.length !== 4) {
    newError.zipcode = "Zipcode must contain 4 numbers only!";
  }

  // 🔎 CHECK IF ANY ERROR EXISTS
  const hasError = Object.values(newError).some(error => error !== "");

  // 🔄 UPDATE STATE
  setErrors(newError);

  // 🎯 AUTO-SCROLL TO FIRST ERROR
  if (hasError) {
    requestAnimationFrame(() => {
      scrollToFirstError(newError);
    });
  }

  return !hasError;
};

  const clearError = (key: keyof StudentErrors) => {
  setErrors(prev => ({
    ...prev,
    [key]: "",
  }));
};

  const clearInput = () => {
    setForms({
      name: "",
      age: "",
      section: "",
      course: 'BS Computer Science (BSCS)',
      year: "1st-Year",
      sex: "Male",
      birthday: "",
      religion: "",
      contact: {
        phone: "",
        email: "",
      },
      address: {
        barangay: "",
        city: "",
        zipcode: ""
      },
      image: null
    });
  }
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const openAddModal = () => {
      clearInput();
      setEditingId(null);
      setModalVisible(true);
  };

  const closeModal = () => {
    setEditingId(null);
    clearInput();
    setModalVisible(false);
  };

  const addStudent = () => {
    if (!validateErrors()) {
      Alert.alert("Oops! Some information needs to be corrected.");
      return;
    }; 
    
   

    const newStudent : Student = {
      id: Date.now(),
      name: forms.name,
      age: Number(forms.age),
      section: forms.section,
      course: forms.course,
      year: forms.year,
      sex: forms.sex,
      birthday: forms.birthday,
      religion: forms.religion,
      isActive: true,
      contact: {
        phone: (forms.contact.phone),
        email: forms.contact.email
      },
      address: {
        barangay: forms.address.barangay,
        city: forms.address.city,
        zipcode: Number(forms.address.zipcode)
      },
      image: forms.image
    };
    Alert.alert(
      "Confirmation",
      `Add ${forms.name}?`,
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Confirm", style: "destructive",
          onPress: () => {
            lastSavedIdRef.current = newStudent.id;
            startSaving("add", () => {
              setStudents(prev => [...prev, newStudent])
              closeModal()
              clearInput()
              Alert.alert("Success!", `You successfully added ${forms.name}`)
            })
          }
        }
      ]
    )
  };

  const startEditing = (student: Student) => {
    setEditingId(student.id);
    
    setForms({
      name: student.name,
      age: String(student.age),
      section: student.section,
      course: student.course,
      year: student.year,
      sex: student.sex,
      birthday: student.birthday,
      religion: student.religion,
      contact: {
        phone: formatPhoneInput(student.contact.phone),
        email: student.contact.email
      },
      address: {
        barangay: student.address.barangay,
        city: student.address.city,
        zipcode: String(student.address.zipcode)
      },
      image: student.image
    });
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (!validateErrors()) return;
    if (editingId === null) return;

    Alert.alert(
      "Confirmation", 
      "Save Changes?",
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Confirm", style: 'destructive',
          onPress: () => {
            lastSavedIdRef.current = editingId;
            startSaving('edit', () => {
              setStudents(prev => 
                prev.map(s => 
                  s.id === editingId ?
                  {
                    ...s,
                    name: forms.name,
                    age: Number(forms.age),
                    section: forms.section,
                    course: forms.course,
                    year: forms.year,
                    sex: forms.sex,
                    birthday: formatBirthday(forms.birthday),
                    religion: forms.religion,
                    contact: {
                      phone: formatPhoneInput(forms.contact.phone),
                      email: forms.contact.email
                    },
                    address: {
                      barangay: forms.address.barangay,
                      city: forms.address.city,
                      zipcode: Number(forms.address.zipcode)
                    },
                    image: forms.image

                    
                  } : s
                )
              )
              closeModal();
              Alert.alert("Success!", "Student Information Updated")
            })
          }
        }
      ]
    )
  };

useEffect(() => {
  const id = lastSavedIdRef.current;
  if (!id) return;

  requestAnimationFrame(() => {
    const target = studentRefs.current[id];
    const scrollView = listScrollRef.current;

    if (!target || !scrollView) return;

    target.measureLayout(
      scrollView.getInnerViewNode(),
      (_x: number, y: number) => {
        scrollView.scrollTo({
          y: Math.max(y - 20, 0),
          animated: true,
        });
      },
      () => {}
    );
  });

  lastSavedIdRef.current = null;
}, [students]);

  const deleteStudent = (id: number) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      Alert.alert("Student not found");
      return;
    }
      Alert.alert(
        "Confirmation",
        `Delete ${find.name}?`,
        [
          {text: "Cancel", style: 'cancel'},
          {
            text: "Confirm", style: 'destructive',
            onPress: () => {
              setStudents(prev => prev.filter (s => s.id !== id));
              Alert.alert("Success!", `${find.name} deleted!`);
          }
        }
      ]
    )
  };



  const pickNewImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    setForms(prev => ({
      ...prev,
      image: { uri: result.assets[0].uri }
    }));
  }
};

const takeNewPhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    setForms(prev => ({
      ...prev,
      image: { uri: result.assets[0].uri }
    }));
  }
};

const isEditMode = editingId !== null;

const getLoadingText = () => {
  if (saveMode === "add") return "Adding student...";
  if (saveMode === "edit") return "Saving changes...";
  return "";
};

useEffect(() => {
  const id = lastSavedIdRef.current;
  if (!id || !listScrollRef.current) return;

  requestAnimationFrame(() => {
    const y = studentPositions.current[id];
    if (y === undefined) return;

    listScrollRef.current?.scrollTo({
      y: Math.max(y - 20, 0),
      animated: true,
    });
  });

  lastSavedIdRef.current = null;
}, [students]);




  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
        {/* Add button */}
        <Pressable
          onPress={openAddModal}
          style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}>
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
        {/* Add button */}

        {students.length === 0 && (
          <>
           <Text style = {{color: theme.error, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> Looks empty here 👀 </Text>
            <Text style = {{color: theme.error, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> Get started by adding your first student </Text>
          </>
         
        )}

        {/* Main ScrollView */}
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
            <View key={s.id} collapsable={false}   onLayout={e => {studentPositions.current[s.id] = e.nativeEvent.layout.y;}}>
            <Pressable 
            style = {[
            styles.card, 
            {backgroundColor: theme.inputBackground, borderColor: theme.error},
            s.isActive && styles.isActiveEffect  
            ]}
            onPress={() => {
              viewStudent(s.id)
              console.log(`You click ${s.name}`)
            }}>

              <Text style = {[styles.textMainTitle, {color: theme.textPrimary}]}> Click to View Full Information </Text>
              {s.image ? (
                <Image source={s.image} style = {[styles.imageDisplay]}/>
              ) : (
                <Text style = {[styles.textImageError, {color: theme.error}]}> No Image Available </Text>
              )}

              <Pressable style = {[styles.toggleActive, {backgroundColor: s.isActive ? theme.accent : theme.error}]}
              onPress={() => toggleActiveStatus(s.id)}>
                <Text style = {s.isActive ? styles.activeText: styles.inactiveText}> {s.isActive ? "ACTIVE" : "INACTIVE"} </Text>
              </Pressable>
              
              <Text style = {[styles.textDisplay, {color: theme.textPrimary}]}> {index + 1}. {s.name} </Text>
              <Text style = {[styles.textDisplay, {color: theme.textPrimary}]}> Age: {s.age} </Text>

              

              {/* Container for edit and delete Button */}
              <View style = {[styles.containerforAddandEdit, {backgroundColor: theme.inputBackground}]}> 
              <Pressable
              onPress={() => startEditing(s)}
              style={({ pressed }) => [styles.iconButtonEdit, pressed && { opacity: 0.7 }]}>
              <Feather name="edit" size={22} color="#3B82F6" />
              </Pressable>

               <Pressable
              onPress={() => deleteStudent(s.id)}
              style={({ pressed }) => [styles.iconButtonDelete, pressed && { opacity: 0.7 }]}>
              <MaterialIcons name="delete-outline" size={24} color="#ff0000ff" />
                </Pressable>
              </View>

          </Pressable>
          </View>
          ))}
        </ScrollView>
        {/* Main ScrollView */}
        
        {/* Modal for Viewing Full Information */}
        <Modal visible={viewModalVisible}
        animationType="slide"
        onRequestClose={() => setViewModalVisible(false)}
        hardwareAccelerated={true}
        statusBarTranslucent={true}>

          {/* Modal Container for Viewing Information */}
          <SafeAreaView style={styles.modalContainer}>
            
           
              
              {selectedStudent && (
                <View style = {[
                  styles.modalViewCard, 
                  {backgroundColor: theme.inputBackground, borderColor: "#EF4444", borderWidth: 10},
                  selectedStudent.isActive && styles.isActiveEffect
                  ]}>
                  <ScrollView
                  contentContainerStyle={{ padding: 10, gap: 15 }}
                  horizontal={false}
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                  decelerationRate="normal"
                  nestedScrollEnabled={true}
                  overScrollMode="always"
                  scrollEventThrottle={16}
                  onScrollBeginDrag={() => console.log("Scrolling...")}>
                  
                  <Text style = {[styles.textViewTitle, {color: theme.textPrimary}]}> Student Information </Text>

                  {/* Container for Image and Text Info Head */}
                  <View style = {[styles.containerImageandTextInfoHead, {backgroundColor: theme.inputBackground}]}>
                  {selectedStudent.image ? (
                    <Image source={selectedStudent.image} style = {[styles.imageDisplayView]}/>
                  ) : (
                    <Text style = {[styles.textImageError, {color: theme.error}]}> No Image Available </Text>
                  )}
                    {/* Container for Text Info Head */}
                    <View style = {[styles.textInfoHeadContainer, {backgroundColor: theme.inputBackground}]}>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.name} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.age} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.section} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Course: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.course} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Year: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.year} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Sex: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.sex} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Birthday: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.birthday} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Religion: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.religion} </Text> </Text>
                      </View>
                      <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                        <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Active Status: <Text style={[styles.textContent, {color: selectedStudent.isActive ? theme.textPrimary : theme.error}]}> {selectedStudent.isActive ? "Active" : "Not Active"} </Text> </Text>
                      </View>
                    </View>
                    {/* Container for Text Info Head */}
                  </View>
                  {/* Container for Image and Text Info Head */}

                  {/* Contact Information */}
                  <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                  <Text style = {[styles.textSubHeadTitle, {color: theme.textPrimary}]}> Contact Information </Text>
                  <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                    <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Phone: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.contact.phone} </Text> </Text>
                  </View>
                  <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                    <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Email: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.contact.email} </Text> </Text>
                  </View>
                  {/* Contact Information */}

                  {/* Address Information */}
                  <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                  <Text style = {[styles.textSubHeadTitle, {color: theme.textPrimary}]}> Address Information </Text>
                  <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                    <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Barangay: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.barangay} </Text> </Text>
                  </View>
                  <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                    <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> City: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.city} </Text> </Text>
                  </View>
                  <View style = {[styles.infoHeadRow, {backgroundColor: theme.inputBackground}]}> 
                    <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Zipcode: <Text style={[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.zipcode} </Text> </Text>
                  </View>
                  {/* Address Information */}
                  <Pressable
                  onPress={() => setViewModalVisible(false)}
                  onLongPress={() => alert("Long pressed")}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonCloseModal,
                  pressed && {opacity: 0.1 }]}>
                    <Text style = {[styles.textButtonCloseModal, {color: theme.textPrimary}]}> Exit </Text>
                  </Pressable>
                  </ScrollView>
                </View>
              )}
            
          </SafeAreaView>
          {/* Modal Container for Viewing Information */}
        </Modal>
        {/* Modal for Viewing Full Information */}


        {/* Modal for Adding and Edit Students */}
        <Modal visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        hardwareAccelerated={true}
        statusBarTranslucent={true}>
            
          {/* SafeareaView for Add and Edit */}
            <SafeAreaView style={{ flex: 1 }}>

            {/* KeyboardAvoidingView for ADD and Edit Student */}
             <KeyboardAvoidingView
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
              behavior={Platform.OS === "ios" ? "padding" : "height"}>
              
              {/* Modal Container */}
              <View style = {[styles.modalAddandEditContainer, {backgroundColor: theme.inputBackground}]}>
              {/* Modal Card */}
                <View style = {[styles.modalAddandEditCard, {backgroundColor: theme.inputBackground}]}>
                  {/* ScrollView for Add and Edit Student */}
                    <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                    horizontal={false}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                    decelerationRate="normal"
                    nestedScrollEnabled={true}
                    overScrollMode="always"
                    scrollEventThrottle={16}
                    onScrollBeginDrag={() => console.log("Scrolling...")}>

                      <Pressable
                      style={({ pressed }) => [styles.iconButtonEditModal, pressed && { opacity: 0.7 }]}>
                      <Text style = {[styles.textTitleInputForms, {color: theme.textPrimary}]}> {isEditMode ? "Edit Student" : "Add Student"} </Text>
                      <Feather name="edit" size={30} color="#3B82F6" />
                      </Pressable>

                      {forms.image ? (
                        <Image source={forms.image} style = {[styles.imagePreview]}/>
                      ) : (
                        <Text style = {[styles.textImageError, {color: theme.error}]}> Image not selected </Text>
                      )}

                      {/* Container for Images */}
                      <View style = {[styles.imagesRow, {backgroundColor: theme.inputBackground}]}> 
                        <Pressable onPress={takeNewPhoto} style={styles.imageBtnTake}>
                        <Ionicons name="camera-outline" size={30} color={theme.textPrimary} />
                        <Text>Take Photo</Text>
                        </Pressable>

                        <Pressable onPress={pickNewImage} style={styles.imageBtnPick}>
                        <Ionicons name="camera-outline" size={30} color={theme.textPrimary} />
                        <Text> Pick New Photo </Text>
                        </Pressable>
                      </View>

                      {/* TextInputs */ }
                      <View style = {[styles.textInputCard, {backgroundColor: theme.surface}]}> 
                      {/* Name */ }

                      <View ref={nameRef} collapsable={false}>
                      <Text style = {[styles.textRequired, {color: theme.error}]}> Name: Required* </Text>
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='type your name'
                      value={forms.name}
                      onChangeText={text => {
                        updateForm("name", text);
                        if (text.length >= 4 && !/\d/.test(text)) {
                          clearError("name");
                        }
                      }}  
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='default'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                      {errors.name && (
                        <Text style = {[styles.textError, {color: errors.name && theme.error}]}> {errors.name} </Text>
                      )}
                      </View>

                      <View  ref={ageRef} collapsable={false}>
                      {/* Age */ }
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='type your age'
                      value={forms.age}
                      onChangeText={text => {
                        updateForm("age", text);
                        const isValidAge =
                          /^\d{1,2}$/.test(text) &&
                          Number(text) > 0 &&
                          Number(text) <= 99;
                          if (isValidAge) {
                          clearError("age");
                        }
                      }}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='numeric'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                      {errors.age && (
                        <Text style = {[styles.textError, {color: errors.age && theme.error}]}> {errors.age} </Text>
                      )}
                      </View>

                      {/* Section */ }
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='type your section'
                      value={forms.section}
                      onChangeText={text => updateForm("section", text)}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='default'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>

                      {/* Birthday */ }
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='Birthday (mm/dd/yy)'
                      value={forms.birthday}
                      onChangeText={text => updateForm("birthday", formatBirthday(text))}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='numeric'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>

                      {/* Religion */ }
                      <View ref={religionRef} collapsable={false}>
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='type your religion'
                      value={forms.religion}
                      onChangeText={text => updateForm("religion", text)}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='default'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                       {errors.religion && (
                        <Text style = {[styles.textError, {color: errors.religion && theme.error}]}> {errors.religion} </Text>
                      )}
                      </View>

                      <View  ref={phoneRef} collapsable={false}> 
                      {/* Phone */ }
                      <Text style = {[styles.textRequired, {color: theme.error}]}> Phone: Required* </Text>
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='Phone (09)'
                      value={forms.contact.phone}
                      onChangeText={text => {
                        const formatted = formatPhoneInput(text);
                        updateContact("phone", formatted);
                      if (formatted.length === 11) {
                          clearError("phone");
                        }
                      }}                
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='number-pad'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                       {errors.phone && (
                        <Text style = {[styles.textError, {color: errors.phone && theme.error}]}> {errors.phone} </Text>
                      )}
                      </View>
                      
                      <View  ref={emailRef} collapsable={false}>
                      {/* Email */ }
                      <Text style = {[styles.textRequired, {color: theme.error}]}> Email: Required* </Text>
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='Email format: (@gmail.com)'
                      value={forms.contact.email}
                      onChangeText={text => {
                        updateContact("email", text);
                        if (text.endsWith("@gmail.com")) {
                          clearError("email");
                        }
                      }}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='email-address'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                      {errors.email && (
                        <Text style = {[styles.textError, {color: errors.email && theme.error}]}> {errors.email} </Text>
                      )}
                      </View>

                      {/* Barangay */ }
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='Barangay'
                      value={forms.address.barangay}
                      onChangeText={text => updateAddress("barangay", text)}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='default'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>

                      {/* City */ }
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='City'
                      value={forms.address.city}
                      onChangeText={text => updateAddress("city", text)}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='default'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>

                      
                      {/* Zipcode */ }
                      <View  ref={zipcodeRef} collapsable={false}>
                      <Text style = {[styles.textRequired, {color: theme.error}]}> Zipcode: Required* </Text>
                      <TextInput style = {[styles.input, {backgroundColor: theme.background, borderColor: theme.border}]}
                      placeholder='Zipcode'
                      value={forms.address.zipcode}
                      onChangeText={text => {
                        updateAddress("zipcode", text);
                        if (/^\d{4}$/.test(text)) {
                          clearError("zipcode");
                        }
                      }}
                      placeholderTextColor={theme.textPrimary}
                      keyboardType='numeric'
                      cursorColor={theme.accent}
                      onFocus={() => console.log("Focus")}
                      onBlur={() => console.log("Blur")}/>
                       {errors.zipcode && (
                        <Text style = {[styles.textError, {color: errors.zipcode && theme.error}]}> {errors.zipcode} </Text>
                      )}
                      </View>

                     

                      {/* Sex */ }
                      <Text style = {[styles.textLabelInput, {color: theme.textPrimary}]}> Sex </Text>
                      <View style = {[styles.optionContainer]}>
                        {SEX_OPTIONS.map(sex=> (
                          <Pressable
                          key={sex}
                          onPress={() => updateForm('sex', sex)}
                          style= {[styles.buttonOption, forms.sex === sex && styles.optionSelected]}>
                            <Text style = {[styles.textOption, forms.sex === sex && styles.textOptionSelected]}>
                              {sex}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                      {/* Sex */ }

                      {/* Course */ }
                      <Text style = {[styles.textLabelInput, {color: theme.textPrimary}]}> Choose Course </Text>
                      <View style = {[styles.optionContainer]}>
                        {COURSE_OPTIONS.map(course => (
                          <Pressable
                          key={course}
                          onPress={() => updateForm('course', course)}
                          style= {[styles.buttonOption, forms.course === course && styles.optionSelected]}>
                            <Text style = {[styles.textOption, forms.course === course && styles.textOptionSelected]}>
                              {course}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                      {/* Course */ }

                      {/* Year Level */ }
                      <Text style = {[styles.textLabelInput, {color: theme.textPrimary}]}> Year Level </Text>
                      <View style = {[styles.optionContainer]}>
                        {YEAR_LEVEL_OPTIONS.map(year => (
                          <Pressable
                          key={year}
                          onPress={() => updateForm('year', year)}
                          style= {[styles.buttonOption, forms.year === year && styles.optionSelected]}>
                            <Text style = {[styles.textOption, forms.year === year && styles.textOptionSelected]}>
                              {year}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                      {/* Year Level */ }
                      

                        <Pressable
                        onPress={isEditMode ? saveEdit : addStudent}
                        onLongPress={() => alert("Long pressed")}
                        delayLongPress={400}
                        android_ripple={{ color: "#4818e5ff" }}
                        hitSlop={10}
                        accessibilityRole="button"
                        style={({ pressed }) => [
                        styles.submitButton,
                        pressed && {opacity: 0.1 }]}>
                          <Text style = {[styles.textSubmit, {color: isEditMode ? theme.inputBackground : theme.textPrimary }]}> {isEditMode ? "Save Changes" : "Add Student"} </Text>
                        </Pressable>

                        
                        <Pressable
                        onPress={() => setModalVisible(false)}
                        onLongPress={() => alert("Long pressed")}
                        delayLongPress={400}
                        android_ripple={{ color: "#4818e5ff" }}
                        hitSlop={10}
                        accessibilityRole="button"
                        style={({ pressed }) => [
                        styles.buttonCloseModal,
                        pressed && {opacity: 0.1 }]}>
                          <Text style = {[styles.textButtonCloseModal, {color: isEditMode ? theme.inputBackground : theme.textPrimary }]}> Close </Text>
                        </Pressable>

                        {isSaving && (
                          <View onLayout={e => {loadingY.current = e.nativeEvent.layout.y;}} 
                          collapsable={false} style = {[styles.loadingContainer]}>
                            <ActivityIndicator size={'large'} color={theme.accent} animating={true}/>
                            <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> 
                              {getLoadingText()} {secondsLeft}s
                            </Text>
                          </View>
                        )}
                      
                    </View>


                  </ScrollView>
                </View>
                {/* Modal Card */}
              </View>
              {/* Modal Container */}
            </KeyboardAvoidingView>
            {/* KeyboardAvoidingView for ADD and Edit Student */}
            </SafeAreaView>
          {/* SafeareaView for Add and Edit */}
        </Modal>
        {/* Modal for Adding and Edit Students */}
        
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },

  iconButton: {
  margin: 20, 
  width: 60, 
  height: 60,
  borderRadius: 28, 
  backgroundColor: "#3B82F6", 
  justifyContent: 'center', 
  alignItems: 'center', 
  elevation: 6 


  },

  card: {
  width: "100%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  shadowOpacity: 0.12,
  shadowRadius: 8,
  alignSelf: "center",
  borderColor: "#EF4444" ,
  shadowColor: "#EF4444" , 
  borderWidth: 10,
  

  },

  textMainTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18

  },

  imageDisplay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },

  textImageError: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  textDisplay: {
    textAlign: 'left',
    fontSize: 14,
    fontStyle: 'italic'

  },

  containerforAddandEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonEdit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FACC15",
    borderRadius: 50,

  },

  textButtonEdit: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F87171",
    borderRadius: 50,
    
  },

  textButtonDelete: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },

  iconButtonEdit: {
   backgroundColor: "#FACC15",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  iconButtonEditModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  iconButtonDelete: {
    backgroundColor: "#F87171",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    margin: 10
    

  },

  modalViewCard: {
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

  textViewTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  containerImageandTextInfoHead: {
    flexDirection: 'row',
    gap: 5

  },

  imageDisplayView: {
    width: 100,
    height: 100,
    borderRadius: 20,
    right: 10


  },

  textInfoHeadContainer: {
    flex: 1,
    gap: 7

  },

  infoHeadRow: {
    flexDirection: 'row',
    alignItems: 'flex-start'
   
   

  },

  textLabel: {
    fontSize: 12,


  },

  textContent: {
    fontSize: 14,
    fontWeight: '600',
  
  },

  divider: {
    paddingVertical: 0,
    height: 1
  },

  textSubHeadTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },

  buttonCloseModal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FACC15",
    borderRadius: 50,
    alignSelf: 'center'
  },

  textButtonCloseModal: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },

  modalAddandEditContainer: {
    flex: 1,
    borderRadius: 10,
  

  },

  modalAddandEditCard: {
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

  textTitleInputForms: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  imagePreview: {
    height: 150,
    width: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10
  },

  imagesRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  imageBtnTake: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FACC15",
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center'
  },

  imageBtnPick: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FACC15",
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center'

  },
  
  textInputCard: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",
  },

  input: {
    fontWeight: 'bold',
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F9FAFB", // soft gray
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  textLabelInput: {
    fontWeight: 'bold',
    fontSize: 14,

  },

  optionContainer: {
    alignItems: 'baseline',
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
    
  },

  buttonOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 20 

  },

  optionSelected: {
    backgroundColor: "#3B82F6", 

  },

  textOption: {
    fontSize: 14,
    

  },

  textOptionSelected: {
    fontWeight: 'bold',
    color: "#FFFFFF", 
  },

  textError: {
    textAlign: 'left',
    fontSize: 12,
  
  },

  textRequired: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#22C55E",
    borderRadius: 20,
    alignSelf: 'center' 

  },

  textSubmit: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  loadingContainer: {
  marginTop: 10,
  },

  textLoading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },

  isActiveEffect: {
    borderWidth: 10,
    borderColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4

  },

  toggleActive: {
    borderRadius: 30,
   
  },

  activeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',


  },

  inactiveText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic'

  }







})

