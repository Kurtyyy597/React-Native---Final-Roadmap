import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Switch} from 'react-native';

export default function TouchableOpacityTask5() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [registeredName, setRegisteredName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerAge, setRegisterAge] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [registered, setIsregistered] = useState<boolean>(false);

  const submitButton = () => {
    if (!name.trim() || !age.trim() || !email.trim()) {
      window.alert(`Please fill in all fields!`);
      return;
    };

    if (name.length < 3 || (/\d/.test(name))) {
      window.alert(`🚫Name is too short or contain numbers!`);
      return;
    };

    if (!email.includes("@")) {
      window.alert(`Invalid email format! please use "@" `);
      return;
    };

    const numAge = Number(age);
    if (isNaN(numAge)) {
      window.alert(`Age must be number!`);
      return;
    };

    if (numAge <10 || numAge > 100) {
      window.alert(`Age must be between 10 and 100!`);
      return;
    };

    Alert.alert(`Congrats you successfully registered!`);
    setImage(require('../../../Images/Kurt.jpg'));
    setIsregistered(true);
    setRegisteredName(name);
    setRegisterEmail(email);

    setRegisterAge(age);
    setName("");
    setEmail("");
    setAge("");
    
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.imageCard}>
        <Image style = {styles.image} source={require('../../../Images/Kurt.jpg')}/>
      </View>

      <TextInput style = {styles.input} placeholder='type your name' value={name} onChangeText={setName}/>
      <TextInput style = {styles.input} placeholder='type your age' value={age} onChangeText={setAge} keyboardType='numeric'/>
      <TextInput style = {styles.input} placeholder='type your email' value={email} onChangeText={setEmail}/>
      <TouchableOpacity style = {styles.submitButton} onPress={submitButton}>
        <Text style = {styles.submitTextButton}> Register </Text>
      </TouchableOpacity>

      
      {registered && image ? (
        <View style = {styles.output}>
          <Image style = {styles.imageOutput} source={image}/>
          <Text style = {styles.outputInformation}> ✅ Registered Information: </Text>
          <Text style = {styles.outputText}>👤 Name: {registeredName} </Text>
          <Text style = {styles.outputText}> 🎂 Age: {registerAge} </Text>
          <Text style = {styles.outputText}> 📧 Email: {registerEmail} </Text>
          </View>
      ) : <Text style = {styles.errorOutput}> PLEASE REGISTER FIRST TO SEE YOUR INFORMATION! </Text>
    }
    </View>
  )

  


}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
  },

  image : {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderStyle: 'dotted',
    borderWidth: 2,
    elevation: 5
  },

  imageCard: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#344',
    elevation: 5,
    marginBottom: 10

  },

  input: {
    width: 140,
    fontSize: 16,
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 3,
    backgroundColor: 'rgba(7, 237, 214, 1)',
    marginBottom: 5
  },

  submitButton: {
    backgroundColor: '#fff',
    width: 200,
    borderRadius: 20,
    borderWidth: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: 'rgba(19, 207, 232, 1)'
    

  },

  submitTextButton: {
    color: '#1b0202ff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 2

  },

  output: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'solid',
    elevation: 10,
    paddingBottom: 15

  },

  outputInformation: {
    color: '#130101ff',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center'
    
  },

  outputText: {
    color: '#444',
    fontSize: 15,
    fontWeight: 'black',
    writingDirection: 'ltr',
    textAlign: 'center'

  },

  errorOutput: {
    color: '#1524c2ff',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 20,
  }

  

  

})