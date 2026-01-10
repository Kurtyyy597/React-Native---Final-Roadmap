import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function TransformationMap() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  
  const scores : number[] = [1, 3, 5, 7, 9, 11];

  const minusScore = scores.map((score) => score - 1);
  const convertNum = scores.map((score) => `Score: ${score}\n`);
  const listwithNum = scores.map((score, index) => `${index + 1}. ${score}\n`);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView 
      contentContainerStyle={{ padding: 10 }}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      onScrollBeginDrag={() => console.log("Scrolling...")}>

      <View style = {[styles.card, {backgroundColor: theme.success}]}>
        <Text style = {[styles.textTitleRoot, {color: theme.textPrimary}]}>Mapping Shopping: </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Original Scores </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {scores.join(" ")} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Scores - 1 </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {minusScore.join(" ")} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Scores convert to string </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {convertNum.join(" ")} </Text>
        <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Scores with number </Text>
        <Text style = {[styles.textSection, {color: theme.textPrimary}]}> {listwithNum.join(" ")} </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 30,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center'
  },

  divider: {
    height: 2,
    width: '100%',
    marginVertical: 5
  },

  textTitleRoot: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    
  },

  textTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textSection: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic'

  }


})