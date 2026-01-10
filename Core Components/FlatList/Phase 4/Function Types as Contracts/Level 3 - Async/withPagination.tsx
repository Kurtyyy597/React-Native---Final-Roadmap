import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Alert, ListRenderItem, Pressable, ActivityIndicator, Modal} from 'react-native';
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


type StudentAction =
| {type: "DELETE_STUDENT", payload: {id: number}}
| {type: "SELECT_STUDENT", payload: {id: number}}


type Result<T> =
| {ok: true, value: T}
| {ok: false, error: string}

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  birthDate: string;
  gender: string;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: number

  }
  characteristics: {
    height: number;
    weight: number;
    eyeColor: string;
  };
};

const PAGE_SIZE = 10;



type StudentItemProps = {
  student: Student;
  onAction:(action: StudentAction) => void;
  theme: Theme;
  isSelected: boolean;
};


const RenderItem = ({student, onAction, theme, isSelected}: StudentItemProps) => {
  return (
    <Pressable
      onPress={() => onAction({type: "SELECT_STUDENT", payload: {id: student.id}})}
      onLongPress={() => alert(`Long pressed: ${student.firstName}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},
      isSelected && styles.selectedCard]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> API Student Information </Text>
        <Text style = {[styles.textTitleSub, {color: theme.textPrimary}]}> Click to See Full Information </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal First Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.firstName} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> legal Last Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.lastName} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> legal Maiden Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.maidenName ?? "N/A"} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {student.age} </Text>
        </View>
      </Pressable>
  )
};

const loadStudentsfromApi = async (skip: number): Promise<Result<Student[]>> => {
   try {
    const res = await fetch(
    `https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${skip}`
  );

  if (!res.ok) {
    return {ok: false, error: "Failed to load students bitch!"}
  }

  const json = await res.json();

  const students: Student[] = json.users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    maidenName: u.maidenName,
    age: u.age,
    birthDate: u.birthDate,
    gender: u.gender,
    contact: {
      email: u.email,
      phone: u.phone,
    },
    address: {
      street: u.address.address,
      city: u.address.city,
      postalCode: u.address.postalCode,
    },
    characteristics: {
      height: u.height,
      weight: u.weight,
      eyeColor: u.eyeColor
    },
  }));
  return {ok: true, value: students}
  } catch {
    return {ok: false, error: "Network failed"}
  }
};

export default function AsyncWithPagination() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasmore, setHasmore] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleLoadStudents = async () => {
    if (loading || !hasmore) return;
    
    setLoading(true);
    setError(null);

    const result = await loadStudentsfromApi(skip);

    setLoading(false);

    if (!result.ok) {
      setError(result.error)
      return;
    }

    if (result.value.length === 0) {
      setHasmore(false);
      return;
    };
    setStudents(prev => [...prev, ...result.value]);
    setSkip(prev => prev + PAGE_SIZE);
  };

  const applyActionLocally = (action: StudentAction): Result<any> => {
    switch (action.type) {
      case "SELECT_STUDENT": {
        setSelectedId(prev =>
        (prev === action.payload.id ? null : action.payload.id)
        )
        return {ok: true, value: action.payload.id}
      }
      case "DELETE_STUDENT": {
        const student = students.some(s => s.id === action.payload.id);

        if (!student) {
          return {ok: false, error: "Student not found"}
        }
        Alert.alert(
          "Confirmation",
          `Delete Student?`,
          [
            {text: "Cancel", style: "cancel"},
            {
              text: "Confirm", style: "destructive",
              onPress: () => {
                setStudents(prev =>
                  prev.filter(s => s.id !== action.payload.id)
                )
              }
            }
          ]
        )
        return {ok: true, value: action.payload.id}
      }
      default: {
        const _never: never = action;
        return _never
      }
    }
  };

  const handleActionStudent = (action: StudentAction) => {
    applyActionLocally(action);
  };

  const selectedStudent = students.find(s => s.id === selectedId);

  const renderStudents: ListRenderItem<Student> = ({item}) => {
    return (
      <RenderItem
      student={item}
      theme={theme}
      isSelected={item.id === selectedId}
      onAction={handleActionStudent}/>
    )
  };

  const header = () => (
    <Text style = {[styles.textHeader, {color: theme.textPrimary}]}> Student List from API </Text>
  );

  const footer = () => {
    if (loading) {
      return (
        <>
        <ActivityIndicator size={'large'} color={theme.accent}/>
        <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading students... </Text>
        </>
      )
    };
    
    if (!hasmore) (
      <Text style = {[styles.textFooter, {color: theme.textPrimary}]}> No More Students </Text>
    );

    return (
      <Pressable
      onPress={handleLoadStudents}
      onLongPress={() => alert(`Long pressed: Hi`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.addButton,
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Load Students  </Text> 
      </Pressable>
    )
  };

  const empty = () => (
    <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Students Empty. Its time to add more </Text>
  );

  const separator = () => <View style = {styles.separator}/>

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>


      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudents}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      ItemSeparatorComponent={separator}/>

    
    <Modal visible={!!selectedStudent} animationType='slide'
    transparent
    onRequestClose={() => setSelectedId(null)}>
      <SafeAreaView style = {[styles.containerModal, {backgroundColor: theme.inputBackground}]}>
        <View style = {[styles.modalCard, {backgroundColor: theme.inputBackground}]}>
          {selectedStudent && (
            <View style = {[styles.selectedStudentOutput, {backgroundColor: theme.inputBackground}]}>
              <Text style = {[styles.textTitleSelected, {color: theme.textPrimary}]}> Student Full Information </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal First Name: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.firstName} </Text>
              </View>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Maiden Name: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.maidenName} </Text>
              </View>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Legal Last Name: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.lastName} </Text>
              </View>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.age} </Text>
              </View>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Gender: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.gender} </Text>
              </View>

              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Birthyear: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.birthDate} </Text>
              </View>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <Text style = {[styles.textTitleContact, {color: theme.textPrimary}]}> Contact Information </Text>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Email: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.contact.email} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Phone: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.contact.phone} </Text>
              </View>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <Text style = {[styles.textTitleContact, {color: theme.textPrimary}]}> Address Information </Text>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Street: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.street} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> City:  </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.city} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Postal Code: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.address.postalCode} </Text>
              </View>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <Text style = {[styles.textTitleContact, {color: theme.textPrimary}]}> Characteristics </Text>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Height: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.characteristics.height} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Weight:  </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.characteristics.weight} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Eye Color: </Text>
                <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {selectedStudent.characteristics.eyeColor} </Text>
              </View>

            <Pressable
            onPress={() => setSelectedId(null)}
            onLongPress={() => alert(`Long pressed: Hi`)}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            styles.buttonClose, {backgroundColor: theme.surface},
            pressed && {opacity: 0.1},]}>
              <Text style = {[styles.textButtonClose, {color: theme.textPrimary}]}> Close </Text> 
            </Pressable>

          </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>

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
    backgroundColor: "#FFFBEB",   // very light yellow  

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  textTitleSub: {
    fontSize: 12,
    textAlign: 'center'

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

  textHeader: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold'

  },

  textLoading: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'

  },

  textFooter: {
     textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'

  },

  addButton: {
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

  separator: {
    height: 20
  },

  containerModal: {
    flex: 1,
    justifyContent: 'center'
    

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

  selectedStudentOutput: {
    gap: 10

  },

  textTitleSelected: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textTitleContact: {
    fontSize: 16,
    textAlign: 'center'

  },

  buttonClose: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',

  },

  textButtonClose: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }






})



