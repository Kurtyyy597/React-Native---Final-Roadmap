import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
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
}



type ButtonProps = {
  onPressAction: () => void
};

type ButtonGetAge = {
  result: string;
}

const ButtonGetAge = ({result} : ButtonGetAge) => {
  return <Text style={[styles.textOutput]}> {result} </Text> 
  
}

const SimpleAction = ({onPressAction} : ButtonProps) => {
  return (
    <Pressable style = {[styles.button]} onPress={onPressAction}>
      <Text style = {[styles.textButton]}> Press Me </Text>
    </Pressable>
  )
};


export default function FunctionParentandChildren() {
const [darkmode, setDarkmode] = useState<boolean>(false);
const theme = darkmode ? darkTheme : lightTheme
  const sayHello = () => {
    alert("Hello from the parent");
  };

  const getAge = (age: number) => {
    if (age >= 18) {
      return `adult`
    } else {
      return `teen ager`
    }
  };
  

  return (
    <SafeAreaView style = {[styles.container]}> 
      <Text style = {[styles.textTitle, {color: theme.textPrimary }]}> Passing Function Example </Text>
      <SimpleAction onPressAction={sayHello}/>
      <ButtonGetAge result={getAge(1)}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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

  container: {
    flex: 1,

  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  textOutput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})