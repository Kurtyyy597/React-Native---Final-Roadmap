import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, ScrollView} from 'react-native';
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
  religion:  string;
  contact: {
    phone: number;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: number 
  };
  image?: any;
};

type StudentCardProps = {
  id: number;
  name: string;
  age: number;
  section: string;
  religion: string;
  contact: {
    phone: number;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: number
  };
  image?: any;
};
const StudentCard = ({
  id,
  name,
  age,
  section,
  religion,
  contact: { phone, email },
  address: { barangay, city, zipcode },
  image,
}: StudentCardProps) => {

  return (
    
    <View key={id} style = {styles.card}>
      <Text style= {styles.textTitle}> Student #{id} Info </Text>
      <View style = {styles.divider}/>
      {image && (
        <Image source={image} style={styles.imageOutput}/>
      )}
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
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Religion: </Text>
        <Text style = {styles.textContent}> {religion} </Text>
      </View>
      <View style = {styles.divider}/>
      <Text style= {styles.textTitle}> Contact Info </Text>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Phone: </Text>
        <Text style = {styles.textContent}> {phone} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Email: </Text>
        <Text style = {styles.textContent}> {email} </Text>
      </View>
      <View style = {styles.divider}/>
      <Text style= {styles.textTitle}> Address Info </Text>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Barangay: </Text>
        <Text style = {styles.textContent}> {barangay} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> City: </Text>
        <Text style = {styles.textContent}> {city} </Text>
      </View>
      <View style = {styles.infoRow}>
        <Text style = {styles.textLabel}> Zipcode: </Text>
        <Text style = {styles.textContent}> {zipcode} </Text>
      </View>
    </View>
  )
};

export default function DestructuringFinalLesson() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "4A",
    religion: "Roman Catholic",
    contact: {
      phone: 9694828850,
      email: "kurt.marquez@gmail.com",
    },
    address: {
      barangay: "Bagong Silang",
      city: "Caloocan City",
      zipcode: 1400,
    },
    image: require('../../../Images/Kurt.jpg')
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "3B",
    religion: "Christian",
    contact: {
      phone: 9173456789,
      email: "n.abril@email.com",
    },
    address: {
      barangay: "Talipapa",
      city: "Quezon City",
      zipcode: 1116,
    },
    image: require('../../../Images/men1.jpg')
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "4C",
    religion: "Roman Catholic",
    contact: {
      phone: 9051122334,
      email: "zydane.battad@email.com",
    },
    address: {
      barangay: "San Antonio",
      city: "Pasig City",
      zipcode: 1600,
    },
    image: require('../../../Images/men2.jpg')
  },
  {
    id: 4,
    name: "Angelica Cruz",
    age: 21,
    section: "4B",
    religion: "Roman Catholic",
    contact: {
      phone: 9987766554,
      email: "angelica.cruz@email.com",
    },
    address: {
      barangay: "Poblacion",
      city: "Makati City",
      zipcode: 1200,
    },
    image: require('../../../Images/women1.jpg')
  },
  {
    id: 5,
    name: "Joshua Lim",
    age: 19,
    section: "1C",
    religion: "Buddhist",
    contact: {
      phone: 9128899001,
      email: "joshua.lim@email.com",
    },
    address: {
      barangay: "Binondo",
      city: "Manila",
      zipcode: 1006,
    },
    image: require('../../../Images/men3.jpg')
  },
  ]);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
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
        
     
      {students.map((s) => (
        <StudentCard key={s.id}
        id={s.id}
        image={s.image}
        name={s.name}
        age={s.age}
        section={s.section}
        religion={s.religion}
        contact={s.contact}
        address={s.address}/>
      ))}
       </ScrollView>
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  card: {
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
    fontWeight: 'bold'

  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 2,
    paddingVertical: 2 

  },

  imageOutput: {
    width: 200,
    height: 200,
    borderRadius: 90,
    alignSelf: 'center'

  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  textLabel: {
    fontSize: 12,

  },

  textContent: {
    fontSize: 16,
    fontWeight :'bold'

  },

})