import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
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

type Shoes = {
  id: number;
  name: string;
  brand: string;
  type: string;
  year: number;
  creator: string;
  image?: any
};

export default function DestructuringinObjectsofArrays() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [shoes, setShoes] = useState<Shoes[]>([
    {id: 1, name: "Air Jordan 1", brand: "Nike", type: "Basketball", year: 1985, creator: "Peter Moore", image: require('../../Images/airjordan.jpg') },
    {id: 2, name: "Nike Air Force 1", brand: "Nike", type: "Basketball / Lifestyle", year: 1982, creator: "Bruce Kilgore", image: require('../../Images/airforce.jpg')},
    {id: 3, name: "Nike Air Max 1", brand: "Nike", type: "Running", year: 1987, creator: "Tinker Hatfield", image: require('../../Images/nikeairmax.jpg')},
    {id: 4, name: "Adidas Superstar", brand: "Adidas", type: "Basketball / Lifestyle", year: 1969, creator: "Horst Dassler", image: require('../../Images/superstar.jpg')},
    {id: 5, name: "Converse Chuck Taylor All Star", brand: "Converse", type: "Basketball / Lifestyle", year: 1917, creator: "Marquis Mills Converse", image: require('../../Images/chuck.jpg')},
  ]);

  const destructureObjects = shoes.map(({id, name, brand, type, year, creator, image}) => ({
    id,
    title: name,
    label: brand,
    class: type,
    made: year,
    ceo: creator,
    photo: image,

  }));

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

          <View style = {[styles.mainCard, {backgroundColor: theme.accent}]} > 
          {destructureObjects.map((des) => (
            <View key={des.id} style = {[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
             
              
              <Text style = {[styles.textTitle, {color: theme.accent}]}> Shoes Info </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              {/* Image and Information Row */}
              <View style = {[styles.imageandInfoRow]}>
                <Image source={des.photo} style = {[styles.imageOutput]}/>
                <View style = {[styles.viewOutputFlexInfo]}> 
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> {des.title} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Brand: {des.label} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Type: {des.class} </Text>
                  <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                </View>
                {/* Image and Information Row */}

             
              </View>
                 {/* Text Section Info */}
                <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Year made: {des.made} </Text>
                <Text style = {[styles.textSection, {color: theme.textPrimary}]}> Creator: {des.ceo} </Text>
                {/* Text Section Info */}
              
            </View>
          ))}
          </View>

      </ScrollView>
    </SafeAreaView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  
  },

  mainCard: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 1,
    alignSelf: "center",

  },

  card: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",
    margin: 10,
    height: 270,

  },
  
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  divider: {
  
    width: '100%',
    height: 2,
    paddingVertical: 3

  },

  imageandInfoRow: {
    flexDirection: 'row',
    gap: 10,
  


  },

  imageOutput: {
    height: 100,
    width: 100,
    borderRadius: 20

  },

  viewOutputFlexInfo: {
    flex: 1,
    justifyContent: 'center'


  },

  textOutput: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3

  },

  textSection: {
    fontSize: 16,
    fontWeight: '700',
    bottom: 5
    

  },

  accentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 8,
    height:  265,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 39,
  },

  accentRight: {
  position: "absolute",
  right: 0,
  top: 0,
  width: 8,
  height:  265,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  
},

accentTop: {
  position: "absolute",
  top: 0,
  left: 0,
  height: 10,
  width: 340,
 
  borderRadius: 20
  
},

accentBottom: {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: 10,
  width:  340,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
 
},



  


})