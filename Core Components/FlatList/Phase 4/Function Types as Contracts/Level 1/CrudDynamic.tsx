import React, {useState} from 'react';
import {View, Text, Pressable, KeyboardAvoidingView, TextInput, StyleSheet, Platform, ScrollView, ActivityIndicator, FlatList, Alert, Image, Modal, ListRenderItem} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import *as ImagePicker from 'expo-image-picker';

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

type LoadingMode = "ADD" | "EDIT" | null;

type LoadingState = {
  mode: LoadingMode;
  secondsLeft: number
}

type StartloadingFn = (mode: LoadingMode) => void

type Section = "BSIT-41" | "BSIT-42" | "BSIT-43"
type Course = 
| "Computer Science"
| "Information Technology"
| "Business Administration"
| "Engineering"
| "Nursing"


type Student = {
  id: number;
  name: string;
  age: number;
  section: Section;
  course: Course
  isActive: boolean;
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

const ORIGINALSTUDENTS : Student[] = ([
  {
    id: 1,
    name: "Kurt Allen A. Marquez",
    age: 21,
    section: "BSIT-41",
    course: "Information Technology",
    isActive: true,
    contact: {
      phone: "09694828850",
      email: "kurtmarquez238@gmail.com"
    },
    address: {
      barangay: "Barangay-33",
      city: "Caloocan City",
      zipcode: 1410
    },
    image: require('../../../../Images/Kurt.jpg')
  }
])

type StudentForm = {
  name: string;
  age: string;
  section: Section;
  course: Course;
  isActive: boolean;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: string;
  };
  image: any;
};

type ValidateErrors = {
  name?: string
  phone?: string;
  email?: string;
  zipcode?: string;
};

type StudentAction = 
| {type: "START_ADD"}

| {type: "START_EDIT"; payload: {student: Student}}

| {type: "UPDATE_NAME"; payload: string}
| {type: "UPDATE_AGE"; payload: string}
| {type: "UPDATE_SECTION"; payload: Section}
| {type: "UPDATE_COURSE"; payload: Course}
| {type: "UPDATE_PHONE"; payload: string}
| {type: "UPDATE_EMAIL"; payload: string}
| {type: "UPDATE_BARANGAY"; payload: string}
| {type: "UPDATE_CITY"; payload: string}
| {type: "UPDATE_ZIPCODE"; payload: string}
| {type: "UPDATE_IMAGE"; payload: any}

| {type: "SUBMIT_FORM";}
| {type: "CANCEL_FORM"}
| {type: "DELETE_STUDENT"; payload: {id: number}}
| {type: "TOGGLE_STUDENT"; payload: {id: number}}
| {type: "SELECT_STUDENT"; payload: {id: number}}

type StudentItemProps = {
  student: Student;
  onAction: (action: StudentAction) => void;
  isSelected: boolean;
  theme: Theme
};

const COURSE_OPTION : readonly Course[] = [
  "Business Administration",
  "Computer Science",
  "Engineering",
  "Information Technology",
  "Nursing"
];

const SECTION_OPTION : readonly Section[] = [
  "BSIT-41",
  "BSIT-42",
  "BSIT-43"
]


const StudentItem = ({student, onAction, isSelected, theme} : StudentItemProps) => {
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
      pressed && styles.selectedStudent,
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitleCard, {color: theme.textPrimary}]}> {student.name} Profile </Text>
        {student.image && (
          <Image source={student.image} style = {styles.imageOutput}/>
        )}
        <Pressable
          onPress={() => onAction({type: "TOGGLE_STUDENT", payload: {id: student.id}})}
          onLongPress={() => alert(`Youre enjoying toggling students huh`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonToggle, {backgroundColor: student.isActive ? theme.success : theme.error},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButton, {color: student.isActive ? theme.textPrimary : theme.inputBackground}]}> {student.isActive ? "Deactiviate" : "Activate"} </Text> 
          </Pressable>
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
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.section} </Text>
        </View>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Course: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.course} </Text>
        </View>

        <View style = {[styles.infoRowActive, {backgroundColor: theme.inputBackground}]}>
          <Text style = {student.isActive ? styles.textActive : styles.textInactive}> {student.isActive ? "Active" : "Inactive"} </Text>
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
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <Text style = {[styles.textTitleFooter, {color: theme.textPrimary}]}> Address Information </Text>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Barangay: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.address.barangay} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> City: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.address.city} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Zipcode: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.address.zipcode} </Text>
        </View>

        <View style = {[styles.editandDeleteContainer, {backgroundColor: theme.inputBackground}]}>
          <Pressable
          onPress={() => onAction({type: "DELETE_STUDENT", payload: {id: student.id}})}
          onLongPress={() => alert(`Long pressed: Hi baby`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonDelete, {backgroundColor: theme.error},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonDelete, {color: theme.error}]}> 🗑️ </Text> 
          </Pressable>
          <Pressable
          onPress={() => onAction({type: "START_EDIT", payload: {student: student}})}
          onLongPress={() => alert(`Long pressed: Hi baby`)}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonEdit, {backgroundColor: theme.success},
          pressed && {opacity: 0.1},]}>
            <Text style = {[styles.textButtonEdit, {color: theme.accent}]}> ✏️ </Text> 
          </Pressable>
        </View>
    </Pressable>
  )
};

export default function FunctionTypesWithCrudDynamic() {
  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const [loading, setLoading] = useState<LoadingState>({
    mode: null,
    secondsLeft: 0
  });

  const startLoading : StartloadingFn = (mode) => {
    setLoading({
      mode,
      secondsLeft: 3
    });

    const interval = setInterval(() => {
    setLoading(prev => {
      if (prev.secondsLeft <= 1) {
        clearInterval(interval);
        return { mode: null, secondsLeft: 0 };
      }
      return {
        ...prev,
        secondsLeft: prev.secondsLeft - 1
      };
    });
  }, 1000);
}

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const emptyForm : StudentForm = {
    name: "",
    age: "",
    section: "BSIT-41",
    course: "Information Technology",
    isActive: true,
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
  };



  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<ValidateErrors>({});

  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const validateErrors = (form: StudentForm): boolean => {
  let isValid = true;

  const newError: ValidateErrors = {
    name: "",
    phone: "",
    email: "",
  };

  if (!form.name.trim()) {
    isValid = false;
    newError.name = "Name is required";
  } else if (form.name.length < 4) {
    isValid = false;
    newError.name = "Name is too short!";
  }

  if (!form.contact.phone.trim()) {
    isValid = false;
    newError.phone = "Phone is required";
  } else if (form.contact.phone.length !== 11) {
    isValid = false;
    newError.phone = "Phone must be 11 digits";
  }

  if (!form.contact.email.trim()) {
    isValid = false;
    newError.email = "Email is required";
  } else if (!form.contact.email.includes("@gmail.com")) {
    isValid = false;
    newError.email = "Use @gmail.com";
  }

  setError(newError);
  return isValid;
  };

  const handleUserAction = (action: StudentAction) => {
    switch (action.type) {
      case "TOGGLE_STUDENT" : {
        setStudents(prev =>
          prev.map(s => s.id === action.payload.id ?
            {
              ...s,
              isActive: !s.isActive 
            } : s 
          )
        )
        break;
      }
      case "SELECT_STUDENT" : {
        setSelectedId(prev => 
        (prev === action.payload.id ? null : action.payload.id)
        )
        break;
      };
      case "START_ADD" : {
        setError({});
        setModalVisible(true)
        setEditingId(null);
        setForm(emptyForm);
        break;
      }
      case "START_EDIT" : {
        setError({})
        setForm({
          name: action.payload.student.name,
          age: String(action.payload.student.age),
          section: action.payload.student.section,
          course: action.payload.student.course,
          isActive: action.payload.student.isActive,
          contact: {
            phone: action.payload.student.contact.phone,
            email: action.payload.student.contact.email
          },
          address: {
            barangay: action.payload.student.address.barangay,
            city: action.payload.student.address.city,
            zipcode: String(action.payload.student.address.zipcode)
          },
          image: action.payload.student.image
        })
        setEditingId(action.payload.student.id);
        setModalVisible(true);
        break;
      }
      case "UPDATE_NAME" : {
        setForm(prev => ({...prev, name: action.payload}))
        break;
      }
      case "UPDATE_AGE": {
        setForm(prev => ({...prev, age: action.payload}))
        break;
      }
      case "UPDATE_SECTION" : {
        setForm(prev => ({...prev, section: action.payload}));
        break;
      }
      case "UPDATE_COURSE" : {
        setForm(prev => ({...prev, course: action.payload}));
        break;
      }
      case "UPDATE_PHONE": {
        setForm(prev => ({...prev, contact: {...prev.contact, phone: action.payload}}));
        break;
      }
      case "UPDATE_EMAIL" : {
        setForm(prev => ({...prev, contact: {...prev.contact, email: action.payload}}));
        break;
      }
      case "UPDATE_BARANGAY" : {
        setForm(prev => ({...prev, address: {...prev.address, barangay: action.payload}}));
        break;
      }
      case "UPDATE_CITY" : {
        setForm(prev => ({...prev, address: {...prev.address, city: action.payload}}))
        break;
      }
      case "UPDATE_ZIPCODE" : {
        setForm(prev => ({...prev, address: {...prev.address, zipcode: action.payload}}));
        break;
      }
      case "UPDATE_IMAGE" : {
        setForm(prev => ({...prev, image: action.payload}))
        break
      }
      case "SUBMIT_FORM" : {
        if (!validateErrors(form)) return;

        if (editingId === null) {
          const newStudent : Student = {
            id: Date.now(),
            name: form.name,
            age: Number(form.age),
            section: form.section,
            course: form.course,
            isActive: true,
            contact: {
              phone: form.contact.phone,
              email: form.contact.email
            },
            address: {
              barangay: form.address.barangay,
              city: form.address.city,
              zipcode: Number(form.address.zipcode)
            },
            image: form.image
          }
          Alert.alert(
            "Confirmation",
            `Add ${newStudent.name}?`,
            [
              {text: "Cancel", style: "cancel"},
              {
                text: "Confirm", style: 'destructive',
                onPress: () => {
                  startLoading("ADD");
                  setTimeout(() => {
                    setStudents(prev => [...prev, newStudent])
                    alert("Success!")
                  }, 3000);
                }
              }
            ]
          )
        } else {
          setStudents(prev =>
            prev.map(s =>
              s.id === editingId ?
              {
                ...s,
                name: form.name,
                age: Number(form.age),
                section: form.section,
                course: form.course,
                contact: {
                  phone: form.contact.phone,
                  email: form.contact.email
                },
                address: {
                  barangay: form.address.barangay,
                  city: form.address.city,
                  zipcode: Number(form.address.zipcode)
                },
                image: form.image
              } : s
            )
          )
        }
        setForm(emptyForm);
        setModalVisible(false);
        setEditingId(null);
        break;
      }
      case "CANCEL_FORM" : {
        setModalVisible(false);
        setForm(emptyForm);
        setEditingId(null);
        break;
      }
      case "DELETE_STUDENT" : {
        const findStudent = students.find(s => s.id ===  action.payload.id);

        if (!findStudent) {
          Alert.alert("Student not found!");
          return;
        }
        Alert.alert(
          "Confirmation",
          `Delete ${findStudent.name}?`,
          [
            {text: "Cancel", style: 'cancel'},
            {
              text: "Confirm", style: "destructive",
              onPress: () => {
                setStudents(prev =>
                  prev.filter(s => s.id !== action.payload.id)
                )
                setSelectedId(null);
                Alert.alert("Success!", `${findStudent.name} deleted`)
              
              }
            }
          ]
        )
        break;
      }
    } 
  };

  const renderItem : ListRenderItem<Student> = ({item}) => {
    return (
      <StudentItem
      student={item}
      onAction={handleUserAction}
      theme={theme}
      isSelected={item.id === selectedId}/>
    )
  };

  const header = () => {
    return (
      <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student Lists. </Text>
    )
  };

  const footer = () => {
    if (loading.mode === "ADD") {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Adding student... {loading.secondsLeft}s </Text>
        </>
      )
    } 
  };

  const empty = () => {
    return (
      <Text style = {[styles.textEmpty, {color: theme.textPrimary}]}> No Students Yet. Maybe its time to add more </Text>
    )
  };

  const separator = () => <View style = {[styles.separator]}/>

    const pickNewImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
    handleUserAction({
      type: "UPDATE_IMAGE",
      payload: { uri: result.assets[0].uri }
    });
    }
};
  
  const takeNewPhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
    handleUserAction({
      type: "UPDATE_IMAGE",
      payload: { uri: result.assets[0].uri }
    });
  }
};

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

       <Pressable
        onPress={() => handleUserAction({type: "START_ADD"})}
        onLongPress={() => alert(`Hi Loveyou`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonAdd, {backgroundColor: theme.accent},
        pressed && {opacity: 0.1},]}>
          <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> {editingId ? "Edit Student" : "➕"} </Text>
        </Pressable>
        
        
        <Modal visible={modalVisible} animationType='slide' onRequestClose={() => handleUserAction({type: "CANCEL_FORM"})}>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
          style={[styles.modalContainer, {backgroundColor: theme.background}]}>
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
              
              {/* Modal Card */}
              <View style = {[styles.modalCard, {backgroundColor: theme.background}]}>

                {/* TextInput Container */}
                <View style = {[styles.textInputContainer, {backgroundColor: theme.background}]}>

               

                {/* OVERALL IMAGES */ }
                {/* Image Preview */}
                {form.image && (
                  <Image source={form.image} style ={styles.imagePreview}/>
                )}
                <Text style = {[styles.textImage, {color: theme.textPrimary}]}> Preview Image </Text>
                {/* Image Preview */}

                {/* Images Container */}
                <View style = {[styles.imagesContainer, {backgroundColor: theme.background}]}>
                  <Pressable
                  onPress={pickNewImage}
                  onLongPress={() => alert(`Hi Loveyou`)}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonPickImage, 
                  pressed && {opacity: 0.1},]}>
                    <Text style = {[styles.textButtonPick, {color: theme.textPrimary}]}> Pick from gallery </Text>
                  </Pressable>

                  <Pressable
                  onPress={takeNewPhoto}
                  onLongPress={() => alert(`Hi Loveyou`)}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonTakeImage, 
                  pressed && {opacity: 0.1},]}>
                    <Text style = {[styles.textButtonTake, {color: theme.textPrimary}]}> {editingId ? "Replace Photo" : "Take Photo"} </Text>
                  </Pressable>
                </View>
                {/* Images Container */}
                {/* OVERALL IMAGES */ }

                
                {/* Name */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='type your name'
                value={form.name}
                onChangeText={text => handleUserAction({type: "UPDATE_NAME", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType='default'
                
                />
                {error.name && (
                  <Text style = {[styles.textError, {color: error.name && theme.error}]}>
                    {error.name}
                  </Text>
                )}
                {/* Name */}

                {/* Age */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='type your Age'
                value={form.age}
                onChangeText={text => handleUserAction({type: "UPDATE_AGE", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType="numeric"/>
                {/* Age */}

                {/* Section */}
                <Text style = {[styles.textLabelInput, {color: theme.textPrimary}]}> Pick Section </Text>
                <View style = {[styles.optionContainer, {backgroundColor: theme.background}]}>
                  {SECTION_OPTION.map(s => (
                    <Pressable
                    key={s}
                    onPress={() =>  handleUserAction({type: "UPDATE_SECTION", payload: s})}
                    style={[
                      styles.option,
                      form.section === s && styles.optionSelected
                    ]}>
                      <Text style = {form.section === s && styles.textOptionSelected}>
                        {s}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {/* Section */}

                {/* Course */}
                <Text style = {[styles.textLabelInput, {color: theme.textPrimary}]}> Pick Section </Text>
                <View style = {[styles.optionContainer, {backgroundColor: theme.background}]}>
                  {COURSE_OPTION.map(c => (
                    <Pressable
                    key={c}
                    onPress={() =>  handleUserAction({type: "UPDATE_COURSE", payload: c})}
                    style={[
                      styles.option,
                      form.course === c && styles.optionSelected 
                    ]}>
                      <Text style = {form.course === c && styles.textOptionSelected}>
                        {c}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {/* Course */}

                {/* Phone */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='Phone (09)'
                value={form.contact.phone}
                onChangeText={text => handleUserAction({type: "UPDATE_PHONE", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType="numeric"/>
                {error.phone && (
                  <Text style = {[styles.textError, {color: error.phone && theme.error}]}>
                    {error.phone}
                  </Text>
                )}
                {/* Phone */}

                {/* Email */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='Type your email use (@gmail.com)'
                value={form.contact.email}
                onChangeText={text => handleUserAction({type: "UPDATE_EMAIL", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType='email-address'
                />
                 {error.email && (
                  <Text style = {[styles.textError, {color: error.email && theme.error}]}>
                    {error.email}
                  </Text>
                )}
                {/* Email */}

                {/* Brangay */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='type your Barangay'
                value={form.address.barangay}
                onChangeText={text => handleUserAction({type: "UPDATE_BARANGAY", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType="default"
                />
                {/* Barangay */}
                
                {/* City */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='Type your City'
                value={form.address.city}
                onChangeText={text => handleUserAction({type: "UPDATE_CITY", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType="default"
                />
                {/* City */}
                
                {/* Zipcode */}
                <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
                placeholder='type your Zipcode'
                value={form.address.zipcode}
                onChangeText={text => handleUserAction({type: "UPDATE_ZIPCODE", payload: text})}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}
                keyboardType="default"
                />
                 {/* Zipcode */}

                
                {/* Cancel and Submit Button */}
                <View style = {[styles.cancelandSubmitContainer, {backgroundColor: theme.background}]}>
                  <Pressable
                  onPress={() => handleUserAction({type: "CANCEL_FORM"})}
                  onLongPress={() => alert(`Long pressed: Hi`)}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonCancel,
                  pressed && {opacity: 0.1},]}>
                    <Text style = {[styles.textButtonCancel, {color: theme.textPrimary}]}> Cancel </Text> 
                  </Pressable>

                  <Pressable
                  onPress={() => handleUserAction({type: "SUBMIT_FORM"})}
                  onLongPress={() => alert(`Long pressed: Hi}`)}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonSubmit, 
                  pressed && {opacity: 0.1},]}>
                    <Text style = {[styles.textButtonSubmit, {color: theme.textPrimary}]}> {editingId ? "Save Changes" : "Add Student"} </Text> 
                  </Pressable>
                </View>
                {/* Cancel and Submit Button */}
               </View>
              </View>
              {/* Modal Card */}
              
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>

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

  selectedStudent: {
    opacity: 0.1
   

  },

  selectedCard: {
     borderRightWidth: 10,
    borderRightColor: "#F87171",
    borderLeftWidth: 10,
    borderLeftColor: "#4ADE80",
    
  },

  textTitleCard: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  imageOutput: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center'

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

  editandDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,


  },

  textButtonDelete: {
    fontSize: 20,
   
    fontWeight: 'bold' 

  },

  buttonEdit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,


  },

  textButtonEdit: {
    fontSize: 20,

    fontWeight: 'bold' 
    

  },

  infoRowActive: {
    alignItems: 'center'
    
  },

  textActive: {
    color: "#4ADE80",
    fontSize: 26,
    fontWeight: 'bold',
    

  },

  textInactive: {
    color: "#F87171",
    fontSize: 26,
    

  },

  buttonToggle: {
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

  },

  textTitleSubHead: {
    textAlign: 'center',
    fontSize: 18,
   

  },

  textTitleFooter: {
    textAlign: 'center',
    fontSize: 18,
    

  },

  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30

  },

  textLoading: {
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

  buttonAdd: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '20%',
    marginLeft: 10
  },

  textButtonAdd: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  modalContainer: {
    flex: 1

  },

  modalCard: {
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

  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center'

  },

  textImage: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40
    
  
    
    
    

  },

  buttonPickImage: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  backgroundColor: "#4ADE80",

  },

  textButtonPick: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },

  buttonTakeImage: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
 
  backgroundColor: "#FACC15",

  },

  textButtonTake: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'

  },

  textInputContainer: {
   justifyContent: 'center',
   alignItems: 'center',
   gap: 20

  },

  input: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F9FAFB", // soft gray
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 0,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,


  },

  textError: {
    fontSize: 12,
    fontWeight: 'bold'

  },

  textLabelInput: {
    fontSize: 16,
    textAlign: 'left'
    

  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'

  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 20
    

  },

  optionSelected: {
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    transform: [
    { scale: 0.96, },
    {translateY: 1}
  ]

    

  },

  textOptionSelected: {
    fontWeight: 'bold',
    fontSize: 16

  },

  cancelandSubmitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40

  },

  buttonCancel: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#FACC15",

  },

  textButtonCancel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonSubmit: {
      paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",

  },

  textButtonSubmit: {
     textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  }


  





})