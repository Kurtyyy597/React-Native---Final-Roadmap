import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function PressableTask2() {
  const [count, setCount] = useState<number>(0);

  const getCountColor = () => {
    if (count > 0) return "green";
    if (count < 0) return "red";
    return  "gray";
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.textTitle}> PRESSABLE COUNTER  </Text>

      <Text style = {[styles.countText, {color: getCountColor()}]}> Count: {count} </Text>

      <Pressable
      onPress={() => setCount(count+1)}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: pressed ? '#fff' : '#4232'}
      ]}>
        <Text style = {styles.increaseText}> Increase </Text>
      </Pressable>

      <Pressable
      onPress={() => setCount(count-1)}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: pressed ? '#fff': '#4232'}
      ]}>
        <Text style = {styles.decreaseText}> Decrease </Text>
      </Pressable>
    </View>
  )
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbc7c7ff',
    paddingTop: 30,
    borderWidth: 3,
  },

  textTitle: {
    elevation: 5,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
    fontSize: 15,

  },

  countText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    
  },

  button: {
    borderWidth: 2,
    backgroundColor: '#fff',
    alignItems: 'center',

    
  },

  increaseText: {
    color: '#444',
    textTransform: 'capitalize'
  },

  decreaseText: {
    color: '#444',
    textTransform: 'capitalize'

  }




})

  
