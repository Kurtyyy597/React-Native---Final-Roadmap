import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Alert, Pressable, Image } from 'react-native';

export default function ActivityIndicatorTask2() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [saveAge, setSavedAge] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [image, setImage] = useState<any>(null);

  const loadProfile = () => {
    // ✅ Validation fixes
    if (!name.trim() || !age.trim()) {
      Alert.alert('Please fill in all fields to load your profile!');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert('Name must not contain numbers!');
      return;
    }

    // ✅ Start countdown from 5
    setSeconds(5);
    setLoading(true);
    setShowProfile(true);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoading(false);
          setShowProfile(true);

          setImage(require('../../../Images/Kurt.jpg'));
          setSavedName(name);
          setSavedAge(age);
          setRole('ADMIN');
          setDate(new Date().toLocaleDateString());

          setName("");
          setAge("");
          return 0;
        }
        return prev - 1; // countdown
      });
    }, 1000);
  };

  const logoutButton = () => {
    setSeconds(0);
    setLoading(false);
    setShowProfile(false);
    setImage(null);
    setAge("");
    setName("");
    setSavedName("");
    setSavedAge("");
    setDate("");
  }

  return (
    <View style = {[styles.mainContainer, {backgroundColor: showProfile ? '#f5f5f5ff' : '#949191ff'}]}>
      <Text style = {[styles.textTitle, {color: showProfile ? '#2af002ff' : '#270303ff'}]}> load Profile </Text>

      <View style = {styles.fillupForm}>
        <TextInput style = {styles.input} placeholder='type your name' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='type your age' value={age} onChangeText={setAge} keyboardType='numeric'/>
        <Pressable onPress={loadProfile} style={({pressed}) => [
          styles.loadProfileButton,
          {backgroundColor: pressed ? '#f4f1f9ff' : '#62e90eff'}
        ]}>
          <Text style = {styles.textLoadProfile}> Load Profile </Text>
        </Pressable>
      </View>

      {loading && (
        <View style = {styles.outputLoadingContainer}>
          <ActivityIndicator size={'large'} color={"#07f572ff"}/>
          <Text style = {styles.textLoading}> Loading... {seconds}s</Text>
          </View>
      )}


      {!loading && showProfile && (
        <View style = {styles.profileOutputContainer}>
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.textOutput}> Name: {saveName} </Text>
          <Text style = {styles.textOutput}> Age: {saveAge} </Text>
          <Text style = {styles.textOutput}> Role: {role} </Text>
          <Text style = {styles.textOutput}> Date login: {date} </Text>
          <Pressable onPress={logoutButton} style={({pressed}) => [
            styles.logoutButton,
            {backgroundColor: pressed ? '#2e20fbff' : '#ccfc09ff'}
          ]}>
            <Text style = {styles.textLogoutButton}> Logout </Text>
          </Pressable>
          </View>
      )}
    </View>
  )
      
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 1,
    alignItems: 'center',

  },

  textTitle: {
    marginTop: 50,
    alignItems: 'center',
    fontSize: 20,
    padding: 10,


  },

  fillupForm: {
    marginTop: 10,
    borderWidth: 3,
    width: 310,
    height: 200,
    alignItems: 'center',
    


  },

  input: {
    marginTop: 10,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 20,
    width: '85%',
    padding: 10,
    


  },

  loadProfileButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,

    

  },

  textLoadProfile: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18

  },

  outputLoadingContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
   

  },

  textLoading: {
    fontSize: 20,
    fontWeight: 'bold'

  },

  profileOutputContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'

  },

  imageOutput: {
    width: 150,
    height: 120,
    borderWidth: 1,
    borderRadius: 20

  },

  textOutput: {
    fontSize: 20,
    fontWeight: 'bold',


  },

  logoutButton: {

    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,

  },

  textLogoutButton: {
    fontSize: 20

  },
})



