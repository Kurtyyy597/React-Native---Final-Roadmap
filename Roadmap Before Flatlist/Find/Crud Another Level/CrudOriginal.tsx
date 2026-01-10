import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Platform, Alert, Image, Modal, ActivityIndicator, ScrollView, Switch, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import *as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const lightTheme = {
  background: "#F8F9FB",
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accent: "#3B82F6",
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",
  divider: "#E5E7EB",
  cardShadow: "#00000025",
};
const darkTheme = {
  background: "#0D0E11",
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",
  textSecondary: "#9CA3AF",
  border: "#2D2F33",
  accent: "#60A5FA",
  accentText: "#0D0E11",
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type YearLevel = "1st-Year" | "2nd-Year" | "3rd-Year" | "4th-Year"

type Student = {
  id: number;
  name: string;
  age: number;
  sex: string;
  section: string;
  yearLevel: YearLevel
  course: string;
  birthday: string;
  religion: string;
  isActive: boolean;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    zipcode: number;
    city: string;
  };
  image?: any
};

type InputForm = {
  name: string;
  age: string;
  sex: string;
  section: string;
  yearLevel: YearLevel | ""
  course: string;
  birthday: string;
  religion: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    zipcode: string;
    city: string
  };
  image: any
};

type StudentErrors = {
  name: string;
  age: string;
  sex: string;
  phone: string;
  email: string;
  zipcode: string;
};

type SaveMode = "add" | "edit" | null

export default function CrudOriginal() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen A. Marquez",
    age: 20,
    sex: "Male",
    section: "A",
    yearLevel: "1st-Year",
    course: "BS Information Technology",
    birthday: "2005-03-15",
    religion: "Catholic",
    isActive: true,
    contact: {
      phone: "09694828850",
      email: "juan.delacruz@gmail.com",
    },
    address: {
      barangay: "Barangay 1",
      zipcode: 1400,
      city: "Caloocan City",
    },
    image: null // Changed to null for safety if the image file is missing locally
  },
  ]);

  const formatBirthday = (text: string) => {
  const digits = text.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};


const formatPhoneInput = (text: string) => {
  const digits = text.replace(/\D/g, "");
  if (!digits.startsWith("09") && digits.length > 0) {
    return "09";
  }
  return digits.slice(0, 11);
};

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalViewInformation, setModalViewInformation] = useState<boolean>(false);

  const viewInformation = (id: number) => {
    const findStudent = students.find(s => s.id === id);

    if (!findStudent) {
      Alert.alert("student not found!");
      return;
    }
    setSelectedStudent(findStudent);
    setModalViewInformation(true);
  };

  const toggleInformation = (id: number) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ?
        {...s, isActive: !s.isActive} : s
      )
    )
  };

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMode, setSavedMode] = useState<SaveMode>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0)

  const startSaving = (mode: SaveMode, onFinish: () => void ) => {
    setSavedMode(mode);
    setIsSaving(true);
    setSecondsLeft(3);

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSaving(false);
          setSavedMode(null);
          onFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000);
  };

  const [form, setForm] = useState<InputForm>({
    name: "",
    age: "",
    sex: "",
    section: "",
    yearLevel: "",
    course: "",
    birthday: "",
    religion: "",
    contact: {
      phone: "",
      email: ""
    },
    address: {
      barangay: "",
      zipcode: "",
      city: "",
    },
    image: null
  });

  const updateForm = (key: keyof InputForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateContact = (key: keyof InputForm["contact"], value: string) => {
  setForm(prev => ({
    ...prev,
    contact: {
      ...prev.contact,
      [key]: value
    }
  }));
};

const updateAddress = (key: keyof InputForm["address"], value: string) => {
  setForm(prev => ({
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
    sex: "",
    phone: "",
    email: "",
    zipcode: ""
  });

  const validateErrors = () : boolean => {
    let isValid = true;

    const newErrors : StudentErrors = {
      name: "", age: "", sex: "", phone: "", email: "", zipcode: "",
    };
    const lettersOnly = /^[A-Za-z\s]+$/;

    if (!form.name.trim() || !form.age.trim() || !form.sex.trim() || !form.contact.phone.trim() || !form.contact.email.trim()) {
      Alert.alert(`Please fill in required fields!`);
      return false;
    }

    if (form.name.length < 4) {
      newErrors.name = "Name is too short!"
      isValid = false 
    } else if (!lettersOnly.test(form.name)) {
      newErrors.name = "Letters only!";
      isValid = false
    }

    const numberAge = Number(form.age)
    if (isNaN(numberAge) || numberAge < 1 || numberAge > 120) {
      newErrors.age = "Invalid Age (1–120)"
      isValid = false
    }

    if (form.sex.trim().toLowerCase() !== "male" && form.sex.trim().toLowerCase() !== "female") {
      newErrors.sex = "Male or Female only"
      isValid = false
    }

    if (form.contact.phone.length !== 11) {
      newErrors.phone = "Must be 11 digits"
      isValid = false
    }

    if (!form.contact.email.includes("@")) {
      newErrors.email = "Invalid email format"
      isValid = false 
    }

    if (form.address.zipcode.length !== 4) {
      newErrors.zipcode = "Zipcode must be 4 digits";
      isValid = false
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setForm({
      name: "", age: "", sex: "", section: "", yearLevel: "", course: "", birthday: "", religion: "",
      contact: { phone: "", email: "" },
      address: { barangay: "", zipcode: "", city: "" },
      image: null
    });
    setErrors({ name: "", age: "", sex: "", phone: "", email: "", zipcode: "" });
};

const [modalVisible, setModalVisible] = useState<boolean>(false);
const [editingId, setEditingId] = useState<number | null>(null);

const openAddModal = () => {
  setEditingId(null);
  resetForm();
  setModalVisible(true);
};

const closeModal = () => {
  setEditingId(null)
  resetForm();
  setModalVisible(false);
}

const addStudent = () => {
  if (!validateErrors()) return;
  
  const newStudent : Student = {
    id: Date.now(),
    name: form.name,
    age: Number(form.age),
    sex: form.sex,
    section: form.section,
    yearLevel: form.yearLevel as YearLevel,
    course: form.course,
    birthday: formatBirthday(form.birthday),
    religion: form.religion,
    isActive: true,
    contact: {
      phone: formatPhoneInput(form.contact.phone),
      email: form.contact.email
    },
    address: {
      barangay: form.address.barangay,
      city: form.address.city,
      zipcode: (Number(form.address.zipcode))
    },
    image: form.image
  };

  Alert.alert("Confirmation", "Add this student?", [
    {text: "Cancel", style: 'cancel'},
    {text: "Confirm", onPress: () => {
      startSaving("add", () => {
        setStudents(prev => [...prev, newStudent]);
        closeModal();
        Alert.alert(`Success!`, "Student successfully added");
      });
    }}
  ]);
};

const startEdit = (student: Student) => {
  setEditingId(student.id);
  setModalVisible(true);
  setForm({
    name: student.name,
    age: (String(student.age)),
    sex: student.sex,
    section: student.section,
    yearLevel: student.yearLevel,
    course: student.course,
    birthday: student.birthday,
    religion: student.religion,
    contact: {
      phone: student.contact.phone,
      email: student.contact.email
    },
    address: {
      barangay: student.address.barangay,
      zipcode: (String(student.address.zipcode)),
      city: student.address.city
    },
    image: student.image ?? null
  });
};

const saveEdit = () => {
  if (!validateErrors() || editingId === null) return;

  Alert.alert("Confirmation", "Save Changes?", [
    {text: "Cancel", style: 'cancel'},
    {text: "Confirm", style: 'destructive', onPress: () => {
      startSaving("edit", () => {
        setStudents(prev =>
          prev.map(s => {
            if (s.id === editingId) {
              return {
                ...s,
                name: form.name,
                age: Number(form.age),
                sex: form.sex,
                section: form.section,
                yearLevel: form.yearLevel as YearLevel,
                course: form.course,
                birthday: formatBirthday(form.birthday),
                religion: form.religion,
                contact: {
                  phone: formatPhoneInput(form.contact.phone),
                  email: form.contact.email
                },
                address: {
                  barangay: form.address.barangay,
                  city: form.address.city,
                  zipcode: Number(form.address.zipcode) 
                },
                image: form.image
              };
            }
            return s; // Crucial: return the original student if ID doesn't match
          })
        );
        closeModal();
        Alert.alert("Success!", `Student Information Updated Successfully!`);
      });
    }}
  ]);
};

const deleteStudent = (id: number) => {
  const find = students.find(s => s.id === id);
  if (!find) return;

  Alert.alert("Confirmation", `Delete ${find.name}?`, [
    {text: "Cancel", style: 'cancel'},
    {text: "Confirm", style: 'destructive', onPress: () => {
      setStudents(prev => prev.filter(s => s.id !== id))
    }}
  ]);
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });
  if (!result.canceled) {
    updateForm('image', result.assets[0].uri);
  }
};

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20}}>
        <Pressable
          onPress={openAddModal}
          style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
        <Pressable onPress={() => setDarkMode(!darkMode)}>
          <Ionicons name={darkMode ? "sunny" : "moon"} size={28} color={theme.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {students.map((s, index) => (
          <Pressable key={s.id} style = {[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]} onPress={() => viewInformation(s.id)}>
            <Text style = {[styles.textDisplayTitle, {color: theme.textPrimary}]}> View Information </Text>
            <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
            
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              {s.image ? (
                <Image source={typeof s.image === 'string' ? {uri: s.image} : s.image} style = {styles.imageStudentDisplay}/>
              ) : (
                <View style={[styles.imageStudentDisplay, {backgroundColor: theme.inputBackground, justifyContent: 'center', alignItems: 'center'}]}>
                  <Ionicons name="person" size={40} color={theme.textSecondary}/>
                </View>
              )}
              <View>
                <Text style = {[styles.textDisplayOutput, {color: theme.textPrimary, fontWeight: 'bold'}]}>{s.name}</Text>
                <Text style = {[styles.textDisplayOutput, {color: theme.textSecondary}]}>{s.course}</Text>
              </View>
            </View>

            <View style = {styles.editandDeleteContainer}>
              <Pressable onPress={() => startEdit(s)} style={styles.buttonEdit}>
                <Text style = {styles.textButtonEdit}> Edit </Text>
              </Pressable>
              <Pressable onPress={() => deleteStudent(s.id)} style={styles.buttonDelete}>
                <Text style = {styles.textButtonDelete}> Delete </Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Modal for Viewing */}
      <Modal visible={modalViewInformation} animationType="slide" onRequestClose={() => setModalViewInformation(false)}>
        <SafeAreaView style = {[styles.modalViewingInformationContainer, {backgroundColor: theme.background}]}>
          {selectedStudent && (
            <ScrollView contentContainerStyle={styles.cardViewingInformation}>
              <Text style={[styles.textTitleDisplayModalSubHeadTitle, {color: theme.textPrimary}]}>Student Profile</Text>
              <View style={{alignItems: 'center', marginVertical: 20}}>
                {selectedStudent.image ? 
                  <Image source={typeof selectedStudent.image === 'string' ? {uri: selectedStudent.image} : selectedStudent.image} style={styles.imageStudentDisplayModal}/> 
                  : <Ionicons name="person-circle" size={100} color={theme.textSecondary}/>}
              </View>
              <View style={styles.infoRow}><Text style={{color: theme.textSecondary}}>Name:</Text><Text style={{color: theme.textPrimary}}>{selectedStudent.name}</Text></View>
              <View style={styles.infoRow}><Text style={{color: theme.textSecondary}}>Age:</Text><Text style={{color: theme.textPrimary}}>{selectedStudent.age}</Text></View>
              <View style={styles.infoRow}><Text style={{color: theme.textSecondary}}>Course:</Text><Text style={{color: theme.textPrimary}}>{selectedStudent.course}</Text></View>
              <View style={styles.infoRow}><Text style={{color: theme.textSecondary}}>Email:</Text><Text style={{color: theme.textPrimary}}>{selectedStudent.contact.email}</Text></View>
              <Pressable onPress={() => setModalViewInformation(false)} style={styles.buttonModalViewingInformationClose}>
                <Text style = {styles.textButton}> Close </Text>
              </Pressable>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      {/* Modal for Add/Update */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: theme.background }}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style = {[styles.modalCardAddingandUpdating, {backgroundColor: theme.surface}]}>
              <Text style = {[styles.textTitleAddandDelete, {color: theme.textPrimary}]}> 
                {editingId ? "Update Student" : "Register Student"} 
              </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <Pressable onPress={pickImage} style={{alignItems: 'center', marginBottom: 20}}>
                  {form.image ? 
                    <Image source={typeof form.image === 'string' ? {uri: form.image} : form.image} style={styles.imageStudentDisplay}/> 
                    : <View style={[styles.imageStudentDisplay, {backgroundColor: theme.inputBackground, justifyContent: 'center'}]}><Ionicons name="camera" size={30} style={{textAlign:'center'}}/></View>}
                  <Text style={{color: theme.accent, marginTop: 5}}>Change Photo</Text>
              </Pressable>

              <Text style={{color: theme.textSecondary}}>Full Name</Text>
              <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.name} onChangeText={(v) => updateForm('name', v)} placeholder="Full Name"/>
              {errors.name ? <Text style={{color: theme.error, fontSize: 12}}>{errors.name}</Text> : null}

              <View style={{flexDirection: 'row', gap: 10}}>
                  <View style={{flex:1}}>
                    <Text style={{color: theme.textSecondary}}>Age</Text>
                    <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.age} onChangeText={(v) => updateForm('age', v)} keyboardType="numeric"/>
                    {errors.age ? <Text style={{color: theme.error, fontSize: 12}}>{errors.age}</Text> : null}
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{color: theme.textSecondary}}>Sex</Text>
                    <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.sex} onChangeText={(v) => updateForm('sex', v)} placeholder="Male/Female"/>
                  </View>
              </View>

              <Text style={{color: theme.textSecondary}}>Course</Text>
              <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.course} onChangeText={(v) => updateForm('course', v)}/>

              <Text style={{color: theme.textSecondary}}>Phone</Text>
              <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.contact.phone} onChangeText={(v) => updateContact('phone', formatPhoneInput(v))} keyboardType="numeric"/>

              <Text style={{color: theme.textSecondary}}>Email</Text>
              <TextInput style={[styles.inputField, {backgroundColor: theme.inputBackground, color: theme.textPrimary}]} value={form.contact.email} onChangeText={(v) => updateContact('email', v)}/>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                  <Pressable onPress={closeModal} style={[styles.buttonDelete, {flex: 0.45, paddingVertical: 12}]}><Text style={styles.textButtonDelete}>Cancel</Text></Pressable>
                  <Pressable onPress={editingId ? saveEdit : addStudent} style={[styles.buttonEdit, {flex: 0.45, backgroundColor: theme.accent, paddingVertical: 12}]}><Text style={[styles.textButtonEdit, {color: '#fff', textAlign: 'center'}]}>{isSaving ? "Saving..." : "Save"}</Text></Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
  flex: 1 
  },
  
  card: { 
  width: "90%", 
  borderRadius: 20, 
  padding: 20, 
  gap: 15, 
  elevation: 4, 
  alignSelf: "center", 
  marginBottom: 15, 
  borderWidth: 1 
  },

  textDisplayTitle: { 
  textAlign: 'center', 
  fontSize: 16, 
  fontWeight: 'bold' 
  },

  divider: { 
  height: 1, 
  marginVertical: 5 
  },

  imageStudentDisplay: { 
  width: 80, 
  height: 80, 
  borderRadius: 20 
  },

  textDisplayOutput: { 
  fontSize: 16 },
  modalViewingInformationContainer: { 
  flex: 1 
  },

  cardViewingInformation: { 
  padding: 25 
  },


  imageStudentDisplayModal: { 
  width: 120, 
  height: 120, 
  borderRadius: 60 
  },

  textTitleDisplayModalSubHeadTitle: { 
  textAlign: 'center', 
  fontSize: 22, 
  fontWeight: 'bold' 
  },

  buttonModalViewingInformationClose: { 
  paddingVertical: 12, 
  paddingHorizontal: 40, 
  borderRadius: 25, 
  alignSelf: 'center', 
  backgroundColor: "#3B82F6", 
  marginTop: 30 
  },

  textButton: { 
  textAlign: 'center', 
  fontWeight: 'bold', 
  fontSize: 18, 
  color: '#fff' 
  },

  editandDeleteContainer: { 
  flexDirection: 'row', 
  justifyContent: 'flex-end', 
  gap: 15 },
  buttonEdit: { 
  paddingVertical: 8, 
  paddingHorizontal: 20, 
  backgroundColor: "#FACC15", 
  borderRadius: 12 
  },

  textButtonEdit: { 
  fontSize: 14, 
  fontWeight: 'bold' 
  },

  buttonDelete: { 
  paddingVertical: 8, 
  paddingHorizontal: 20, 
  backgroundColor: "#EF4444", 
  borderRadius: 12 
  },

  textButtonDelete: { 
  fontSize: 14, 
  fontWeight: 'bold', 
  color: '#fff', 
  textAlign: 'center' 
  },

  iconButton: { 
  margin: 20, 
  width: 56, 
  height: 56,
  borderRadius: 28, 
  backgroundColor: "#3B82F6", 
  justifyContent: 'center', 
  alignItems: 'center', 
  elevation: 6 
  },

  modalCardAddingandUpdating: { 
  borderRadius: 20, 
  padding: 20, 
  gap: 10, 
  elevation: 5 
  },

  textTitleAddandDelete: { 
  textAlign: 'center',
  fontSize: 20, 
  fontWeight: 'bold' 
  },

  inputField: { 
  height: 45, 
  borderRadius: 10, 
  paddingHorizontal: 15, 
  marginBottom: 5, 
  fontSize: 16, 
  borderWidth: 0.5, 
  borderColor: '#ccc' 
  },

  infoRow: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  paddingVertical: 10, 
  borderBottomWidth: 0.5, 
  borderBottomColor: '#98ef26ff' 
  }
});