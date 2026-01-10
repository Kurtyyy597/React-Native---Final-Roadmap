import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
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
};


const ORIGINALSTUDENTS : Student[] = ([
  {id: 1, name: "Kurt Allen A. Marquez", age: 21, section: "BSIT-41"}
]);

export default function FlatListWithLoadingTryKo() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;

  const [loading, setLoading] = useState<boolean>(false);
  const [hasEnough, setHasEnough] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(0);

  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);

  const renderStudent = ({item, index} : {item: Student, index: number}) => {
    return (
      <View style = {[styles.studentCard, {backgroundColor: theme.inputBackground}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student #{index + 1} Info  </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Name: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.name} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Age: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.age} </Text>
        </View>
        <View style = {[styles.infoRow, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textLabel, {color: theme.textPrimary}]}> Section: </Text>
          <Text style = {[styles.textContent, {color: theme.textPrimary}]}> {item.section} </Text>
        </View>
      </View>
    )
  };

  const header = () => {
    return (
      <View style = {[styles.headerContainer, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textHeaderTitle, {color: theme.textPrimary}]}> Student Lists </Text>
        <Text style = {[styles.textHeaderSub, {color: theme.textPrimary}]}> click + to see more </Text>
          <Pressable
          onPress={getMoreStudents}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonAdd,
          pressed && {opacity: 0.1 }]}>
            <Text style = {[styles.textButtonAdd, {color: theme.textPrimary}]}> +  </Text>
        </Pressable>
       
      </View>
    )
  };

 const getMoreStudents = () => {
  if (loading || !hasEnough) return;

  setLoading(true);
  setSeconds(3);

  const interval = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        clearInterval(interval);

        setStudents(prevStudents => {
          const updated = [
            ...prevStudents,
            {
              id: prevStudents.length + 1,
              name: "Nathaniel",
              age: 34,
              section: "BSIT-31",
            },
          ];

          if (updated.length >= 5) {
            setHasEnough(false);
          }

          return updated;
        });

        setLoading(false);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);
};




  const footer = () => {
    if (loading) {
      return (
        <View style = {[styles.footerContainer, {backgroundColor: theme.background}]}>
          <ActivityIndicator size={'large'} color={theme.accent} animating={true}/>
          <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Loading students... {seconds}s </Text>
        </View>
      )
    };

    if (!hasEnough) {
      return (
        <Text style = {[styles.textLimitStudents, {color: theme.error}]}> Student has reached its maximum length.  </Text>
      )
    }
  };

  const emptyComponent = () => {
    return (
      <View style = {[styles.emptyContainer, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textNoStudents, {color: theme.error}]}> No Students yet </Text>
        <Text style = {[styles.textNoStudentsSub, {color: theme.textPrimary}]}> Tap + to add Students </Text>
      </View>
    )
  };

  const clearList = () => {
    setStudents([]);
    setHasEnough(true);
    setLoading(false);
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListHeaderComponent={header}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={footer}
      ItemSeparatorComponent={Separator}
      />

     

         <Pressable
          onPress={clearList}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonClear,
          pressed && {opacity: 0.1 }]}>
            <Text style = {[styles.textButtonClear, {color: theme.textPrimary}]}> Clear Students </Text>
          </Pressable>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  studentCard: {
  marginTop: 10,
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
    fontSize: 18,
    fontWeight: 'bold'

  },

  divider: {
    paddingVertical: 2

  },

  infoRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#4ADE80",

  },

  textLabel: {
    fontSize: 12

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  headerContainer: {
    gap: 5,


  },

  textHeaderTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textHeaderSub: {
    fontSize: 14,
    textAlign: 'center'

  },

  buttonClear: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: "#4ADE80",
    marginBottom: 10,


  },

  textButtonClear: {
    fontWeight: 'bold',

  },

  footerContainer: {
    gap: 5

  },

  textLoading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18

  },

  textLimitStudents: {
    textAlign: 'center',
    fontSize: 15,


  },

  emptyContainer: {
    alignItems: 'center',
    gap: 5

  },

  textNoStudents: {
    textAlign: 'center',
    fontSize: 15,

  },

  textNoStudentsSub: {
    fontSize: 12,
    textAlign: 'center'

  },

  buttonAdd: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",


  },

  textButtonAdd: {
     textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20

  },

  separator: {
    height: 10,
 
  }


})