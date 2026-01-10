import React, {useState} from 'react';
import {View, Text, Pressable, FlatList, StyleSheet, Image} from 'react-native';
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
  section: string;
  image: any
};

type StudentFormProps = {
  student: Student

};

type SortOption =
  | "LAST_NAME_AZ"
  | "AGE_ASC"
  | "AGE_DESC";

const StudentCard = ({student} : StudentFormProps) => {
  const {id, name, age, section, image} = student;

  return (
    <View key={id} style = {styles.studentCard}>
      <Text style = {styles.textTitle}> Student {id} Info  </Text>
      {image && (
        <Image source={image} style = {styles.imageOutput}/>
      )}
      <View style = {styles.divider}/>

      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Name: </Text>
        <Text style = {styles.textContent}> {name} </Text>
      </View>

      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Age: </Text>
        <Text style = {styles.textContent}> {age} </Text>
      </View>

      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Section: </Text>
        <Text style = {styles.textContent}> {section} </Text>
      </View>
      
    </View>
  )
};

export default function SortingComplete() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "BSIT-3A",
    image: require('../../Images/Kurt.jpg')
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "BSCS-4B",
    image: require('../../Images/men1.jpg')
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "BSIT-4A",
    image: require('../../Images/men2.jpg')
  },
  {
    id: 4,
    name: "Andrea Cruz",
    age: 20,
    section: "BSIS-2A",
    image: require('../../Images/women1.jpg')
  },
  {
    id: 5,
    name: "Joshua Reyes",
    age: 22,
    section: "BSIT-3B",
    image: require('../../Images/men3.jpg')
  },
  {
    id: 6,
    name: "Alyssa Fernandez",
    age: 19,
    section: "BSCS-1A",
    image: require('../../Images/women2.jpg')
  },
  {
    id: 7,
    name: "Michael Santos",
    age: 23,
    section: "BSIT-4B",
    image: require('../../Images/men4.jpg')
  },
  {
    id: 8,
    name: "Rhea Villanueva",
    age: 21,
    section: "BSIS-3A",
    image: require('../../Images/woemn3.jpg')
  },
  {
    id: 9,
    name: "Daniel Lim",
    age: 25,
    section: "BSCS-4A",
    image: require('../../Images/men5.jpg')
  },
  {
    id: 10,
    name: "Sophia Mendoza",
    age: 20,
    section: "BSIT-2A",
    image: require('../../Images/women5.jpg')
  },
  ]);

  const [sortOption, setSortOption] = useState<SortOption>("LAST_NAME_AZ");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const getLastName = (fullName: string) =>
    fullName.trim().split(" ").slice(-1)[0];

    const getSortLabel = (option: SortOption) => {
      switch (option) {
        case "LAST_NAME_AZ":
          return `LAST NAME (A-Z)`
        case 'AGE_ASC':
          return `Age (youngest to oldest)`
        case `AGE_DESC`:
          return `Age (oldest to youngest)`
      };
    };

    const applySort = (option: SortOption) => {
      setSortOption(option);
      setShowDropDown(false);

      setStudents(prev => {
        const copy = [...prev];

        if (option === "LAST_NAME_AZ") {
          return copy.sort((a, b) => 
          getLastName(a.name.toLowerCase()).localeCompare(getLastName(b.name.toLowerCase())))
          
        };

        if (option === "AGE_ASC") {
          return copy.sort((a, b) => a.age - b.age)
        };

        if (option === "AGE_DESC") {
          return copy.sort((a, b) => b.age - a.age)
        };

        return copy
      });
    };
  

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.dropDownCard, {backgroundColor: theme.cardShadow}]}>
       <Pressable
        onPress={() => setShowDropDown(prev => !prev)}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.sortOption,
       
        pressed && {opacity: 0.1 }]}>
          <Text style = {[styles.textButtonDesign, {color: theme.textPrimary}]}> {getSortLabel(sortOption)}▼ </Text>
        </Pressable>

        {showDropDown && (
        <>
        <Pressable
        onPress={() => applySort("LAST_NAME_AZ")}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonDesign,
        sortOption === "LAST_NAME_AZ" && styles.isActive,
        pressed && {opacity: 0.1 }]}>
          <Text style = {[styles.textButtonDesign, {color: theme.textPrimary}]}> Last Name (A-Z) </Text>
        </Pressable>

         <Pressable
        onPress={() => applySort("AGE_ASC")}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonDesign,
        sortOption === "AGE_ASC" && styles.isActive,
        pressed && {opacity: 0.1 }]}>
          <Text style = {[styles.textButtonDesign, {color: theme.textPrimary}]}> Age (youngest - oldest) </Text>
        </Pressable>

         <Pressable
        onPress={() => applySort("AGE_DESC")}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.buttonDesign,
        sortOption === "AGE_DESC" && styles.isActive,
        pressed && {opacity: 0.1 }]}>
          <Text style = {[styles.textButtonDesign, {color: theme.textPrimary}]}> Age (Oldest - Youngest) </Text>
        </Pressable>
        </>
    )}
    </View>

      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <StudentCard
        student={item}/>
      )}
      ItemSeparatorComponent={() => <View style={{height: 40}}/>}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  studentCard: {
    marginTop: 10,
  backgroundColor: "#F3F4F6",
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
    fontSize: 20,
    fontWeight: "bold"

  },

  imageOutput: {
    width: 150,
    height: 150,
    borderRadius: 20,
    alignSelf: 'center'

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

  sortOption: {
    

  },

  sortText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  buttonDesign: {
    alignSelf: 'center'
   


  },

  textButtonDesign: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  dropDownCard: {
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: '60%',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 10

  },

  isActive: {
    backgroundColor: "#22C55E",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    
  }


})