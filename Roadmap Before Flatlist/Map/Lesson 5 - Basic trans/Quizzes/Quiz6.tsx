import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';;

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
  price: number;
  image: any;
  creator: string;
  year: number
};

export default function MapQuiz6() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [shoes, setShoes] = useState<Shoes[]>([
    {id: 1, name: "Air max", price: 7500, creator: "Marie Odinot", year: 2018, image: require('../../../Images/airmax.jpg', )},
    {id: 2, name: "ultraboost 22", price: 9000, creator: "Adidas Innovation Team", year: 2022, image: require('../../../Images/ultraboost.jpg')},
    {id: 3, name: "classic leather", price: 4200, creator: "Paul Brown", year: 1983, image: require('../../../Images/classic.jpg')},
    {id: 4, name: "air force", price: 10000, creator: "Bruce Kilgore", year:  1982, image: require('../../../Images/airforce.jpg')},
    {id: 5, name: "nike vomero 18", price: 9500, creator: "Nike Running Team", year: 2024, image: require('../../../Images/Nike Vomero 18.jpg')},
    {id: 6, name: "air jordan", price: 15000, creator: "Peter Moore", year: 1985, image: require('../../../Images/airjordan.jpg')},
    {id: 7, name: "chuck", price: 3500, creator: "Marquis Converse", year: 1917, image: require('../../../Images/chuck.jpg')},
    {id: 8, name: "alphafly", price: 2000, creator: "Nike ZoomX Lab Team", year: 2023, image: require("../../../Images/Nike Alphafly 3 Men's Road Racing Shoes.jpg")},
    {id: 9, name: "pegasus", price: 20000, creator: "Nike Running Team", year:  2024, image: require('../../../Images/Nike Pegasus 41.jpg')},
    {id: 10, name: "nike structure", creator: "Nike Stability Team", year:2023, price: 10500, image: require('../../../Images/Nike Structure 26.jpg')},
   ]);

   const updated = shoes.map(({id, name, price, creator, year, image}) => ({
    id,
    name,
    price,
    creator,
    year,
    image,
    formattedPrice: price.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  }),
    status: price >= 5000 ? "Expensive" : "Cheap"
   }));

   return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Shoe's Store </Text>
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

      
      {updated.map(({id, name, price, creator, year, image, status, formattedPrice}) => (
       
          <Pressable key={id}
          onPress={() => {
            setSelectedId(id)
            Alert.alert(`You selected, ${name}`)
          }}
          style={[styles.card, {backgroundColor: selectedId === id ? theme.ripple : theme.background}]}>

            <View style = {[styles.imageandInfoRow, {backgroundColor: selectedId === id ? theme.ripple : theme.background}]}> 
              <Image source={image} style = {[styles.imageOutput]}/>
              
              <View style = {[styles.detailsContainer, {backgroundColor: selectedId === id ? theme.ripple : theme.background}]}> 
              <Text style = {[styles.textDetailsOutput, {color: selectedId === id ? theme.textPrimary : theme.textPrimary}]}> Name: {name.toLocaleUpperCase()} </Text>
              <Text style = {[styles.textDetailsOutput, {color: status === "Expensive" ? theme.error : theme.success}]}> Price: {formattedPrice} </Text>
              <View style = {[styles.divider, {backgroundColor:selectedId === id ? theme.textPrimary : theme.divider}]}/>
             
              </View>
            </View>
            
            
            <Text style = {[styles.textSecondaryDetails, {color: theme.textPrimary}]}> Creator: {creator} </Text>
            <Text style = {[styles.textSecondaryDetails, {color: theme.textPrimary}]}> Year Made: {year.toString()} </Text>
            <Text style = {[styles.textSecondaryDetails, {color: theme.textPrimary}]}> Status: {status} </Text>
          </Pressable>
        
      ))}
      </ScrollView>
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'

  },

  textTitle: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold'

  },

 

  card: {
    
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 5,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 1,
    alignSelf: "center",
    margin: 10,
    height: 270,


  },

  imageOutput: {
    width: 120,
    height: 150,
    borderRadius: 15,
    right: 20

  },

  detailsContainer: {
    justifyContent: 'center',
    flex: 1,
    gap: 5,
    

  },

  textDetailsOutput: {
    textAlign: 'auto',
    fontSize: 18,
    fontWeight: '900',
  

  },

  divider: {
    width: 212,
    height: 3,
    paddingVertical: 3,
    right: 17
    
    

  },

  textSecondaryDetails: {
    right: 10,
    top: 10,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '900',
    

  },

  imageandInfoRow: {
    flexDirection: 'row',

  }
})
      
   