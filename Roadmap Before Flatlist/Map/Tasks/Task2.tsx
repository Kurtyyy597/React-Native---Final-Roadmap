import React, {useState}  from 'react';
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

export default function MappingQuiz2() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const fruits : string[] = ["Apple", "Banana", "Mango", "Strawberry", "Rambutan"];

  const cardFruits = fruits.map((fruit, index) => (
    <View key={index}
    style= {[styles.fruitCard, {backgroundColor: theme.success, borderColor: theme.border}]}>
      <Text style = {[styles.textFruitTitle, {color: theme.textPrimary}]}> Fruit Cards inside javascript. </Text>
      <Text style = {[styles.textFruitSection, {color: theme.textPrimary}]}> fruit #{index + 1}. {fruit} </Text>
    </View>
  ));

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
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
     
      <View style = {[styles.card, {backgroundColor: theme.surface}]}>
        <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Map Quiz 2</Text>
        <View style={[styles.divider, { backgroundColor: theme.accent }]} />

        <View style = {[styles.listContainer]}>{cardFruits}</View>

      
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
    margin: 30,
    padding: 20,
    borderRadius: 20
  },

  textTitle: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  divider: {
    height: 3,
    width: 'auto',
    marginVertical: 10

  },

  listContainer: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
    
 

  },

  fruitCard: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    gap: 10,
    margin: 20,
    padding: 25,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 30
 
    
    
    
    


  },

  textFruitTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textFruitSection: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic'

  }
})

  