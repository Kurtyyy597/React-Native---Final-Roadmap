import React, {useState} from 'react';
import {View, Text, TextInput, Image, Pressable, Alert, StyleSheet, Switch} from 'react-native';

export default function SwitchTask4() {
  const [name, setName] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [applyMode, setApplyMode] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [saveWeather, setSaveWeather] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [statusWeather, setStatusWeather] = useState<string>("");
  const [showStatus, setShowStatus] = useState<boolean>(false);


  const saveButton = () => {
    if (!name.trim() || !weather.trim()) {
      Alert.alert(`Please fill in all fields!`);
      return;
    };

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert(`Name should not contain numbers!`);
      return;
    };

    const validWeathers = ["sunny", "cloudy", "snow", "fog", "storm", "milky", "fire"];
    if (!validWeathers.includes(weather.toLowerCase())) {
      Alert.alert(`"Invalid weather! Please type one from the list: sunny, cloudy, snow, fog, storm, milky, fire"`);
      return;
    }


    Alert.alert(`Your name and the weather is saved by this system!`);
    setApplyMode(darkMode);
    setSaveName(name);
    setSaveWeather(weather);
    

    switch(weather.toLowerCase()) {
      case "sunny":
        setImage(require('../../../Images/sunny.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is sunny☀️!`);
        break;
      case "cloudy":
        setImage(require('../../../Images/cloudy.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is cloudy🌧, Keep safe!`);
        break;
      case "snow":
        setImage(require('../../../Images/snow.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is snow🌨️! enjoy the snow`);
        break;
      case "fog":
        setImage(require('../../../Images/fog.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is foggy🌫️!`);
        break;
      case "storm":
        setImage(require('../../../Images/storm.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is stormy⛈️, Keep safe!`)
        break;
      case "milky":
        setImage(require('../../../Images/milky.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is milky way🌌, enjoy the view!`);
        break;
      case "fire":
        setImage(require('../../../Images/fire.jpg'));
        setStatusWeather(`Hello ${name}, the weather today is on fire🔥, Stay away!`);
        break;
      default:
        
        setImage(null);
        setSaveWeather("");
    };
    setShowStatus(true);
    setName("");
    setWeather("");

    
  
  };

  return (
    <View style = {[styles.container, {backgroundColor: applyMode?  '#615858ff' : '#fff'}]}>
      <Text style = {styles.textTitle}> WELCOME TO WEATHER CHECKER! </Text>

      <View style = {styles.textInputForm}>
        <TextInput style = {styles.input} placeholder='what is your name?' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='Favorite Weather?' value={weather} onChangeText={setWeather}/>
        <Text style = {[styles.textSwitch, {color: darkMode ? '#444' : '#e1e64aff'}]}>
          {darkMode ? '🌙 Dark Mode Applied' : '☀️ Light Mode Applied'}
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode}/>
        <Pressable
        onPress={saveButton}
        style={({pressed}) => [
          styles.saveButton,
          {backgroundColor: pressed ? '#7cec05ff' : '#fbfbfbff'}
        ]}>
          <Text style = {styles.saveTextButton}> Check Weather </Text>
        </Pressable>

      </View>


      {showStatus && (
        <View style = {styles.outputContainer}>
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.textOutput}> Name: {saveName}</Text>
          <Text style = {styles.textOutput}> Weather: {saveWeather} </Text>
          <Text style = {styles.textOutput}> Status: {statusWeather}</Text>
          <Text style = {styles.textOutput}> Dark Mode: {applyMode ? "ON" : "OFF"}</Text>
          </View>
      )}
    </View>
  )

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },

  textTitle: {
    color: '#444',
    borderWidth: 1,
    borderRadius: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    fontSize: 20

  },

  textInputForm: {
    borderWidth: 5,
    borderColor: '#838381ef',
    marginTop: 30,
    width: 350,
    height: 280,
    borderRadius: 30,
    borderStyle: 'solid',

  },

  input: {
    borderWidth: 3,
    marginTop: 15,
    width: '85%',
    borderRadius: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    fontSize: 16

  },
  
  textSwitch: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 50


  },

  saveButton: {
    borderWidth: 2,
    
    borderRadius: 20,
    width: '85%',
    marginHorizontal: 26,
    marginBottom: 100
    
    

  },

  saveTextButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#031ff5ff',
    textAlign: 'center'

  },

  outputContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'

  },

  imageOutput: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 20,
    resizeMode: 'cover'

  },

  textOutput: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold'

  }
})