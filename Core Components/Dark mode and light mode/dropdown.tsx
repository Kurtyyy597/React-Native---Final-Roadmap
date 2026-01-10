import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

type ThemeMode = "light" | "dark";

export default function DarkmodeandLightmodewithDropdown() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
       <Pressable
        onPress={() => setOpenDropdown(prev => !prev)}
        onLongPress={() => alert("Long pressed")}
        delayLongPress={400}
        android_ripple={{ color: "#4818e5ff" }}
        hitSlop={10}
        accessibilityRole="button"
        style={({ pressed }) => [
        styles.optionRow,
        pressed && {opacity: 0.1 },]}>
           
            <Text style = {[styles.textThemeContent,  {color: theme.textPrimary, fontWeight: themeMode === "light" ? "bold" : 'bold'}]}>
              {themeMode === "light" ? "Light Mode" : "Dark Mode"}▼
            </Text>
      </Pressable>
      
      {openDropdown && (
        <View style = {[styles.dropDown, {backgroundColor: theme.background, borderColor: theme.border}]}>
        <Pressable
        onPress={() => {
        setThemeMode('light')
        setOpenDropdown(false);
      }}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.buttonLightmode,
      pressed && {opacity: 0.1 }]}>
        <Ionicons
        name="sunny-outline"
        size={20}
        color={theme.textPrimary}/>
        <Text style = {[styles.textLightmode, {color: theme.textPrimary, fontWeight: themeMode === "light" ? "bold" : "100"}]}>
          Light Mode
        </Text>
      </Pressable>

      <Pressable
      onPress={() => {
        setThemeMode('dark')
        setOpenDropdown(false);
      }}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.buttonDarkmode,
      pressed && {opacity: 0.1 }]}>
        <Ionicons
        name="moon-outline"
        size={20}
        color={theme.textPrimary}/>
        <Text style = {[styles.textDarkmode, {color: theme.textPrimary, fontWeight: themeMode === "dark" ? "bold" : "100"}]}>
          Dark Mode
        </Text>
      </Pressable>
      </View>

      )}
      

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  optionRow: {
    
    paddingHorizontal: 20,
    marginBottom: 10

  },

  textThemeTitle: {
    fontSize: 14,
    fontStyle: 'italic'
    
  },

  textThemeContent: {
    fontSize: 14

  },

  buttonLightmode: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 20
    

  },

  textLightmode: {
    fontSize: 14,


  },

  buttonDarkmode: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 20

  },

  textDarkmode: {
    fontSize: 14,


  },

  dropDown: {
    
    gap: 10,
    overflow: "hidden",

  }






  
})