import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet, Pressable} from 'react-native';

export default function ActivityIndicatorTask1() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showName, setShowName] = useState<string>("");
  const [showAge, setShowAge] = useState<string>("");
  const [showReligion, setReligion] = useState<string>("");
  const [showtFuture, setShowFuture] = useState<string>("");
  const [image, setImage] = useState<any>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowProfile(true);
      setImage(require('../../../Images/Kurt.jpg'));
      setShowName("Hello I am Kurt Allen A. Marquez");
      setShowFuture(`I want to be a mobile developer someday`);
      setShowAge(`I am 21 years old`);
      setReligion(`Catholic`);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const loadingAgain = () => {
    setShowProfile(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowProfile(true);
    }, 3000);
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.textTitle}> LOADER DEMO </Text>

      {loading && (
        <View style = {styles.center}>
        <ActivityIndicator size={'large'} color={'#0a4cf5ff'}/>
        <Text style = {styles.textLoading}> loading.... </Text>
        </View>
      )}

      {!loading && showProfile && (
        
        <View style = {styles.outputContainer}>
          
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.outputText}> Name: {showName} </Text>
          <Text style = {styles.outputText}> Dream: {showtFuture} </Text>
          <Text style = {styles.outputText}> Age: {showAge} </Text>
          <Text style = {styles.outputText}> Religion: {showReligion} </Text>
          </View>
      )}

      <Pressable 
      onPress={loadingAgain}
      style={({pressed}) => [
        styles.buttonLoadAgain,
        {backgroundColor: pressed ? '#550dfbff': '#fff'}
      ]}>
        <Text style = {styles.textLoadAgain}> Load Again! </Text>
      </Pressable>

    

     
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#817e7eff',
    alignItems: 'center',
    marginTop: 50
  },

  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  center: {
    flex: 1,
    alignItems: 'center',

  },

  textLoading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#131212ff'

  },

  outputContainer: {
    alignItems: 'center',


  },

  imageOutput: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 20,
    borderWidth: 1

  },

  outputText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonLoadAgain: {
    marginTop: 10,
    width: 100,
    height: 50,
    borderRadius: 20,

  },

  textLoadAgain: {
    textAlign: 'center',
    marginTop: 12

  }




})


