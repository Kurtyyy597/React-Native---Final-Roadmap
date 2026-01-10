import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Alert, Modal, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  inputBackground: "#24262A",  // Matches modern dark surfaces
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
  sex: string;
  birthday: string;
  contact: {
    email: string;
    phone: number
  };
  address: {
    barangay: string;
    zipcode: number;
    city: string;
  };
  image?: any;
};

type studentHistory = {
  id: number;
  before: Student;
  after: Student
};


export default function DynamicUpdating() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [updatemodalVisible, setUpdateModalVisible] = useState<boolean>(false)
  const [historyUpdateModalVisible, setHistoryUpdateModalVisible] = useState<boolean>(false);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<number | null>(null);
  
  const [students, setStudents] = useState<Student[]>([
    {
    id: 1,
    name: "Kurt Marquez",
    age: 21,
    section: "BSIT-41",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Male",
    birthday: "June 10, 2004",
    contact: {
      email: "kurtmarquez238@gmail.com",
      phone: 639694828850,
    },
    address: {
      barangay: "Barangay 33",
      zipcode: 1410,
      city: "Caloocan City",
    },
    image: require("../../../Images/Kurt.jpg"),
  },
  {
    id: 2,
    name: "Angela Reyes",
    age: 20,
    section: "BSIT-41",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Female",
    birthday: "March 15, 2005",
    contact: {
      email: "angela.reyes@gmail.com",
      phone: 639178345210,
    },
    address: {
      barangay: "Barangay 12",
      zipcode: 1406,
      city: "Quezon City",
    },
    image: require("../../../Images/women1.jpg"),
  },
  {
    id: 3,
    name: "Joshua Lim",
    age: 22,
    section: "BSIT-42",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    sex: "Male",
    birthday: "August 2, 2003",
    contact: {
      email: "joshua.lim@gmail.com",
      phone: 639259874120,
    },
    address: {
      barangay: "Barangay 7",
      zipcode: 1105,
      city: "Quezon City",
    },
    image: require("../../../Images/men1.jpg"),
  },
  {
    id: 4,
    name: "Maria Santos",
    age: 21,
    section: "BSIT-41",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Female",
    birthday: "January 28, 2004",
    contact: {
      email: "maria.santos@gmail.com",
      phone: 639167234589,
    },
    address: {
      barangay: "Barangay 19",
      zipcode: 1400,
      city: "Caloocan City",
    },
    image: require("../../../Images/women2.jpg"),
  },
  {
    id: 5,
    name: "Daniel Cruz",
    age: 23,
    section: "BSIT-43",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Male",
    birthday: "November 11, 2002",
    contact: {
      email: "daniel.cruz@gmail.com",
      phone: 639309876451,
    },
    address: {
      barangay: "Barangay 5",
      zipcode: 1470,
      city: "Pasay City",
    },
    image: require("../../../Images/men2.jpg"),
  },
  {
    id: 6,
    name: "Nicole Tan",
    age: 20,
    section: "BSIT-42",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    sex: "Female",
    birthday: "July 9, 2005",
    contact: {
      email: "nicole.tan@gmail.com",
      phone: 639455678901,
    },
    address: {
      barangay: "Barangay 22",
      zipcode: 1500,
      city: "Makati City",
    },
    image: require("../../../Images/woemn3.jpg"),
  },
  {
    id: 7,
    name: "Mark Villanueva",
    age: 22,
    section: "BSIT-43",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Male",
    birthday: "April 4, 2003",
    contact: {
      email: "mark.v@gmail.com",
      phone: 639882134567,
    },
    address: {
      barangay: "Barangay 16",
      zipcode: 1300,
      city: "Pasay City",
    },
    image: require("../../../Images/men3.jpg"),
  },
  {
    id: 8,
    name: "Alyssa Gomez",
    age: 21,
    section: "BSIT-41",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Female",
    birthday: "December 19, 2004",
    contact: {
      email: "alyssa.gomez@gmail.com",
      phone: 639721345678,
    },
    address: {
      barangay: "Barangay 8",
      zipcode: 1200,
      city: "Manila",
    },
    image: require("../../../Images/women4.jpg"),
  },
  {
    id: 9,
    name: "Ryan Dela Cruz",
    age: 23,
    section: "BSIT-42",
    course: "Bachelor of Science in Information Technology",
    religion: "Christian",
    sex: "Male",
    birthday: "September 6, 2002",
    contact: {
      email: "ryan.dc@gmail.com",
      phone: 639998765432,
    },
    address: {
      barangay: "Barangay 3",
      zipcode: 1800,
      city: "Marikina City",
    },
    image: require("../../../Images/men4.jpg"),
  },
  {
    id: 10,
    name: "Sophia Navarro",
    age: 20,
    section: "BSIT-43",
    course: "Bachelor of Science in Information Technology",
    religion: "Catholic",
    sex: "Female",
    birthday: "May 25, 2005",
    contact: {
      email: "sophia.n@gmail.com",
      phone: 639601234567,
    },
    address: {
      barangay: "Barangay 10",
      zipcode: 1700,
      city: "Parañaque City",
    },
    image: require("../../../Images/women5.jpg"),
  },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editAge, setEditAge] = useState<string>("");
  const [editSection, setEditSection] = useState<string>("");
  const [editCourse, setEditCourse] = useState<string>("");
  const [editReligion, setEditReligion] = useState<string>("")
  const [editSex, setEditSex] = useState<string>("");
  const [editBirthday, setEditBirthday] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [editBarangay, setEditBarangay] = useState<string>("");
  const [editZipcode, setEditZipcode] = useState<string>("");
  const [editCity, setEditCity] = useState<string>("");
  const [editImage, setEditImage] = useState<any>(null);

  const [studentHistory, setStudentHistory] = useState<studentHistory[]>([]);

  const editStudent = (student: Student) => {
    

    setSelectedId(student.id);
    setEditName(student.name);
    setEditAge(String(student.age));
    setEditSection(student.section);
    setEditCourse(student.course);
    setEditReligion(student.religion);
    setEditSex(student.sex);
    setEditBirthday(student.birthday);
    setEditEmail(student.contact.email);
    setEditPhone(String(student.contact.phone));
    setEditBarangay(student.address.barangay)
    setEditZipcode(String(student.address.zipcode));
    setEditCity(student.address.city);
    setEditImage(student.image);



    Alert.alert(
      "Confirmation",
      `Are you sure you want to edit ${student.name}?`,
      [
        {text: "Cancel", style: 'cancel'},
        {
          text: "Confirm", style: "destructive",
          onPress: () => {
            setUpdateModalVisible(true);
          }
        }
      ]
    )

  };

  const updateStudent = () => {
    if (selectedId === null) return;

    const beforeStudent = students.find(stud => stud.id === selectedId);
    if (!beforeStudent) return;

    const afterStudent : Student = {
      ...beforeStudent,
      name: editName,
      age: (Number(editAge)),
      section: editSection,
      course: editCourse,
      religion: editReligion,
      sex: editSex,
      birthday: editBirthday,
      contact: {
        email: editEmail,
        phone: (Number(editPhone))
      },
      address: {
        barangay: editBarangay,
        zipcode: (Number(editZipcode)),
        city: editCity
      },
      image: editImage
    };

    setStudents(prev =>
      prev.map(student => student.id === selectedId ? afterStudent : student)
    );

    setStudentHistory(prev => [
      ...prev,
      {
        id: selectedId,
        before: beforeStudent,
        after: afterStudent
      },
    ]);

    setUpdateModalVisible(false);
    Alert.alert(`You successfully edit ${beforeStudent.name}'s information`);
};

const pickEditImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    setEditImage({ uri: result.assets[0].uri });
  }
};

const takeEditPhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
  mediaTypes: ["images"],
    quality: 1,
  });
  if (!result.canceled) {
    setEditImage({ uri: result.assets[0].uri });
  }
};

}