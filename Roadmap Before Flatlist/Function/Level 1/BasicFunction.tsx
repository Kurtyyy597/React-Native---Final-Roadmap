import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Image} from 'react-native';
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

export default function BasicFunctions() {
  const [darkMode, setDarkmode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [mode, setMode] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [bgColor, setBgColor] = useState<any>(null);

  function getColor(mode: string) {
    const lowMode = mode.trim().toLowerCase();

    if (lowMode === "happy") {
      return {
        image: require('../../../Images/happy.jpg'),
        backgroundColor: '#83fb0bff'
      }
    };

    if (lowMode === "sad") {
      return {
        image: require('../../../Images/sad.jpg'),
        backgroundColor: '#f73509ff'
      }
    };

    return {
      backgroundColor: '#07f3ffff'
    }
    

  }

 
  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: bgColor}]}>
      <TextInput
      style={[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
      placeholder="Type mood (happy/sad/excited/"
      placeholderTextColor={theme.textPrimary}
      value={mode}
      onChangeText={setMode}
      cursorColor={theme.accent}
      onFocus={() => console.log("Focus")}
      onBlur={() => console.log("Blur")}/>
      
      <Pressable
      onPress={() => {
        const getImage = getColor(mode)
        setImage(getImage?.image);
        setBgColor(getImage?.backgroundColor)
      }}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.1 }]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Get Mode </Text>
      </Pressable>

      {image ? (
        <Image source={image} style = {[styles.imageOutput]}/>
      ) : (
        <Text style = {[styles.imageError, {color: theme.error}]}> No Image Available </Text>
      )}

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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

  textOutput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  button: {
  marginTop: 10,
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
  },

  imageOutput: {
    marginTop: 50,
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center'
  },

  imageError: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
})