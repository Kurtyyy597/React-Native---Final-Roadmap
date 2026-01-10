import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
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

type Students = {
  id: number;
  name: string;
  age: number;
  section: string;
  course: string;
};

type Item = {
  id: number;
  itemName: string;
  description: string;
  price: number;
};

export default function SpreadCombiningArrays() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [combinedArrays, setCombinedArrays] = useState<(Students | Item)[]>([]);

  const [students, setStudents] = useState<Students[]>([
    {id: 1, name: "Kurt Marquez", age: 21, section: "BSIT-41", course: "Bachelor in Science Information Technology"},
    {id: 2, name: "Zydane Battad", age: 22, section: "BSIT-43", course: "Bachelor in Science Information Technology"},
    {id: 3, name: "Nathaniel Abril", age: 25, section: "BSIT-42", course: "Bachelor in Science Information Technology"},
  ]);

  const [items, setItems] = useState<Item[]>([
  { id: 1, itemName: "Apple", description: "Fresh red apples", price: 20 },
  { id: 2, itemName: "Bread", description: "Whole wheat loaf", price: 65 },
  { id: 3, itemName: "Eggs", description: "12-piece large eggs", price: 90 },
  { id: 4, itemName: "Milk", description: "1L fresh milk", price: 75 },
  { id: 5, itemName: "Chicken", description: "1kg dressed chicken", price: 170 },
  { id: 6, itemName: "Chair", description: "Plastic monobloc chair", price: 350 },
  { id: 7, itemName: "Electric Fan", description: "16-inch stand fan", price: 1450 },
  { id: 8, itemName: "Water Jug", description: "1-gallon insulated jug", price: 280 },
  { id: 9, itemName: "Extension Cord", description: "5-meter heavy duty", price: 190 },
  { id: 10, itemName: "Rice Cooker", description: "1L automatic rice cooker", price: 899 },
  ]);

  const merge = () => {
    const mergeBoth = [...students, ...items]
    setCombinedArrays(mergeBoth);
    console.log("You merge both objects of arrays!");
  };

  const addMoreStudents = () => {
    const newStudent = {
      id: Date.now(),
      name: "Rio Jay Magalona",
      age: 21,
      section: "BSIT-41",
      course: "Bachelor in Science Information Technology"
    };
    const mergeAgain = [...combinedArrays, newStudent];
    setCombinedArrays(mergeAgain);
    console.log(`You merge again!`) 
  };

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.surface}]}>
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
      

       {/* Students Section */}
        <View style = {[styles.cardForStudents, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitleStudents, {color: theme.textPrimary}]}> Students Section </Text>
          <View style = {[styles.divider, {backgroundColor: theme.textPrimary}]}/>
          {students.map(({id, name, age, course, section}) => (
            <View key={id} style = {[styles.studentsOutputContainer, {backgroundColor: theme.inputBackground}]}>
              
              <Text style = {[styles.textOutputStudents, {color: theme.textPrimary}]}> Name: {name} </Text>
              <Text style = {[styles.textOutputStudents, {color: theme.textPrimary}]}> Age: {age} </Text>  
              <Text style = {[styles.textOutputStudents, {color: theme.textPrimary}]}> Section: {section} </Text>  
              <Text style = {[styles.textOutputStudents, {color: theme.textPrimary}]}> Course: {course} </Text>       
            </View>
          ))}
        </View>
        {/* Students Section */}
        
        {/* Item Section */}
        <View style = {[styles.cardForItems, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitleItems, {color: theme.textPrimary}]}> Items Section </Text>
          <View style = {[styles.divider, {backgroundColor: theme.textPrimary}]}/>
          {items.map(({id, itemName, description, price}) => (
            <View key={id} style = {[styles.itemsOutputContainer, {backgroundColor: theme.inputBackground}]}>
              
              <Text style = {[styles.textOutputItems, {color: theme.textPrimary}]}> Name: {itemName} </Text>
              <Text style = {[styles.textOutputItems, {color: theme.textPrimary}]}> Description {description} </Text>  
              <Text style = {[styles.textOutputItems, {color: theme.textPrimary}]}> Price: {price} </Text>  
             </View>
          ))}
        </View>
        {/* Item Section */}

         {/* Merge Section */}
         <View style = {[styles.cardForMerge, {backgroundColor: theme.inputBackground}]}>
          <Text style = {[styles.textTitleMerge, {color: theme.textPrimary}]}> Merge Section </Text>
          <View style = {[styles.divider, {backgroundColor: theme.textPrimary}]}/>
          {combinedArrays.map((comb) => (
            <View key={`${"age" in comb ? "student" : "item"}-${comb.id}`} 
            style = {[styles.mergeOutputContainer, {backgroundColor: theme.inputBackground}]}>
              {"age" in comb && (
                <>
                <Text style = {[styles.textOutputStudentsMerge, {color: theme.textPrimary}]}> Name: {comb.name} </Text>
                <Text style = {[styles.textOutputStudentsMerge, {color: theme.textPrimary}]}> Age: {comb.age} </Text>
                <Text style = {[styles.textOutputStudentsMerge, {color: theme.textPrimary}]}> Section: {comb.section} </Text>
                <Text style = {[styles.textOutputStudentsMerge, {color: theme.textPrimary}]}> Course: {comb.course} </Text>
               
                </>
              )}

              {"description" in comb && (
                <>
               
                <Text style = {[styles.textOutputItemsMerge, {color: theme.textPrimary}]}> Item Name: {comb.itemName} </Text>
                <Text style = {[styles.textOutputItemsMerge, {color: theme.textPrimary}]}> Description: {comb.description} </Text>
                <Text style = {[styles.textOutputItemsMerge, {color: theme.textPrimary}]}> Price: {comb.price} </Text>
                </>
              )}
            </View>
          ))}
         </View>
        
        {/* Merge */}
          
          
    
      

          <Pressable
          onPress={merge}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.button,
          pressed && {opacity: 0.1 }]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Merge</Text>
          </Pressable>

          <Pressable
          onPress={addMoreStudents}
          onLongPress={() => alert("Long pressed")}
          delayLongPress={400}
          android_ripple={{ color: "#4818e5ff" }}
          hitSlop={10}
          accessibilityRole="button"
          style={({ pressed }) => [
          styles.button,
          pressed && {opacity: 0.8 }]}>
            <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Add more </Text>
          </Pressable>


      </ScrollView>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    

  },

  cardForStudents: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",


  },

  studentsOutputContainer: {
    gap: 3,
    
    
    

  },

  textTitleStudents: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  divider: {
    height: 2,
    width: '100%',
    paddingVertical: 2
  },

  textOutputStudents: {
    fontSize: 16,
    textAlign: 'left',
    fontStyle: 'italic'

  },

  cardForItems: {
    marginTop: 20,
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",
  },

  itemsOutputContainer: {
     gap: 3,

  },

  textTitleItems: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  textOutputItems: {
    fontSize: 16,
    textAlign: 'left',
    fontStyle: 'italic'

  },

  button: {
    marginTop: 10,
    backgroundColor: "#3B82F6",
    width: '100%',
    paddingVertical: 10

  },

  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  cardForMerge: {
    marginTop: 20,
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
    alignSelf: "center",

  },

  textTitleMerge: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  mergeOutputContainer: {
    gap: 3,

  },

 
  textOutputStudentsMerge: {
     fontSize: 16,
    textAlign: 'left',
    fontStyle: 'italic'

  },

 

  textOutputItemsMerge: {
     fontSize: 16,
    textAlign: 'left',
    fontStyle: 'italic'

  }




})