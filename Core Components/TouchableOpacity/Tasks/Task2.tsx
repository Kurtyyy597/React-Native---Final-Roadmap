import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';

export default function TouchableOpacityTask2() {
  const [name, setName] = useState<string>("");

  const toggleButton = () => {
    if (!name.trim()) {
      Alert.alert(`❗ Please enter your name!`);
    } else if (name.length < 3) {
      Alert.alert(`⚠️ Your name is too short!`);
    } else if (/\d/.test(name)) {
      Alert.alert(`🚫 Name must not contain numbers!`);
    } else {
      Alert.alert(`✅ Hello ${name}, Welcome to the App!`);
    }
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.card}>
        <Image style = {styles.image} source={require('../../../Images/Kurt.jpg')}/>
      </View>

      <TextInput 
        style ={styles.input} 
        placeholder='type your name' 
        value={name} 
        onChangeText={setName}
      />

      <TouchableOpacity style  = {styles.button} onPress={toggleButton}>
        <Text style = {styles.buttonText}> Press me! </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // screen fills full height
    backgroundColor: '#fff',   // white background
    paddingTop: 30,            // space from top
    alignItems: 'center',      // center children horizontally
  },

  card: {
    backgroundColor: '#fff',   // white card container
    borderRadius: 20,          // rounded edges
    elevation: 15,             // Android shadow
    shadowRadius: 16,          // iOS shadow blur
    alignItems: 'center',      // center inside items
    width: 150,                // card width
    padding: 10,               // inside spacing
    marginBottom: 10,          // space below card
  },

  image: {
    height: 100,               // image height
    width: 100,                // image width
    borderRadius: 40,          // round-ish image
    backgroundColor: '#fff',   // fallback bg
  },

  input: {
    backgroundColor: '#fff',   // input background
    width: 143,                // input width
    borderRadius: 15,          // round corners
    marginTop: 15,             // top spacing
    borderWidth: 4,            // thick border
    borderColor: 'rgba(117,206,28,1)', // green border
    padding: 10,               // internal spacing
    marginBottom: 15,          // bottom spacing
    fontSize: 15               // text size
  },

  button: {
    backgroundColor: 'rgba(53,218,24,1)', // button color
    paddingHorizontal: 10,     // left + right padding
    paddingVertical: 10        // top + bottom padding
  },

  buttonText: {
    color: '#100800',          // text color
    fontSize: 18,              // text size
    fontWeight: 'bold'        // bold text
  }
})
