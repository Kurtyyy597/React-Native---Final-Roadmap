import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, ScrollView} from 'react-native';
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

type Item = {
  id: number;
  name: string;
  price: number;
};

export default function FilterWithSearch() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalItem : Item[] = ([
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Smartphone", price: 28000 },
    { id: 3, name: "Tablet", price: 18000 },
    { id: 4, name: "Headphones", price: 2500 },
    { id: 5, name: "Keyboard", price: 1500 },
    { id: 6, name: "Mouse", price: 900 },
    { id: 7, name: "Monitor", price: 12000 },
    { id: 8, name: "External Hard Drive", price: 3500 },
    { id: 9, name: "USB Flash Drive", price: 600 },
    { id: 10, name: "Webcam", price: 2200 },

    { id: 11, name: "Bluetooth Speaker", price: 3200 },
    { id: 12, name: "Power Bank", price: 1800 },
    { id: 13, name: "Smart Watch", price: 9500 },
    { id: 14, name: "Printer", price: 7800 },
    { id: 15, name: "Scanner", price: 6800 },
    { id: 16, name: "Router", price: 2400 },
    { id: 17, name: "Microphone", price: 4100 },
    { id: 18, name: "Graphics Tablet", price: 5600 },
    { id: 19, name: "Desk Lamp", price: 1200 },
    { id: 20, name: "Office Chair", price: 8900 },
  ]);

  const [items, setItems] = useState<Item[]>(originalItem);

  const [searchText, setSearchText] = useState<string>("");

  const toggleItem = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setItems(originalItem);
      return;
    };

    const filtered = originalItem.filter(i =>
      i.name.toLowerCase().includes(text.toLowerCase())
    );
    setItems(filtered);
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <TextInput style = {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
      placeholder='search item'
      value={searchText}
      onChangeText={toggleItem}
      placeholderTextColor={theme.textPrimary}
      cursorColor={theme.accent}
      onFocus={() => console.log("Focus")}
      onBlur={() => console.log("Blur")}/>

      {items.length === 0 && searchText.trim() !== "" && (
        <Text style = {[styles.textError, {color: theme.error}]}> No matches </Text>
      )}

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

        <View style = {[styles.cardContainer, {backgroundColor: theme.accent}]}>
          {items.map(({id, name, price}) => (
            <View key={id} style = {[styles.card, {backgroundColor: theme.accent}]}>
              <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {name} - {price} </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  textError: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

  cardContainer: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
    justifyContent: 'space-between',
  },

  card: {
    width: "48%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    

  },

  textOutput: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'

  }
})