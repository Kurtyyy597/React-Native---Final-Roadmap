import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native'
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

type Book = {
  id: number;
  title: string;
  pages: number;
};

export default function MapQuiz5() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Naruto", pages: 210 },
    { id: 2, title: "One Piece", pages: 950 },
    { id: 3, title: "Demon Slayer", pages: 180 },
  ]);

  const updated = books.map(({id, title, pages}) => ({
    id,
    title,
    pages,
    summary: `${title} has ${pages} pages`,
    longBook: pages >= 300
  }));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Book Info </Text>
        <View style = {[styles.divider, {backgroundColor: theme.accent}]}/>
        {updated.map((up) => (
          <View key={up.id} style = {[styles.outputContainer, {backgroundColor: theme.surface}]}>
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {up.id}. Title: {up.title} </Text>
           
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Pages: {up.pages} </Text>
         
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Summary: {up.summary} </Text>
           
            <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Long Book: {up.longBook ? "True" : "False"} </Text>
            <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

          </View>
        ))}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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

  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  outputContainer: {
    justifyContent: 'center'
  },

  textOutput: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left'
  },

  divider: {
    width: '100%',
    height: 2,
    paddingVertical: 2,
  }
})