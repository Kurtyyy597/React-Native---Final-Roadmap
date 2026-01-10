import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, ScrollView, Image, BackHandler, Keyboard} from 'react-native';
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
  inputBackground: "#24262A",  // Matches modern dark surfaces
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type Item = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: any
};

export default function SearchWithDebounceandRecent() {
  const inputRef = useRef<TextInput>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const originalItem : Item[] = ([
    {
    id: 1,
    name: "White Sugar",
    description: "Highly refined sugar commonly used for baking and sweetening drinks.",
    price: "₱80",
    image: require('../../../Images/white sugar.jpg')
  },
  {
    id: 2,
    name: "Brown Sugar",
    description: "White sugar mixed with molasses, giving it a moist texture and rich flavor.",
    price: "₱95",
    image: require('../../../Images/brown sugar.jpg')
  },
  {
    id: 3,
    name: "Cane Sugar",
    description: "Sugar made directly from sugarcane juice, less processed than white sugar.",
    price: "₱110",
    image: require('../../../Images/cane sugar.jpg')
  },
  {
    id: 4,
    name: "Raw Sugar",
    description: "Lightly refined sugar with large crystals and a hint of molasses.",
    price: "₱120",
    image: require('../../../Images/raw sugar.jpg')
  },
  {
    id: 5,
    name: "Powdered Sugar",
    description: "Finely ground sugar often used for icing and frosting.",
    price: "₱90",
    image: require('../../../Images/powder sugar.jpg')
  },
  {
    id: 6,
    name: "Confectioners’ Sugar",
    description: "Another name for powdered sugar, usually mixed with cornstarch.",
    price: "₱95",
    image: require('../../../Images/confectionser sugar.jpg')
  },
  {
    id: 7,
    name: "Turbinado Sugar",
    description: "Partially refined sugar with coarse crystals and caramel notes.",
    price: "₱130",
    image: require('../../../Images/Turbinado Sugar.jpg')
  },
  {
    id: 8,
    name: "Demerara Sugar",
    description: "Large crystal sugar with a crunchy texture and toffee flavor.",
    price: "₱140",
    image: require('../../../Images/Demerara Sugar.jpg')
  },
  {
    id: 9,
    name: "Muscovado Sugar",
    description: "Unrefined sugar with strong molasses flavor, popular in Filipino desserts.",
    price: "₱150",
    image: require('../../../Images/Muscovado Sugar.jpg')
  },
  {
    id: 10,
    name: "Coconut Sugar",
    description: "Natural sugar made from coconut palm sap, with a low glycemic index.",
    price: "₱160",
    image: require('../../../Images/Coconut Sugar.jpg')
  },
  {
    id: 11,
    name: "Palm Sugar",
    description: "Traditional sugar made from palm tree sap, common in Asian cooking.",
    price: "₱145",
    image: require('../../../Images/Palm Sugar.jpg')
  },
  {
    id: 12,
    name: "Rock Sugar",
    description: "Crystallized sugar used in Chinese teas and desserts.",
    price: "₱100",
    image: require('../../../Images/Rock Sugar.jpg')
  },
  {
    id: 13,
    name: "Maple Sugar",
    description: "Sugar derived from maple syrup with a distinct maple flavor.",
    price: "₱220",
    image: require('../../../Images/Maple Sugar.jpg')
  },
  {
    id: 14,
    name: "Beet Sugar",
    description: "Sugar extracted from sugar beets, similar in taste to cane sugar.",
    price: "₱105",
    image: require('../../../Images/Beet Sugar.jpg')
  },
  {
    id: 15,
    name: "Liquid Sugar",
    description: "Dissolved sugar syrup used in beverages and food processing.",
    price: "₱115",
    image: require('../../../Images/Liquid Sugar.jpg')
  }
  ]);

  const [items, setItems] = useState<Item[]>(originalItem);
  
  const [searchItem, setSearchItem] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchWithDebounce = (text: string) => {
    setSearchItem(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const search = text.trim().toLowerCase();

      if (search === "") {
        setItems(originalItem);
        return;
      };

      const filtered = originalItem.filter(item =>
        item.name.trim().toLowerCase().includes(search)
      );
      setItems(filtered);
    }, 300)
  };

  const saveRecentSearches = () => {
    const query = searchItem.trim();
    if (query === "") return;

    setRecentSearches(prev => {
      const withoutDuplicate = prev.filter(q => q !== query);
      const updated = [query, ...withoutDuplicate];

      if (updated.length > 10) {
        updated.pop();
      }
      return updated
    })
  
  };

  const useRecentSearch = (query: string) => {
    setSearchItem(query);
    searchWithDebounce(query);
  };

useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      if (isSearchFocused) {
        Keyboard.dismiss();
        inputRef.current?.blur();
        setIsSearchFocused(false);
        return true;
      }
      return false;
    }
  );

  return () => backHandler.remove();
}, [isSearchFocused]);

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.accent}]}>

    <TextInput style = {[styles.input, {backgroundColor: theme.inputBackground, borderColor: theme.border}]}
    ref={inputRef}
    value={searchItem}
    onChangeText={searchWithDebounce}
    blurOnSubmit={false}
    onFocus={() => setIsSearchFocused(true)}
    onBlur={() => setIsSearchFocused(false)}
    onSubmitEditing={() => {
      saveRecentSearches();
      Keyboard.dismiss();
      inputRef.current?.blur();
      setIsSearchFocused(false);
    }}
  />

      {items.length === 0 && searchItem.trim() !== "" && (
        <Text style = {{color: theme.error, textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
          No Matches 
        </Text>
      )}

      {isSearchFocused && recentSearches.length > 0 && (
        <View style = {[styles.recentSearchesContainer, {backgroundColor: theme.accent}]}>
          <Text style = {[styles.textRecentSearchTitle, {color: theme.success}]}> Recent Searches </Text>

          {recentSearches.map((query, index) => (
            <Pressable key={index}
            onPress={() => useRecentSearch(query)}>
              <Text style = {[styles.textRecentSearchOutput]}> {index + 1}. {query} </Text>
            </Pressable>
          ))}
        </View>
      )}
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
        nestedScrollEnabled={true}
        overScrollMode="always"
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
        Keyboard.dismiss();
        inputRef.current?.blur();
        setIsSearchFocused(false);}}>

          <View style = {[styles.cardContainer, {backgroundColor: theme.accent}]}>
            {items.map(({id, name, price, description, image}) => (
              <Pressable key={id}
              onPress={() => {
                console.log(`You pressed ${name}`)
              }}
              style={[styles.card, {backgroundColor: theme.accent}]}>

                {image && (
                  <Image source={image} style={[styles.imageOutput]}/>
                )}
                <View style = {[styles.divider, {backgroundColor: theme.divider}]}/>
                <Text style = {[styles.textOutputName, {color: theme.textPrimary}]}> {name} </Text>
                <Text style = {[styles.textOutputDescriptionOutput, {color: theme.textPrimary}]}> {description} </Text>
                <Text style = {[styles.textOutputPrice, {color: theme.error}]}> Price: {price} </Text>
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
    gap: 10

  },

  input: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F9FAFB", // soft gray
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

  },

  recentSearchesContainer: {
    gap: 9

  },

  textRecentSearchTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  textRecentSearchOutput: {
    fontSize: 14,
    fontWeight: '600',

  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderRadius: 20


  },

  card: {
    width: "48%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",

  },

  imageOutput: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 20
  },

  divider: {
    paddingVertical: 1,
    height: 2,

  },

  textOutputName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textOutputDescriptionTitle: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: 'bold'
  },

  textOutputDescriptionOutput: {
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: 10,
  },

  textOutputPrice: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  }




})
