const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};

// 🌙 Dark Mode Colors
const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export default function FullEventListeners() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get("window").height);

  const [ScreenWidth, setScreenWidth] = useState(Dimensions.get("screen").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("screen").height);

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({window, screen}) => {

      setWindowWidth(window.width);
      setWindowHeight(window.height);

      setScreenWidth(screen.width);
      setScreenHeight(screen.height);
    })

    return () => subscription.remove();
  }, []);

  return (
    <View style = {[styles.container, {backgroundColor: theme.accent}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary, backgroundColor: theme.accent}]}> 📐 DIMENSIONS DEMO </Text>


      <View style = {[styles.WindowContainer, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.textWindowOutput, {color: theme.textPrimary}]}> Window Width: {windowWidth} </Text>
        <Text style = {[styles.textWindowOutput, {color: theme.textPrimary}]}> Window Height: {windowHeight}</Text>
      </View>

      <View style = {[styles.ScreenContainer, {backgroundColor: theme.accent}]}>
        <Text style = {[styles.textHeightOutput, {color: theme.textPrimary}]}> Screen Width: {ScreenWidth} </Text>
        <Text style = {[styles.textHeightOutput, {color: theme.textPrimary}]}> Screen Height {screenHeight} </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    

  },

  textTitle: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
    borderWidth: 3,
    borderRadius: 5,
    width: 390,
    textAlign: 'center',
    


  },

  WindowContainer: {
    marginTop: 50,
    borderWidth: 3,
    width: 350,
    height: 100,
    borderRadius: 20,


  },

  textWindowOutput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    padding: 10,
    justifyContent: 'center',
    letterSpacing: 1
    
   
  },

  ScreenContainer: {
    marginTop: 50,
    borderWidth: 3,
    width: 350,
    height: 100,
    borderRadius: 20,


  },

  textHeightOutput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    padding: 10,
    justifyContent: 'center',
    letterSpacing: 1
 

  }
})