import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';

export default function TouchableOpacityTask7() {
  const [favoriteAnimal, setFavoriteAnimal] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [savedFavoriteAnimal, setSavedFavoriteAnimal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [BgColor, setBgColor ] = useState<string>("");


  const animalChecker = () => {
    const lowerCaseAnimal = favoriteAnimal.toLowerCase();
    if (lowerCaseAnimal === "dog") {
      setSavedFavoriteAnimal(true);
      setMessage('Your favorite animal is Dog🐶 - Loyal and friendly!');
      setImage(require('../../../Images/dog.jpg'));
      setBgColor('#fff');
    } else if (lowerCaseAnimal === "cat") {
      setSavedFavoriteAnimal(true)
      setMessage(`Your favorite animal is Cat🐱 - Independent and curious!`);
      setImage(require('../../../Images/cat.jpg'));
      setBgColor('rgba(14, 7, 1, 1)');
    } else if (lowerCaseAnimal === "lion") {
      setSavedFavoriteAnimal(true);
      setMessage(`Your favorite animal is lion🦁 - Brave and Strong!`)
      setImage(require('../../../Images/lion.jpg'));
      setBgColor('rgba(240, 198, 14, 1)');
    } else if (lowerCaseAnimal === "rabbit") {
      setSavedFavoriteAnimal(true);
      setMessage(`Your favorite animal is 🐰 - Cute and Fast!`);
      setImage(require('../../../Images/rabbit.jpg'));
      setBgColor('rgba(160, 157, 169, 1)');
    } else {
      Alert.alert(`Animal is not available!`);
    }
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.textTitle}> ANIMAL CHECKER </Text>
      <TextInput style = {styles.input} placeholder='what is your favorite animal (dog/cat/rabbit/lion)' value={favoriteAnimal} onChangeText={setFavoriteAnimal}/>
      <TouchableOpacity style = {styles.submitButton} onPress={animalChecker}>
        <Text style = {styles.textSubmitButton}> CHECK ANIMAL </Text>
      </TouchableOpacity>

      {savedFavoriteAnimal && image && (
        <View style = {styles.outputContainer}>
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.messageOutput}> {message} </Text>
          <Text> {BgColor}</Text>
          </View>
          
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    paddingTop: 30,
    alignItems: 'center'
  },

  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: '#ecf4f5ff',
    color: '#444',
    alignItems: 'center',
    borderStyle: 'solid',
    textShadowColor: '#555'
    
  },

  input: {
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: '#fcfae4ff',
    borderStyle: 'solid',
    width: 300

  },

  submitButton: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'rgba(229, 229, 229, 0.2)',
    borderRadius: 30,
    fontSize: 16,
  },

  textSubmitButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2222',
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  outputContainer: {
    flex: 1,
    padding: 5,
    alignItems: 'center',

    
    
  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 30,
    elevation: 10,
    resizeMode: 'cover'
  },

  messageOutput: {
    color: '#444',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textDecorationLine: 'underline'
  },

  


})