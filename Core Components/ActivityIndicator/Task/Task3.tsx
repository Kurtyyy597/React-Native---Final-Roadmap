import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Image, Pressable} from 'react-native';

export default function ActivityIndicatorTask3() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showProfile,setShowProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [verification, setVerification] = useState<string>("");
  const [statusVerification, setStatusVerification] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [image, setImage] = useState<any>(null);
  const [date, setDate] = useState<string>("");

  const verificationProfile = () => {
    if (!name.trim() || !verification.trim()) {
      Alert.alert(`Please fill in all fields to verify your account!`);
      return;
    };

    if (isNaN(Number(verification))) {
      Alert.alert(`Verification code contains number only!`);
      return;
    };

    setSeconds(5);
    setLoading(true);
    setShowProfile(false)
    setStatusVerification("");

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoading(false);

          if (name.toLowerCase() === "kurt" && verification === "1234") {
            setStatusVerification(`Verification Successful ✅`);
            setShowProfile(true);
            setImage(require('../../../Images/Kurt.jpg'));
            setDate(new Date().toLocaleDateString());
          } else {
            setStatusVerification(`Verification Failed ❌`);
            setName("");
            setVerification("");
            setImage(null);
            setShowProfile(false);
          }
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  return (
    <View style = {[styles.container, {backgroundColor: showProfile ? '#939090ff' : '#fff'}]}>
      <Text style = {styles.textTitle}> Account Verification </Text>

      <View style = {styles.inputForm}>
        <TextInput style = {styles.input} placeholder='type your name' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='type verification' value={verification} onChangeText={setVerification}/>
        <Pressable onPress={verificationProfile} style={({pressed}) => [
          styles.verificationButton,
          {backgroundColor: pressed ? '#0ff50fff' : '#0cc6f9ff'}
        ]}>
          <Text style = {styles.textVerification}> Verify Account </Text>
        </Pressable>
      </View>

      {loading && (
        <View style = {styles.loadingOutput}>
          <ActivityIndicator size={'large'} color={'#2104a1ff'}/>
          <Text style = {styles.textLoading}> Loading... {seconds}s</Text>
          </View>
      )}

      {!loading && showProfile && (
        <View style = {styles.profileOutput}>
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.outputText}> {statusVerification} </Text>
          <Text style = {styles.outputText}> Hello, {name} welcome to our app!</Text>
          <Text style = {styles.outputText}> Verification Date: {date}</Text>
          </View>
      )}

      {!loading && !showProfile && (
        <Text style = {styles.outputTextError}> {statusVerification} </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

  },

  textTitle: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',

  },

  inputForm: {
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    height: 200,
    alignItems: 'center'

  },

  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  

  },

  verificationButton: {
  width: 150,
  height: 50,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10
  

  },

  textVerification: {
    fontSize: 20,
    fontWeight: 'bold'

  },

  loadingOutput: {
    flex: 1,
    alignItems: 'center'

  },

  textLoading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50

  },

  profileOutput: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center'

  },

  imageOutput: {
    width: 150,
    height: 100,
    borderWidth: 2,
    borderRadius: 20

  },

  outputText: {
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    fontWeight: 'bold'

  },

  outputTextError: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 50
  }
})
  

