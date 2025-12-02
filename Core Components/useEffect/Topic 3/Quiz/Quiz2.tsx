import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Appearance} from 'react-native';

export default function ThemeDetectorQuiz() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    setDarkMode(systemTheme === "dark");

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setDarkMode(colorScheme === "dark")
    })

    return () => subscription.remove();
  }, []);

  return (
    <View style = {[styles.container, {backgroundColor: darkMode ? '#121212' : '#f5f5f5'}]}>
      <Text style = {[styles.textTitle, {color: darkMode ? '#fff' : '#000'}]}> Auto Theme Demo</Text>

      <View style = {[styles.cardBox, {backgroundColor: darkMode ? '#121212' : '#f5f5f5', borderColor: darkMode ? '#444' : '#CCC' }]}>

      </View>

      <Text style = {[styles.textOutput, {color: darkMode ? '#fff' : '#000'}]}> Theme: {darkMode ? "Dark Mode" : "Light Mode"} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

  },

  textTitle: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  cardBox: {
    marginTop: 200,
    borderWidth: 1,
    width: 300,
    height: 200



  },

  textOutput: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  }
})