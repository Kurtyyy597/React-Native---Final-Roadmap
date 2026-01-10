import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, Image} from 'react-native';
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

export default function FunctionLevel1Task1() {
  const [darkMode, setDarkmode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [inputStatus, setInputStatus] = useState<string>("");
  const [statusOutput, setStatusOutput] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [image, setImage] = useState<any>(null);


  function getStatusandColor(status: string) {
    const s =  status.trim().toLowerCase();

    if (s === "passed") {
      return {
        message: "Congrats you pass the exam!",
        backgroundColor: '#ffe209ff',
        image: require('../../../Images/happy.jpg')
      }
    };

    if (s === "needs improvement") {
      return {
        message: "Its okay you can be better just practice!",
        backgroundColor: '#727171ff',
        image: require('../../../Images/focus.jpg')
      }
    };

    if (s === "very good") {
      return {
        message: "Congrats! you are almost latin honor",
        backgroundColor: '#0af535ff',
        image: require('../../../Images/excited.jpg')

      }
    };

    if (s === "outstanding") {
      return {
        message: "Congrats on being outstanding!",
        backgroundColor: '#5401fcff',
        image: require('../../../Images/men1.jpg')
      }
    }
    return {
      message: "Its okay if you failed right now. You can do it again!",
      backgroundColor: '#fff',
      image: require('../../../Images/sad.jpg')
    }
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: bgColor}]}>

      <TextInput style= {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
      placeholder='type your grade status'
      value={inputStatus}
      onChangeText={setInputStatus}
      placeholderTextColor={theme.textPrimary}
      cursorColor={theme.accent}/>

      <Pressable
      onPress={() => {
        const result = getStatusandColor(inputStatus);
        setStatusOutput(result.message);
        setBgColor(result.backgroundColor);
        setImage(result.image);
      }}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button,
      pressed && {opacity: 0.8 }]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Check Status </Text>
      </Pressable>

      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {statusOutput.toWellFormed()}</Text>
      {image && (
        <Image source={image} style = {[styles.imageOutput]}/>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
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
  
  borderColor: "#E5E7EB",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
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
  },

  textOutput: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  imageOutput: {
    width: 200,
    height: 150,
    borderRadius: 20,
    alignSelf: 'center'
  }
})