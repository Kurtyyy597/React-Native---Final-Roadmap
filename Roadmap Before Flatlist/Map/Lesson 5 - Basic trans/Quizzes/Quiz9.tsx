import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert, ScrollView, Switch, Image} from 'react-native';
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
  description: string;
  name: string;
  price: number;
  creator: string;
  year: number;
  image: any;
  favorite: boolean;
};

export default function MapQuiz9() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const theme = darkMode ? darkTheme : lightTheme

  const [shoes, setShoes] = useState<Shoes[]>([
    { 
    id: 1, 
    name: "Nike Air Max 90", 
    description: "Iconic running shoe known for its Air cushioning and timeless design.",
    price: 6500, 
    creator: "Tinker Hatfield", 
    year: 1990, 
    favorite: true,
    image: require("../../../Images/airmax.jpg") 
  },
  { 
    id: 2, 
    name: "Adidas Ultraboost 21", 
    description: "High-performance running sneaker with boosted energy return.",
    price: 8200, 
    creator: "Adidas Innovation Team", 
    year: 2021, 
    favorite: true,
    image: require("../../../Images/ultraboost.jpg") 
  },
  { 
    id: 3, 
    name: "Puma RS-X Reinvention", 
    description: "Chunky retro-style shoe with bold colors and RS cushioning.",
    price: 5800, 
    creator: "Puma Sportstyle Team", 
    year: 2018, 
    favorite: true,
    image: require("../../../Images/puma.jpg") 
  },
  { 
    id: 4, 
    name: "New Balance 550", 
    description: "Vintage basketball design revived from the NB archives.",
    price: 7200, 
    creator: "Steven Smith", 
    year: 1989, 
    favorite: true,
    image: require("../../../Images/newbalance.jpg") 
  },
  { 
    id: 5, 
    name: "Nike Dunk Low Panda", 
    description: "A modern lifestyle favorite with simple black and white styling.",
    price: 7500, 
    creator: "Nike Sportswear Team", 
    year: 2020, 
    favorite: true,
    image: require("../../../Images/lowpanda.jpg") 
  },
  { 
    id: 6, 
    name: "Adidas Samba OG", 
    description: "Classic indoor training shoe turned streetwear staple.",
    price: 6800, 
    creator: "Adolf Dassler", 
    year: 1950, 
    favorite: true,
    image: require("../../../Images/samba.jpg") 
  },
  { 
    id: 7, 
    name: "Nike Air Force 1", 
    description: "One of the most iconic sneakers ever made, timeless and versatile.",
    price: 6000, 
    creator: "Bruce Kilgore", 
    year: 1982, 
    favorite: true,
    image: require("../../../Images/airforce.jpg") 
  },
  { 
    id: 8, 
    name: "Converse Chuck Taylor 70s", 
    description: "Historic sneaker known for canvas build and retro rubber toe.",
    price: 3900, 
    creator: "Chuck Taylor", 
    year: 1917, 
    favorite: true,
    image: require("../../../Images/chuck.jpg") 
  },
  { 
    id: 9, 
    name: "Vans Old Skool", 
    description: "Skate classic featuring durable suede and signature side stripe.",
    price: 4200, 
    creator: "Paul Van Doren", 
    year: 1977, 
    favorite: true,
    image: require("../../../Images/Nike Vomero 18.jpg") 
  },
  { 
    id: 10, 
    name: "Jordan 1 Retro High", 
    description: "Legendary basketball shoe worn by Michael Jordan and loved worldwide.",
    price: 9500, 
    creator: "Peter Moore", 
    year: 1985, 
    favorite: true,
    image: require("../../../Images/airjordan.jpg") 
  },
  ]);

  const toggleFavorite = (id: number) => {
    setShoes(prev => 
      prev.map((shoes) => shoes.id === id ? {...shoes, favorite: !shoes.favorite} : shoes)
    )
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.cardShadow}]}>
      <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> Shoe's Shop </Text>
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

        <View style = {[styles.gridContainer]}>
          {shoes.map(({id, name, description, price, creator, year, favorite, image}) => (
            <Pressable key={id} style = {[styles.card, {backgroundColor: favorite ? theme.accent : theme.surface}]}
            onPress={() => console.log(`You tap, ${name}`)}>
              <Text style = {[styles.textInfoTitle, {color: theme.textPrimary}]}> Shoes Info </Text>
              <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>

              <View style = {[styles.imageandInfoContainer, {backgroundColor: favorite ? theme.accent : theme.surface}]}>
                {image && <Image source={image} style={[styles.imageOutput]}/>}
                
                <View style = {[styles.textInfoTopContainer]}>
                  <Text style = {[styles.textInfoHead, {color: theme.textPrimary}]}> Name: {name} </Text>
                  <Text style = {[styles.textInfoHead, {color: theme.textPrimary}]}> Description: {description} </Text>
                  <Text style = {[styles.textInfoHead, {color: price >= 5000 ? theme.error : theme.textPrimary}]}> 
                   Price: {price.toLocaleString("en-PH", {style: "currency", currency: "PHP"})}
                  </Text>
                  <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                </View>
              
              </View>

               
              <Text style = {[styles.textInfoSection, {color: theme.textPrimary, alignSelf: 'center'}]}> Background Information </Text>
              <Text style = {[styles.textInfoSection, {color: theme.textPrimary}]}> Creator: {creator} </Text>
              <Text style = {[styles.textInfoSection, {color: theme.textPrimary}]}> Year: {year} </Text>
              <View style = {[styles.switchContainer]}>
                <Text style = {[styles.textFavorite, {color: favorite ? theme.surface : theme.textPrimary}]}>  {favorite ? "❤️ Favorite" : "Add to Favorites?"} </Text>
                <Switch value={favorite} onValueChange={() =>toggleFavorite(id)} 
                thumbColor={favorite ? theme.success : theme.error}
                trackColor={{ false: theme.error, true: theme.success}}/>
              </View>
              
              
            </Pressable>
          ))}
          
        </View>



      </ScrollView>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   

  },

  textTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center'

  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15
    
    
    

  },

  card: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    gap: 10,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",
    
    
    
    
    


  },

  textInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  divider: {
    width: '100%',
    height: 3,
    paddingVertical: 3

  },

  imageandInfoContainer: {
    flexDirection: 'row',
    gap: 10

  },

  imageOutput: {
    width: 100,
    height: 120,
    borderRadius: 10,
    
  },

  textInfoTopContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 10
    
  },

  textInfoHead: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    left: 10

  },

  textInfoSection: {
    top: 15,
    
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'left'

  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    

  },

  textFavorite: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'left'
    

  },

 
})



