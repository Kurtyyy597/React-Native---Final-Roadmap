import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, Pressable, BackHandler, StyleSheet, TextInput, Keyboard } from 'react-native';
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
  { id: 1, name: "Juan Dela Cruz", age: 20, section: "A" },
  { id: 2, name: "Maria Santos", age: 19, section: "B" },
  { id: 3, name: "Carlos Reyes", age: 21, section: "A" },
  { id: 4, name: "Anne Villanueva", age: 22, section: "C" },
  { id: 5, name: "Mark Lopez", age: 18, section: "B" },
  { id: 6, name: "Sophia Cruz", age: 20, section: "A" },
  { id: 7, name: "Daniel Mendoza", age: 23, section: "C" },
  { id: 8, name: "Patricia Gomez", age: 19, section: "B" },
  { id: 9, name: "Joshua Ramirez", age: 21, section: "A" },
  { id: 10, name: "Nicole Fernandez", age: 18, section: "C" },
]);

export default function SearchFlatList() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const theme = darkmode ? darkTheme : lightTheme;
  const [students, setStudents] = useState<Student[]>(ORIGINALSTUDENTS);
  const inputRef = useRef<TextInput>(null);

  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [recent, setRecent] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  

  const onChangeSearch = (text: string) => {
    setInput(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    };

    debounceRef.current = setTimeout(() => {
      setQuery(text.trim().toLowerCase());
    }, 300);
  };

  const onSubmit = () => {
    const value = input.trim().toLowerCase();

    setHasSubmitted(true);

    if (!value) {
        inputRef.current?.blur();
          setIsFocused(false);
      setQuery("");
      Keyboard.dismiss();
      return;
    }
    setRecent(prev => {
      const withoutDup = prev.filter(v => v !== value);
      return [value, ...withoutDup].slice(0, 9)
    });
    Keyboard.dismiss();
  };

  const filtered = students.filter(s => 
    s.name.trim().toLowerCase().includes(query) ||
    s.section.trim().toLowerCase().includes(query) ||
    s.age >= 39
  );
  
useEffect(() => {
  const hideSub = Keyboard.addListener("keyboardDidHide", () => {
    inputRef.current?.blur(); // 👈 THIS removes cursor
  });

  return () => hideSub.remove();
}, []);

const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectStudent = (id: number) => {
    setSelectedId(prev =>
    (prev === id ? null : id)
    );
  }

  const renderStudent = ({item, index} : {item: Student, index: number}) => {
    const isSelected = item.id === selectedId
    return (
      <Pressable
        onPress={() => selectStudent(item.id)}
        onLongPress={() => alert(`Long pressed: ${item.name}`)}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.studentCard, {backgroundColor: theme.inputBackground},
        pressed && styles.selectedStudent,
        isSelected && styles.selectedCard]}>
          <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Student #{index + 1} Info </Text>
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
          {isSelected && (
            <Text style = {[styles.check, {color: theme.accent}]}> Selected </Text>
          )}
        </Pressable>
    )
  };

  const header = () => {
    return (
      <View style = {[styles.headerContainer, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textTitleHeader]}> Student Lists </Text>
      </View>
    )
  };

  const footer = () => {
    return (
      <View style =  {[styles.footerContainer, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textFooterTitle, {color: theme.textPrimary}]}> click + to add more</Text>
      </View>
    )
  };

  const separator = () => (
    <View style = {[styles.separator, {backgroundColor: theme.background}]}/>
  );

  const emptyComponent = () => {
   if (hasSubmitted && query.length >= 0) {
    return (
      <View style = {[styles.emptyContainer, {backgroundColor: theme.background}]}>
        <Text style = {[styles.textEmptyError, {color: theme.error}]}> No matches found </Text>
      </View>
    )
   } 
  }


  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <TextInput
      ref={inputRef}
      placeholder='Search students...'
      value={input}
      onChangeText={onChangeSearch}
      onSubmitEditing={onSubmit}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style = {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
      returnKeyType='search'/>

      {isFocused && hasSubmitted && recent.length > 0 && (
        <View style = {[styles.recentSearchesContainer, {backgroundColor: theme.background}]}>
          <Text style = {[styles.recentTextTitle, {color: theme.textPrimary}]}> Recent searches </Text>
          {recent.map((item, index) => (
            <Pressable
            key={item}
            onPress={() => {
              setQuery(item);
              setInput(item);
              Keyboard.dismiss()
            }}>
              <Text style = {[styles.textRecentContent, {color: theme.textPrimary}]}> {index + 1}. {item} </Text>
            </Pressable>
          ))}
        </View>
      )}

      <FlatList
      data={filtered}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderStudent}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ItemSeparatorComponent={separator}
      ListEmptyComponent={emptyComponent}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  studentCard: {
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

  selectedStudent: {
    opacity: 0.1
  },

  selectedCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#60A5FA",
    borderRightWidth: 5,
    borderRightColor:  "#60A5FA",

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
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  textLabel: {
    fontSize: 12,

  },

  textContent: {
    fontSize: 15,
    fontWeight: 'bold'

  },

  check: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'

  },

  headerContainer: {

  },

  textTitleHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },

  footerContainer: {

  },

  textFooterTitle: {
    textAlign: 'center',
    fontSize: 16

  },

  separator: {
    height: 10

  },

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
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,

  },

  emptyContainer: {

  },

  textEmptyError: {
    textAlign: 'center',
    fontSize: 15,
  },

  recentSearchesContainer: {

  },

  recentTextTitle: {
    fontSize: 12,
  },

  textRecentContent: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})

