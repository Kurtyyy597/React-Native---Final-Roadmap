import React from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';

export default function PressableBasics() {
  const handlePress = () => {
    Alert.alert(`This is handle press`);
    return;
  };

  return (
  <View style = {styles.container}>
    <Pressable style = {styles.button} onPress={handlePress}>
      <Text style = {styles.textButton}>
        Pressable
      </Text>
    </Pressable>

    
    <Pressable 
    onPress={handlePress}
    style = {({pressed}) => [
      {backgroundColor: pressed ? '#fff': '#444'},
      styles.button,
    ]}>
      <Text style = {styles.textButton}> Press me </Text>
    </Pressable>
    
    </View>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderStartColor: '#f00',
    borderEndColor: '#0f0',
    borderWidth: 1,
    paddingTop: 50
  },

  button: {
   elevation: 5,
   width: 200,
   backgroundColor: '#643',
   alignItems: 'center',
   borderRadius: 5,

  },

  textButton: {
    color: '#0c0101ff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

