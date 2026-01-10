import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// YOUR THEMES (unchanged)
const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  divider: "#E0E0E0",
};

const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  divider: "#383838",
};

// TYPES
type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  religion: string;
  sex: string;
  address: {
    barangay: string;
    zipcode: number;
    city: string;
  };
  image: any;
};

export default function PremiumStudentCard() {
  const [darkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const students: Student[] = [
    {
      id: 1,
      name: "Kurt Allen A. Marquez",
      age: 21,
      section: "BSIT-41",
      religion: "Catholic",
      sex: "Male",
      address: {
        barangay: "Barangay 33",
        zipcode: 1410,
        city: "Caloocan City",
      },
      image: require("../../Images/Kurt.jpg"),
    },

     {
      id: 2,
      name: "Kurt Allen A. Marquez",
      age: 21,
      section: "BSIT-41",
      religion: "Catholic",
      sex: "Male",
      address: {
        barangay: "Barangay 33",
        zipcode: 1410,
        city: "Caloocan City",
      },
      image: require("../../Images/Kurt.jpg"),
    },
  ];

  const updated = students.map((stud) => ({
    ...stud,
    status: stud.age >= 18 ? "Adult" : "Teenager",
    physical: stud.religion.startsWith("Catholic") ? "Pogi" : "Unknown",
  }));

  return (

    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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
      <View style = {[styles.mainCard, {backgroundColor: theme.warning}]}> 
      {updated.map((s) => (
        <View key={s.id} style={[styles.card, { backgroundColor: theme.surface }]}>
          {/* Accent Left Border */}
          <View style={[styles.accentBorder, { backgroundColor: theme.accent }]} />
          <View style={[styles.accentRight, {backgroundColor: theme.accent}]} /> 
          <View style={[styles.accentTop, {backgroundColor: theme.accent}]} /> 
          <View style={[styles.accentBottom, {backgroundColor: theme.accent}]} /> 

          {/* Header Title */}
          <Text style={[styles.title, { color: theme.textPrimary }]}>STUDENT PROFILE</Text>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* Main Row */}
          <View style={styles.row}>
            <Image source={s.image} style={styles.image} />

            <View style={styles.detailsCol}>
              <Text style={[styles.label]}><Text style={styles.bold}>Name:</Text> {s.name}</Text>
              <Text style={[styles.label]}><Text style={styles.bold}>Age:</Text> {s.age}</Text>
              <Text style={[styles.label]}><Text style={styles.bold}>Section:</Text> {s.section}</Text>
              <Text style={[styles.label]}><Text style={styles.bold}>Sex:</Text> {s.sex}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* Address Section */}
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>📍 Address</Text>
          <Text style={[styles.subLabel]}>Barangay: {s.address.barangay}</Text>
          <Text style={[styles.subLabel]}>City: {s.address.city}</Text>
          <Text style={[styles.subLabel]}>Zipcode: {s.address.zipcode}</Text>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* Status */}
          <Text style={[styles.statusText, { color: theme.success }]}>⭐ Status: {s.status}</Text>
          <Text style={[styles.statusText, { color: theme.accent }]}>😎 Physical: {s.physical}</Text>
        </View>
      ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    marginVertical: 15,
    overflow: "hidden",


    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  // Accent left strip
  accentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 8,
    height: 600,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 39,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  divider: {
    height: 1.2,
    marginVertical: 12,
    width: "100%",
    opacity: 0.5,
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  image: {
    width: 110,
    height: 150,
    borderRadius: 16,
  },

  detailsCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },

  label: {
    fontSize: 16,
    color: "#444",
  },

  bold: {
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  subLabel: {
    fontSize: 16,
    color: "#555",
  },

  statusText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  accentRight: {
  position: "absolute",
  right: 0,
  top: 0,
  width: 8,
  height: 600,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  
},

accentTop: {
  position: "absolute",
  top: 0,
  left: 0,
  height: 10,
  width: 600,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  
},

accentBottom: {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: 8,
  width: 600,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
 
},

mainCard: {
  width: 300,
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
 
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  borderWidth: 1,
  alignSelf: "center",
}

});
