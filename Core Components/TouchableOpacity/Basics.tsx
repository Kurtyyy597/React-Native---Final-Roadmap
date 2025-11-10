import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function TouchableOpacityBasics() {
  const handlePress = () => {
    window.alert(`Button Press!`)
    return;
  }
  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {styles.button} onPress={handlePress}>
        <Text style = {styles.buttonText}> Click me to alert </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#c6d5dc44',
    padding: 20,
  },

  button: {
    backgroundColor: 'rgba(21, 15, 194, 1)',
    paddingHorizontal: 15,
    paddingVertical: 15,

  
    borderRadius: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic'
  }
})