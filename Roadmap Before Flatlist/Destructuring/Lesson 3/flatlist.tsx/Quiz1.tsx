import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* =======================
   TYPES
======================= */
type Student = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: number;
  };
};

type StudentForms = {
  name: string;
  age: string;
  section: string;
  course: string;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    barangay: string;
    city: string;
    zipcode: string;
  };
};

type StudentCardProps = {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
};

/* =======================
   STUDENT CARD
======================= */
const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  const { id, name, course } = student;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>{course}</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(student)}>
          <Text style={styles.edit}>Edit</Text>
        </Pressable>

        <Pressable onPress={() => onDelete(id)}>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* =======================
   MAIN SCREEN
======================= */
export default function StudentCRUD() {
  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Allen Marquez",
    age: 21,
    section: "4A",
    course: "BS Information Technology",
    contact: {
      phone: "09694828850",
      email: "kurt.marquez@gmail.com",
    },
    address: {
      barangay: "Bagong Silang",
      city: "Caloocan City",
      zipcode: 1400,
    },
  },
  {
    id: 2,
    name: "Nathaniel Abril",
    age: 24,
    section: "3B",
    course: "BS Computer Science",
    contact: {
      phone: "09173456789",
      email: "n.abril@email.com",
    },
    address: {
      barangay: "Talipapa",
      city: "Quezon City",
      zipcode: 1116,
    },
  },
  {
    id: 3,
    name: "Zydane Battad",
    age: 29,
    section: "4C",
    course: "BS Information Systems",
    contact: {
      phone: "09051122334",
      email: "zydane.battad@email.com",
    },
    address: {
      barangay: "San Antonio",
      city: "Pasig City",
      zipcode: 1600,
    },
  },
  {
    id: 4,
    name: "John Paul Reyes",
    age: 20,
    section: "2A",
    course: "Software Engineering",
    contact: {
      phone: "09987766554",
      email: "johnpaul.reyes@email.com",
    },
    address: {
      barangay: "Poblacion",
      city: "Makati City",
      zipcode: 1200,
    },
  },
  {
    id: 5,
    name: "Michael Torres",
    age: 22,
    section: "3A",
    course: "Data Science",
    contact: {
      phone: "09128899001",
      email: "michael.torres@email.com",
    },
    address: {
      barangay: "San Isidro",
      city: "Parañaque City",
      zipcode: 1700,
    },
  },
  {
    id: 6,
    name: "Angelica Cruz",
    age: 21,
    section: "4B",
    course: "Cybersecurity",
    contact: {
      phone: "09234567891",
      email: "angelica.cruz@email.com",
    },
    address: {
      barangay: "Commonwealth",
      city: "Quezon City",
      zipcode: 1121,
    },
  },
  {
    id: 7,
    name: "Joshua Lim",
    age: 19,
    section: "1C",
    course: "Game Development",
    contact: {
      phone: "09351234567",
      email: "joshua.lim@email.com",
    },
    address: {
      barangay: "Binondo",
      city: "Manila",
      zipcode: 1006,
    },
  },
  {
    id: 8,
    name: "Sophia Hernandez",
    age: 23,
    section: "3C",
    course: "Web & Mobile App Development",
    contact: {
      phone: "09461234589",
      email: "sophia.hernandez@email.com",
    },
    address: {
      barangay: "Sto. Niño",
      city: "Cebu City",
      zipcode: 6000,
    },
  },
  {
    id: 9,
    name: "Daniel Flores",
    age: 20,
    section: "2B",
    course: "Artificial Intelligence",
    contact: {
      phone: "09571234588",
      email: "daniel.flores@email.com",
    },
    address: {
      barangay: "San Jose",
      city: "Antipolo City",
      zipcode: 1870,
    },
  },
  {
    id: 10,
    name: "Patricia Gomez",
    age: 22,
    section: "4A",
    course: "Computer Engineering",
    contact: {
      phone: "09771234566",
      email: "patricia.gomez@email.com",
    },
    address: {
      barangay: "Santa Cruz",
      city: "Laguna",
      zipcode: 4009,
    },
  },

  ]);
  const [editingId, setEditingId] = useState<number | null>(null);


  const [forms, setForms] = useState<StudentForms>({
    name: "",
    age: "",
    section: "",
    course: "",
    contact: {
      phone: "",
      email: "",
    },
    address: {
      barangay: "",
      city: "",
      zipcode: "",
    },
  });

  /* =======================
     HELPERS
  ======================= */
  const resetForm = () => {
    setForms({
      name: "",
      age: "",
      section: "",
      course: "",
      contact: { phone: "", email: "" },
      address: { barangay: "", city: "", zipcode: "" },
    });
    setEditingId(null);
  };

  const updateForm = <K extends keyof StudentForms>(
    key: K,
    value: StudentForms[K]
  ) => {
    setForms(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNestedForm = <
    T extends "contact" | "address",
    K extends keyof StudentForms[T]
  >(
    parent: T,
    key: K,
    value: StudentForms[T][K]
  ) => {
    setForms(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  /* =======================
     CREATE
  ======================= */
  const addStudent = () => {
    if (!forms.name || !forms.course) return;

    const newStudent: Student = {
      id: Date.now(),
      name: forms.name,
      age: Number(forms.age),
      section: forms.section,
      course: forms.course,
      contact: {
        phone: forms.contact.phone,
        email: forms.contact.email,
      },
      address: {
        barangay: forms.address.barangay,
        city: forms.address.city,
        zipcode: Number(forms.address.zipcode),
      },
    };

    setStudents(prev => [...prev, newStudent]);
    resetForm();
  };

  /* =======================
     START EDIT
  ======================= */
  const startEdit = (student: Student) => {
    setEditingId(student.id);

    setForms({
      name: student.name,
      age: String(student.age),
      section: student.section,
      course: student.course,
      contact: {
        phone: student.contact.phone,
        email: student.contact.email,
      },
      address: {
        barangay: student.address.barangay,
        city: student.address.city,
        zipcode: String(student.address.zipcode),
      },
    });
  };

  /* =======================
     UPDATE
  ======================= */
  const updateStudent = () => {
    if (editingId === null) return;

    setStudents(prev =>
      prev.map(s =>
        s.id === editingId
          ? {
              ...s,
              name: forms.name,
              age: Number(forms.age),
              section: forms.section,
              course: forms.course,
              contact: {
                phone: forms.contact.phone,
                email: forms.contact.email,
              },
              address: {
                barangay: forms.address.barangay,
                city: forms.address.city,
                zipcode: Number(forms.address.zipcode),
              },
            }
          : s
      )
    );

    resetForm();
  };

  /* =======================
     DELETE
  ======================= */
  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {editingId ? "Edit Student" : "Add Student"}
      </Text>

      {/* FORM */}
      <TextInput
        placeholder="Name"
        value={forms.name}
        onChangeText={text => updateForm("name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        value={forms.age}
        onChangeText={text => updateForm("age", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Course"
        value={forms.course}
        onChangeText={text => updateForm("course", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={forms.contact.phone}
        onChangeText={text =>
          updateNestedForm("contact", "phone", text)
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={forms.contact.email}
        onChangeText={text =>
          updateNestedForm("contact", "email", text)
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Barangay"
        value={forms.address.barangay}
        onChangeText={text =>
          updateNestedForm("address", "barangay", text)
        }
        style={styles.input}
      />

      <TextInput
        placeholder="City"
        value={forms.address.city}
        onChangeText={text =>
          updateNestedForm("address", "city", text)
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Zipcode"
        keyboardType="numeric"
        value={forms.address.zipcode}
        onChangeText={text =>
          updateNestedForm("address", "zipcode", text)
        }
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={editingId ? updateStudent : addStudent}
      >
        <Text style={styles.buttonText}>
          {editingId ? "Update Student" : "Add Student"}
        </Text>
      </Pressable>

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onEdit={startEdit}
            onDelete={deleteStudent}
          />
        )}
      />
    </SafeAreaView>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    padding: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontWeight: "bold" },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 6,
  },
  edit: { color: "#2563EB", fontWeight: "bold" },
  delete: { color: "#DC2626", fontWeight: "bold" },
});
