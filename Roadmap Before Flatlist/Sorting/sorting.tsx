import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: string;
  religion: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: number;
  };
  image?: any;
};

type StudentCardProps = {
  student: Student;
};

const StudentCard = ({ student }: StudentCardProps) => {
  const {
    id,
    name,
    age,
    section,
    course,
    religion,
    image,
    contact: { phone, email },
    address: { barangay, city, zipcode },
  } = student;

  return (
    <View style={styles.studentCard}>
      <Text style={styles.textInfo}>Student {id} Info</Text>

      {image && <Image source={image} style={styles.imageOutput} />}

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Name</Text>
        <Text style={styles.textContent}>{name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Age</Text>
        <Text style={styles.textContent}>{age}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Section</Text>
        <Text style={styles.textContent}>{section}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Course</Text>
        <Text style={styles.textContent}>{course}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Religion</Text>
        <Text style={styles.textContent}>{religion}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.textLabelTitle}>Contact Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Phone</Text>
        <Text style={styles.textContent}>{phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Email</Text>
        <Text style={styles.textContent}>{email}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.textLabelTitle}>Address Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Barangay</Text>
        <Text style={styles.textContent}>{barangay}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>City</Text>
        <Text style={styles.textContent}>{city}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.textLabel}>Zipcode</Text>
        <Text style={styles.textContent}>{zipcode}</Text>
      </View>
    </View>
  );
};

export default function SortingBasics() {
  const [darkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Kurt Allen Marquez", age: 21, section: "BSIT-3A", course: "BS Information Technology", religion: "Catholic",
      contact: { phone: "09123456789", email: "kurt.marquez@email.com" },
      address: { barangay: "San Isidro", city: "Quezon City", zipcode: 1100 },
      image: require('../../Images/Kurt.jpg')
    },
    { id: 2, name: "Nathaniel Abril", age: 24, section: "BSCS-4B", course: "BS Computer Science", religion: "Catholic",
      contact: { phone: "09987654321", email: "n.abril@email.com" },
      address: { barangay: "Bagong Silang", city: "Caloocan", zipcode: 1428 },
      image: require('../../Images/men1.jpg')
    },
    { id: 3, name: "Zydane Battad", age: 29, section: "BSIT-4A", course: "BS Information Technology", religion: "Christian",
      contact: { phone: "09223334444", email: "zydane.b@email.com" },
      address: { barangay: "Commonwealth", city: "Quezon City", zipcode: 1121 },
      image: require('../../Images/men2.jpg')
    },
    { id: 4, name: "Andrea Cruz", age: 20, section: "BSIS-2A", course: "BS Information Systems", religion: "Catholic",
      contact: { phone: "09112223333", email: "andrea.cruz@email.com" },
      address: { barangay: "Poblacion", city: "Makati", zipcode: 1200 },
      image: require('../../Images/women1.jpg')
    },
    { id: 5, name: "Joshua Reyes", age: 22, section: "BSIT-3B", course: "BS Information Technology", religion: "Born Again",
      contact: { phone: "09334445555", email: "joshua.reyes@email.com" },
      address: { barangay: "Talipapa", city: "Quezon City", zipcode: 1116 },
      image: require('../../Images/men3.jpg')
    },
    { id: 6, name: "Alyssa Fernandez", age: 19, section: "BSCS-1A", course: "BS Computer Science", religion: "Catholic",
      contact: { phone: "09445556666", email: "alyssa.f@email.com" },
      address: { barangay: "Batasan Hills", city: "Quezon City", zipcode: 1126 },
      image: require('../../Images/women2.jpg')
    },
    { id: 7, name: "Michael Santos", age: 23, section: "BSIT-4B", course: "BS Information Technology", religion: "Christian",
      contact: { phone: "09556667777", email: "michael.santos@email.com" },
      address: { barangay: "Anonas", city: "Quezon City", zipcode: 1104 },
      image: require('../../Images/men3.jpg')
    },
    { id: 8, name: "Rhea Villanueva", age: 21, section: "BSIS-3A", course: "BS Information Systems", religion: "Catholic",
      contact: { phone: "09667778888", email: "rhea.v@email.com" },
      address: { barangay: "Tandang Sora", city: "Quezon City", zipcode: 1116 },
      image: require('../../Images/woemn3.jpg')
    },
    { id: 9, name: "Daniel Lim", age: 25, section: "BSCS-4A", course: "BS Computer Science", religion: "Buddhist",
      contact: { phone: "09778889999", email: "daniel.lim@email.com" },
      address: { barangay: "Binondo", city: "Manila", zipcode: 1006 },
      image: require('../../Images/men4.jpg')
    },
    { id: 10, name: "Sophia Mendoza", age: 20, section: "BSIT-2A", course: "BS Information Technology", religion: "Catholic",
      contact: { phone: "09889990000", email: "sophia.m@email.com" },
      address: { barangay: "Marikina Heights", city: "Marikina", zipcode: 1810 },
      image: require('../../Images/women4.jpg')
    },
  ]);

  // ✅ HELPER: get last name
  const getLastName = (fullName: string) =>
    fullName.trim().split(" ").slice(-1)[0];

  // ✅ SORT BY LAST NAME (A → Z)
  const sortAtoZ = () => {
    setStudents(prev =>
      [...prev].sort((a, b) =>
        getLastName(a.name)
          .toLowerCase()
          .localeCompare(getLastName(b.name).toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.textMainTitle, { color: theme.textPrimary }]}>
        Sort by Last Name (A → Z)
      </Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <StudentCard student={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      />

      <Pressable style={styles.button} onPress={sortAtoZ}>
        <Text style={styles.textButton}>Sort A → Z</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  textMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  studentCard: {
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

  textInfo: {
     fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  
  imageOutput: {
    width: 150,
    alignSelf: 'center',
    height: 150,
    borderRadius: 100
  },

  divider: {
    backgroundColor: "#E5E7EB",
    height: 2,
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
    fontWeight :'bold'
  },

  textLabelTitle: {
    fontSize: 18,
    
    textAlign: 'center'
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

  }



})