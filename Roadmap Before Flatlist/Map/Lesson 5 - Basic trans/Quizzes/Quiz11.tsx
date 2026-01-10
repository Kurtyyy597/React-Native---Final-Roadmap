import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image } from "react-native";

type Employee = {
  id: number;
  name: string;
  age: number;
  religion: string;
  sex: string;
  civilStatus: string;
  image: any;
};

export default function AppWithEdit() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      age: 24,
      religion: "Christian",
      sex: "Male",
      civilStatus: "Single",
      image: require("../../../Images/airforce.jpg"),
    },
    {
      id: 2,
      name: "Maria Santos",
      age: 29,
      religion: "Catholic",
      sex: "Female",
      civilStatus: "Married",
      image: require("../../../Images/airking.jpg"),
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  // Temporary states for editing
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editReligion, setEditReligion] = useState("");
  const [editSex, setEditSex] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const startEdit = (emp: Employee) => {
    setEditingId(emp.id);

    setEditName(emp.name);
    setEditAge(String(emp.age));
    setEditReligion(emp.religion);
    setEditSex(emp.sex);
    setEditStatus(emp.civilStatus);
  };

  const saveEdit = () => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === editingId
          ? {
              ...emp,
              name: editName,
              age: Number(editAge),
              religion: editReligion,
              sex: editSex,
              civilStatus: editStatus,
            }
          : emp
      )
    );

    setEditingId(null);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {employees.map(emp => (
        <View key={emp.id} style={styles.card}>
          <Image source={emp.image} style={styles.img} />

          {editingId !== emp.id ? (
            <>
              <Text style={styles.name}>{emp.name}</Text>
              <Text>Age: {emp.age}</Text>
              <Text>Religion: {emp.religion}</Text>
              <Text>Sex: {emp.sex}</Text>
              <Text>Status: {emp.civilStatus}</Text>

              <Pressable style={styles.btn} onPress={() => startEdit(emp)}>
                <Text style={styles.btnText}>Edit</Text>
              </Pressable>
            </>
          ) : (
            <>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                placeholder="Edit name"
                style={styles.input}
              />

              <TextInput
                value={editAge}
                onChangeText={setEditAge}
                placeholder="Edit age"
                keyboardType="numeric"
                style={styles.input}
              />

              <TextInput
                value={editReligion}
                onChangeText={setEditReligion}
                placeholder="Edit religion"
                style={styles.input}
              />

              <TextInput
                value={editSex}
                onChangeText={setEditSex}
                placeholder="Edit sex"
                style={styles.input}
              />

              <TextInput
                value={editStatus}
                onChangeText={setEditStatus}
                placeholder="Edit status"
                style={styles.input}
              />

              <Pressable style={styles.saveBtn} onPress={saveEdit}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>

              <Pressable style={styles.cancelBtn} onPress={() => setEditingId(null)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
  alignSelf: "center",
  borderRadius: 16,
  paddingVertical: 18,
  paddingHorizontal: 20,

  backgroundColor: "#FFFFFF",

  // Clean border
  borderWidth: 1,
  borderColor: "#E5E7EB", // light gray, looks modern

  // Softer shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.08,
  shadowRadius: 6,

  // Shadow for Android
  elevation: 4,

  // Professional spacing between content
  gap: 12,

  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#3498db",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  btnText: { color: "white", textAlign: "center" },

  input: {
   width: "90%",
  alignSelf: "center",

  backgroundColor: "#F9FAFB", // soft gray
  borderRadius: 12,

  paddingVertical: 12,
  paddingHorizontal: 16,

  fontSize: 16,
  color: "#111827",

  borderWidth: 1,
  borderColor: "#E5E7EB",

  // shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,

  // subtle elevation for Android
  elevation: 1,

  },

  saveBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  saveText: { color: "white", textAlign: "center" },

  cancelBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  cancelText: { color: "white", textAlign: "center" },
});
