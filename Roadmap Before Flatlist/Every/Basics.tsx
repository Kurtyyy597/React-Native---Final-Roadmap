import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  id: number,
  name: string;
  age: number
};


type StudentFormProps = {
  student: Student;
  checkAge: (id: number) => void;
};

const StudentCard = ({student, checkAge} : StudentFormProps ) => {
  const {id, name , age} = student;

  return (
    <View key={id} style = {styles.card}>
      <Text style = {styles.textTitle}> Student Info </Text>
      <View style = {styles.divider}/>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Name </Text>
        <Text style = {styles.textContent}> {name} </Text>
      </View>
       <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Age </Text>
        <Text style = {styles.textContent}> {age} </Text>
      </View>
      <Pressable
      onPress={()=>checkAge(id)}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1 }]}>
        <Text style = {styles.textButton}> Check Age </Text>
      </Pressable>
    </View>
  )
};

export default function EveryBasics() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;
  const [evenAge, setEvenAge] = useState<boolean>(false);

  const [students, setStudents] = useState<Student[]>([
    {id: 1, name: "Kurt Allen A. Marquez", age: 21},
    {id: 2, name: "Rio Jay Magolna", age: 22},
    {id: 3, name: "Lord D. Marquez", age: 22}
  ]);

  const checkEvenAge = (id: number) => {
    const find = students.find(s => s.id === id);

    if (!find) {
      alert("Student not found!");
      return;
    } 
    const checkAge = students.every(s =>
      s.age % 2 === 0
    );
    setEvenAge(checkAge);
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.inputBackground}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Check Even Age </Text>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <StudentCard
        student={item}
        checkAge={checkEvenAge}/>
      )}
      ItemSeparatorComponent={() => <View style={{height: 100}}/>}
      />

      
      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> All EVEN AGE:{" "} {evenAge ? "YES" : "NO"} </Text>
    
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
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
    fontWeight: 'bold',
    fontSize: 20

  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 1,
    paddingVertical: 1 

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

  },

  textOutput: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }


})


