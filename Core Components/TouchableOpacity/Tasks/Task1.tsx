import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function TouchableOpacityTask1() {
  
  const handlePress = () => {
    window.alert(`Profile Cliked!`);
    return;
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.imageCard}>
        <Image style = {styles.image} source={require('../../../Images/Kurt.jpg')}/>
      </View>

      <Text style = {styles.text}> Hello I am Kurt Allen A. Marquez, 21 years old</Text>
      <Text style = {styles.text}> Hoping to become a mobile developer someday! </Text>
      <TouchableOpacity style = {styles.button} onPress={handlePress}>
        <Text style = {styles.buttonText}> Click to View profile! </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaf8f8ff',
    paddingTop: 20,
    padding: 20,
  },

  imageCard: {
    color: 'rgba(250, 247, 246, 1)',
    borderRadius: 20,
    elevation: 5,
    padding: 10,
    shadowRadius: 16,
    width: 150,
    alignItems: 'center',
    marginBottom: 10,

  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 20
  },

  text: {
    color: '#070101ff',
    textShadowColor: '#443',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#690ed1ff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})