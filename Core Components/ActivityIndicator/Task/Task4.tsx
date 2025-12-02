import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Alert, ActivityIndicator, Switch, StyleSheet, Image} from 'react-native';

export default function ActivityIndicatorTask4() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [privatee, setPrivate] = useState<boolean>(false);
  
  const [age, setAge] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");
  const [saveAge, setSavedAge] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<any>(null);

  const loginButton = () => {
    if (!name.trim() || !age.trim()) {
      Alert.alert(`Please fill in all fields!`);
      return;
    };

    if (isNaN(Number(age))) {
      Alert.alert(`Age should contain numbers only!`);
      return;
    };

    setSeconds(5);
    setLoading(true);
    setShowProfile(false);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <=1) {
          clearInterval(interval);

          setLoading(false);

          if (privatee) {
            setImage(require('../../../Images/Kurt.jpg'));
            setSavedName(name);
            setSavedAge(age);
            setShowProfile(true);
          } else {
            setImage(require('../../../Images/Kurt.jpg'));
            setSavedName(name);
            setSavedAge(`You turn off the privacy so we will dont show your age!`);
            setShowProfile(true);
          }
          return 0;
          
        } else {
          return prev - 1;
        }

      })
    }, 1000);
  };

  const logoutButton = () => {
    setLoading(false);
    setImage(null);
    setShowProfile(false);
    setName("");
    setAge("");
    setSavedAge("");
    setSavedName("");
    setSeconds(0);
    setPrivate(false);
  };

  return (
    <View style = {[styles.container, {backgroundColor: privatee ? '#8f8b8bff' : '#fff'}]}>
      <Text style = {styles.textTitle}> Load your Profile! </Text>

      <View style = {styles.inputForm}>
        <TextInput style = {styles.input} placeholder='type your name' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='type your age' value={age} onChangeText={setAge}/>
       

        <View style = {[styles.containerforSwitch, {backgroundColor: privatee ? '#8f8b8bff' : '#fff'}]}> 
        <Text style = {[styles.textPrivate, {color: privatee ? '#001a16ff' : "#928103ff"}]}> 
        {privatee ? "Private: turn on" : "private turn off"} </Text>
        <Switch value={privatee} onValueChange={setPrivate}/>
        
        </View>
        <Pressable onPress={loginButton} disabled={loading} style={({pressed}) => [
          styles.buttonLogin,
          {backgroundColor: pressed ? '#ee1eeeff' : '#f6f5fbff'}
          
        ]}>
          <Text style = {styles.textLogin}> Load Profile </Text>
        </Pressable>
      
      </View>

      {loading && (
        <View style = {[styles.outputActivityIndicator, {backgroundColor: privatee ? '#8f8b8bff' : '#fff'} ]}>
          <ActivityIndicator size={'large'} color={'#0f0be4ff'}/>
          <Text style = {styles.textLoading}> Loading... {seconds}s</Text>
          </View>
      )}

      {!loading && showProfile && (
        <View style = {[styles.profileOutput, {backgroundColor: privatee ? '#8f8b8bff' : '#fff'}]}>
          <Image style = {styles.outputImage} source={image}/>
          <Text style = {styles.outputText}> Name: {saveName} </Text>
          <Text style = {styles.outputText}> Age: {saveAge}</Text>
          <Pressable onPress={logoutButton} style={({pressed}) => [
            styles.buttonLogout,
            {backgroundColor: pressed ? '#3cdd2aff' : '#fff'}
          ]}>
            <Text style = {styles.textLogout}> Logout </Text>
          </Pressable>
          </View>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

  },

  textTitle: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize'

  },

  inputForm: {
    marginTop: 20,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    height: 240,
    alignItems: 'center'

  },

  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '85%',
    fontSize: 16,
    marginTop: 20

  },

  containerforSwitch: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'

  },

  textPrivate: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'

  },

  buttonLogin: {
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2

  },

  textLogin: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  outputActivityIndicator: {
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

  outputImage: {
    width: 150,
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center'

  },

  outputText: {
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',

  },

  buttonLogout: {
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    borderWidth: 1,


  },

  textLogout: {
    fontSize: 16,
    fontWeight: 'bold'

  }




})

