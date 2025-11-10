import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function TouchableOpacityTask6() {
  const [mood, setMood] = useState<string>("");
  const [saveMood, setSavedMood] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  const submitButton = () => {
    const lowercaseMood = mood.toLowerCase();

    if (lowercaseMood === "happy") {
      setSavedMood(true);
      Alert.alert("😊 Keep smiling!");
      setImage(require('../../../Images/happy.jpg'));
      setMessage("😊 Keep smiling!");
    } 
    else if (lowercaseMood === "sad") {
      setSavedMood(true);
      Alert.alert("😢 Cheer up! Things will get better.");
      setImage(require('../../../Images/sad.jpg'));
      setMessage("😢 Cheer up! Things will get better.");
    } 
    else if (lowercaseMood === "angry") {
      setSavedMood(true);
      Alert.alert("😠 Take a deep breath.");
      setImage(require('../../../Images/angry.jpg'));
      setMessage("😠 Take a deep breath.");
    } 
    else if (lowercaseMood === "excited") {
      setSavedMood(true);
      Alert.alert("🤩 Wow! That’s awesome energy!");
      setImage(require('../../../Images/excited.jpg'));
      setMessage("🤩 Wow! That’s awesome energy!");
    } 
    else {
      setSavedMood(false);
      setImage(null);
      setMessage("");
      Alert.alert("😅 Mood not found!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder='What is your mood right now? (happy/sad/angry/excited)' 
        value={mood} 
        onChangeText={setMood}
      />
      <TouchableOpacity style={styles.submit} onPress={submitButton}>
        <Text style={styles.textSubmit}>CHECK MOOD!</Text>
      </TouchableOpacity>

      {saveMood && (
        <View style={styles.output}>
          <Image style={styles.imageOutput} source={image}/>
          <Text style={styles.messageOutput}>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    alignItems: 'center'
  },
  input: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#444',
    backgroundColor: '#44f70dff',
    fontSize: 18,
    padding: 10,
    width: 300,
    marginBottom: 15
  },
  submit: {
    borderRadius: 30,
    width: 150,
    borderWidth: 3,
    backgroundColor: '#1ef787ff',
    alignItems: 'center',
    marginBottom: 20
  },
  textSubmit: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  output: {
    alignItems: 'center'
  },
  imageOutput: {
    height: 100,
    width: 100,
    borderRadius: 30,
    borderWidth: 3,
    borderStyle: 'solid',
    marginBottom: 10
  },
  messageOutput: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});
