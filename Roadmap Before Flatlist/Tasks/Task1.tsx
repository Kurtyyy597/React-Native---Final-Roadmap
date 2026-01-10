import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert} from 'react-native';
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


type Students = {
  id: number
  name: string
  age: number
  course: string
  active: boolean
};

export default function RoadMapBeforeFlatlIstTask1() {
  const [darkMode, setDarkmode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const initialStudents : Students[] = ([
  { id: 1, name: "Kurt", age: 21, course: "BSIT", active: true },
  { id: 2, name: "Nathan", age: 22, course: "BSCS", active: false },
  { id: 3, name: "Zydane", age: 23, course: "BSIT", active: true },
  ]);

  const [students, setStudents] = useState<Students[]>(initialStudents);

  const addStudent = () => {
    const newStudent = {
      id: Date.now(),
      name: "Rio Jay Magalona",
      age: 25,
      course: "BSIT 41",
      active: true
    }
    Alert.alert(
      "Confirmation",
      `Do you want to add ${newStudent.name}?`,
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Confirm", style: 'destructive',
          onPress: () => {
            const add = [...students, newStudent];
            setStudents(add);
            Alert.alert("Success", `You added ${newStudent.name}`)
          }
        }
      ]
    )
  };

  const deleteStudent = (id: number) => {
  const find = students.find(s => s.id === id);

  if (!find) {
    Alert.alert("Student not found!");
    return;
  }

  Alert.alert(
    "Confirmation",
    `Do you want to delete ${find.name}?`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          setStudents(prev =>
            prev.filter(s => s.id !== id)
          );

          Alert.alert("Success", `You deleted ${find.name}`);
        }
      }
    ]
  );
};

  const toggleActive = (id: number) => {
   setStudents(prev =>
    prev.map(s =>
      s.id === id ?
      {
        ...s,
        active: !s.active
      } : s
    )
   )
  }

  const updateCourse = (id: number, newCourse: string) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      Alert.alert("Student not found!");
      return;
    }
    setStudents(prev =>
      prev.map(s =>
        s.id === id ?
        {
          ...s,
          course: newCourse
        } : s
      )
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
        

        <View style = {[styles.cardContainer, {backgroundColor: theme.background}]}>
          {students.map((s) => (
            <Pressable key={s.id}
            style={[
              styles.card,
             {backgroundColor: theme.surface},
             s.active && styles.isActive
            ]}>
              <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student Info </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}> 
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
                <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {s.name} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}> 
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
                <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {s.age} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}> 
                <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Course: </Text>
                <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {s.course} </Text>
              </View>
              <View style = {[styles.infoRow, {backgroundColor: theme.surface}]}> 
                <Text style = {s.active ? styles.activeText : styles.inactiveText}> {s.active ? "ACTIVE" : "INACTIVE"}</Text>
                <Switch value={s.active} onValueChange={()=>toggleActive(s.id)}
                trackColor={{true: theme.accent , false: theme.error}}
                thumbColor={s.active ? theme.accent : theme.error}/>
              </View>
               <Pressable
                onPress={() => deleteStudent(s.id)}
                onLongPress={() => alert("Long pressed")}
                delayLongPress={400}
                android_ripple={{ color: "#4818e5ff" }}
                hitSlop={10}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.buttonDelete,
                pressed && {opacity: 0.1 }]}>
                  <Text style = {[styles.textButtonDelete, {color: theme.textPrimary}]}> Delete </Text>
                </Pressable>

                 <Pressable
                  onPress={()=>updateCourse(s.id, "Tourism")}
                  onLongPress={() => alert("Long pressed")}
                  delayLongPress={400}
                  android_ripple={{ color: "#4818e5ff" }}
                  hitSlop={10}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                  styles.buttonAdd,
                  pressed && {opacity: 0.8 }]}>
                  <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Update Course  </Text>
                  </Pressable>
            </Pressable>
          ))}
        </View>
          
          <Pressable
          onPress={addStudent}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonAdd,
          pressed && {opacity: 0.8 }]}>
          <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> Add Student  </Text>
          </Pressable>

         
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  cardContainer: {
    borderRadius: 20,
    gap: 10

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

  isActive: {
    borderColor: "#22C55E",
    borderWidth: 10 

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  divider: {
    height: 1,
    paddingVertical: 1,

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },

  textLabel: {
    fontSize: 12,


  },

  textOutput: {
    fontSize: 14,
    fontWeight: 'bold',

  },

  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EF4444",
    borderRadius: 30,
    alignSelf: 'center'

  },

  textButtonDelete: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonAdd: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3B82F6",
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    
  },

  textButtonAdd: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  activeText: {
    fontSize: 18,
    color: "#3B82F6", 

  },

  inactiveText: {
    fontSize: 12,
    color: "#EF4444", 


  },


})