import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';

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

export default function ArraysBasics() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme: lightTheme;

  const names: string[] = [" Kurt ", " Allen ", " Marquez "];
  const age : number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const mix : (string | number)[] = [" Kurt Allen Marquez ", 1,  2, 4, 5, 6, 8];

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      

      <Text style = {[styles.titleText, {color: theme.textPrimary}]}>
        ARRAYS BASICS
      </Text>

      <KeyboardAvoidingView
      behavior='height'
      style={{flex: 1}}>

        <ScrollView
        contentContainerStyle={{padding: 20, flexGrow: 1, justifyContent: 'center'}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        onScrollBeginDrag={() => console.log("Scrolling...")}>
          
          
          <View style = {[styles.stringArrayContainer, {backgroundColor: theme.background}]}> 
            <View style = {[styles.stringCard, {backgroundColor: theme.success}]}> 
            <Text style = {[styles.stringArrayTextTitle, {color: theme.textPrimary}]}>
              Array String Typescript: {names}
            </Text>

            <Text style = {[styles.stringArrayText, {color: theme.textPrimary}]}>
              Array String 1: {names[0]}
            </Text>

            <Text style = {[styles.stringArrayText, {color: theme.textPrimary}]}>
              Array String 2: {names[1]}
            </Text>

            <Text style = {[styles.stringArrayText, {color: theme.textPrimary}]}>
              Array String 3: {names[2]}
            </Text>
            </View>
          </View>

          <View style = {[styles.numberArrayContainer, {backgroundColor: theme.background}]}>

            <View style = {[styles.numberCard, {backgroundColor: theme.warning}]}>
              <Text style = {[styles.numberTitleText, {color: theme.textPrimary}]}> Number Arrays: {age} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 1: {age[0]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 2: {age[1]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 3: {age[2]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 4: {age[3]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 5: {age[4]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 6: {age[5]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 7: {age[6]} </Text>
              <Text style = {[styles.numberArrayText, {color: theme.textPrimary}]}> Number 8: {age[7]} </Text>
              
            </View>
          </View>

          <View style = {[styles.mixArrayContainer, {backgroundColor: theme.background}]}>
            <View style = {[styles.mixCard, {backgroundColor: theme.divider}]}>
              <Text style = {[styles.mixTextTitle, {color: theme.textPrimary}]}> MIX ARRRAYS: {mix} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[0]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[1]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[2]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[3]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[4]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[5]} </Text>
              <Text style = {[styles.mixTextOutput, {color: theme.textPrimary}]}> Mix 1: {mix[6]} </Text>
            </View>
          </View>



        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    alignItems: 'center'
    
    
    

  },

  titleText: {
    fontSize: 22,
    alignItems: 'center',
    fontWeight: 'bold'

  },

  stringArrayContainer: {
    width: '100%',
    margin: 10,
    
    
    
   
     
   
    

  },

  stringCard: {
  alignItems: 'center',
  gap: 5,
  padding: 10,
  borderRadius: 10,
  paddingVertical: 10,
  elevation: 10,
  shadowColor: '#fefeffff',
  shadowOpacity: 0.15,
  shadowOffset: { width: 3, height: 2 },
  shadowRadius: 19,
  marginVertical: 2,
    
 
  
  


  },

  stringArrayTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    

  },

  stringArrayText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'

  },

  numberArrayContainer: {
    width: '100%',
    margin: 10
   

    


  },

  numberCard: {
  alignItems: 'center',
  gap: 5,
  padding: 10,
  borderRadius: 10,
  paddingVertical: 10,
  elevation: 10,
  shadowColor: '#fefeffff',
  shadowOpacity: 0.15,
  shadowOffset: { width: 3, height: 2 },
  shadowRadius: 19,
  marginVertical: 2,


  },

  numberTitleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  numberArrayText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'

  },

  mixArrayContainer: {
    width: '100%',
    margin: 10

  },

  mixCard: {
  alignItems: 'center',
  gap: 5,
  padding: 10,
  borderRadius: 10,
  paddingVertical: 10,
  elevation: 10,
  shadowColor: '#fefeffff',
  shadowOpacity: 0.15,
  shadowOffset: { width: 3, height: 2 },
  shadowRadius: 19,
  marginVertical: 2,

  },

  mixTextTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'


  },

  mixTextOutput: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'

  },








})
