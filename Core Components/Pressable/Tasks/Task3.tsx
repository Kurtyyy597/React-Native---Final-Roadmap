import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function PressableTask3() {
  const [isOn, setIsON] = useState<boolean>(false);

  return (
    <View style = {styles.container}>
      <Pressable
      onPress={() => setIsON(!isOn)}
      style={({pressed}) => [
        styles.switchContainer,
        {backgroundColor: isOn ? '#69f002ff' : '#e3f0f0ff',
          justifyContent: isOn ? 'space-around' : 'space-between',
          opacity: pressed ? 0.8 : 1
        
        } 
      ]}>
        <View style = {styles.circle}/>
      </Pressable>

      <Text style = {styles.textSwitch}>  {isOn ? "Switch is ON🟢" : "Switch is OFF⚪"}</Text>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    paddingTop: 50
  },

  switchContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    
    
  },

  textSwitch: {
    color: '#130101ff',
    fontSize: 30,
    fontWeight: 'bold'
  }


})