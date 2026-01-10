import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
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

export default function FilterLesson1() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [numbers, setNumbers] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]);

  const findGreaterthan2 = () => {
    const filtered = numbers.filter(n => n > 9);
    setNumbers(filtered);
  };

  return (

    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
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

      
      <Text style = {{color: theme.textPrimary, fontSize: 26, textAlign: 'center', fontWeight: 'bold'}}>
        Filter Introduction
      </Text>

      {numbers.map((n, index) => (
        <View key={index} style = {[styles.card, {backgroundColor: theme.inputBackground}]}>
        <Text style = {{color: theme.accent, fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
          Numbers 
        </Text>
        <Text style = {[styles.numberOutput, {color: theme.textPrimary}]}> {index + 1}. {n} </Text>
        
          <Pressable
          onPress={findGreaterthan2}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.buttonFind,
          pressed && {opacity: 0.1 }]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Filter &gt;  2</Text>
          </Pressable>
          
        </View>
        
        
      ))}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  card: {
  width: "85%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  borderWidth: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
  alignSelf: "center",


  },

  numberOutput: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  buttonFind: {
    paddingVertical: 10,
    backgroundColor: "#FACC15",
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf:'center'

  },

  textButton: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  }
})