import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
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
  id: number;
  name: string;
  age: number;
  section: string;
  course: string;
  religion: string;
  birthday: string;
  gender: string;
  address: {
    zipcode: number;
    barangay: string;
    city: string;
  };
  contact: {
    email: string;
    phone: number;
  };
};

export default function SpreadDeepNested() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Students[]>([
  {
    id: 1,
    name: "Kurt Marquez",
    age: 21,
    birthday: "June 10 2004",
    gender: "Male",
    section: "BSIT-41",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 1410, barangay: "Barangay 33", city: "Caloocan City" },
    contact: { email: "kurtmarquez238@gmail.com", phone: 639694828850 }
  },

  {
    id: 2,
    name: "Zydane Battad",
    age: 22,
    birthday: "March 15 2003",
    gender: "Male",
    section: "BSIT-43",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 1204, barangay: "Barangay 145", city: "Pasay City" },
    contact: { email: "zydane.battad@example.com", phone: 639451237812 }
  },

  {
    id: 3,
    name: "Nathaniel Abril",
    age: 25,
    birthday: "January 5 2000",
    gender: "Male",
    section: "BSIT-42",
    course: "Bachelor in Science Information Technology",
    religion: "Christian",
    address: { zipcode: 1700, barangay: "Moonwalk", city: "Parañaque City" },
    contact: { email: "nathaniel.abril@example.com", phone: 639876543210 }
  },

  {
    id: 4,
    name: "Rio Jay Magalona",
    age: 21,
    birthday: "December 8 2004",
    gender: "Male",
    section: "BSIT-41",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 3001, barangay: "Poblacion", city: "Malolos City" },
    contact: { email: "riojay.magalona@example.com", phone: 639991112233 }
  },

  {
    id: 5,
    name: "Mark Angelo Santos",
    age: 23,
    birthday: "August 21 2002",
    gender: "Male",
    section: "BSIT-44",
    course: "Bachelor in Science Information Technology",
    religion: "Iglesia ni Cristo",
    address: { zipcode: 3020, barangay: "Bagong Buhay", city: "San Jose del Monte" },
    contact: { email: "markangelo.santos@example.com", phone: 639775553333 }
  },

  {
    id: 6,
    name: "John Carlo Dela Cruz",
    age: 20,
    birthday: "May 30 2005",
    gender: "Male",
    section: "BSIT-41",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 1409, barangay: "Maypajo", city: "Caloocan City" },
    contact: { email: "johncarlo.delacruz@example.com", phone: 639665551212 }
  },

  {
    id: 7,
    name: "Anthony Ramirez",
    age: 22,
    birthday: "July 14 2003",
    gender: "Male",
    section: "BSIT-42",
    course: "Bachelor in Science Information Technology",
    religion: "Born Again",
    address: { zipcode: 1800, barangay: "Silangan", city: "Marikina City" },
    contact: { email: "anthony.ramirez@example.com", phone: 639778889900 }
  },

  {
    id: 8,
    name: "Jericho Soriano",
    age: 24,
    birthday: "April 1 2001",
    gender: "Male",
    section: "BSIT-43",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 1106, barangay: "Commonwealth", city: "Quezon City" },
    contact: { email: "jericho.soriano@example.com", phone: 639998887766 }
  },

  {
    id: 9,
    name: "Paolo Gutierrez",
    age: 21,
    birthday: "September 19 2004",
    gender: "Male",
    section: "BSIT-44",
    course: "Bachelor in Science Information Technology",
    religion: "Christian",
    address: { zipcode: 4024, barangay: "Santo Tomas", city: "Biñan City" },
    contact: { email: "paolo.gutierrez@example.com", phone: 639667778888 }
  },

  {
    id: 10,
    name: "Leo Fernandez",
    age: 23,
    birthday: "November 25 2002",
    gender: "Male",
    section: "BSIT-41",
    course: "Bachelor in Science Information Technology",
    religion: "Catholic",
    address: { zipcode: 4102, barangay: "Molino", city: "Bacoor City" },
    contact: { email: "leo.fernandez@example.com", phone: 639887775555 }
  }
  ]);

  const updateId1 = () => {
    const updated = students.map(stud =>
      stud.id === 1 ?
      {
        ...stud,
        address: {
          ...stud.address,
          barangay: "Barangay 34",
          zipcode: 4520,
          city: "Metro Manila"
        }
      } : stud

    );
    setStudents(updated);
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
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

        {students.map((stud) => (
          <View key={stud.id} style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}> 
            <Text style = {{fontWeight: 'bold'}}> Name: </Text> 
             {stud.name} 
            </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Age: </Text>
            {stud.age} 
            </Text>
             <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Section: </Text>
            {stud.section} 
            </Text>
             <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Course: </Text>
            {stud.course} 
            </Text>
             <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Sex: </Text>
            {stud.gender} 
            </Text>
             <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Religion: </Text>
            {stud.religion} 
            </Text>
             <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Birthday: </Text>
            {stud.birthday} 
            </Text>
            <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
            <Text style = {[styles.outputTextTitle, {color: theme.textPrimary}]}> Contact Information </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Email: </Text>
            {stud.contact.email} 
            </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Phone: </Text>
            {stud.contact.phone} 
            </Text>
            <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
            <Text style = {[styles.outputTextTitle, {color: theme.textPrimary}]}> Address Information </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Barangay: </Text>
            {stud.address.barangay} 
            </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> Zipcode: </Text>
            {stud.address.zipcode} 
            </Text>
            <Text style = {[styles.outputText, {color: theme.textPrimary}]}>
              <Text style = {{fontWeight: 'bold'}}> City: </Text>
            {stud.address.city} 
            </Text>
            <Pressable
            onPress={updateId1}
            onLongPress={() => alert("Long pressed")}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            styles.button,
            pressed && {opacity: 0.1 }
            ]}>
              <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Update ID 1</Text>

            </Pressable>
          </View>
        ))}

       
      </ScrollView>
    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10

  },

  card: {
    width: "85%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",


  },

  outputText: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'medium'

  },

  outputTextTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  divider: {
    height: 3,
    paddingVertical: 2,
    width: '100%'
  },

  button: {
    paddingVertical: 5,
    backgroundColor: "#3B82F6",  
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    height: 40

  },
  
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  }


})