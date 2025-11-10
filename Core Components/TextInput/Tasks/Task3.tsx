import React, {useState} from 'react';
import {View, Text, Image, TextInput, Alert, StyleSheet} from 'react-native';

export default function TextInputTask3() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  

  return (
    <View style = {styles.container}>
      <View style = {styles.card}>
        <Image style ={styles.image}
        source={require('../../../Images/Kurt.jpg')}/>
        <Text style = {styles.text}> Name: {name} </Text>
        <Text style = {styles.text}> I am {age} Year's old</Text>
        <Text style = {styles.text}> Email: {email} </Text>
        <Text style = {styles.text}> Future Mobile Developer </Text>
        </View>

        <TextInput style = {styles.input} placeholder='type your name' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='type your age' value={age} onChangeText={setAge} keyboardType='numeric'/>
        <TextInput style = {styles.input} placeholder='type your email' value={email} onChangeText={setEmail}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    padding: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 39
  },

  card: {
    backgroundColor: 'rgba(234, 235, 243, 1)',
    borderRadius: 200,
    elevation: 5,
    padding: 10,
    shadowRadius: 16,
    width: 200,
    marginBottom: 10,
    alignItems: 'center',
    
  },

  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginBottom: 15,


  },

  text: {
    color: '#23030c',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 1

  },

   input: {
    width: 200,
    fontSize: 16,
    borderRadius: 15,
    marginTop: 10,
    borderColor: '#6bff89',
    borderWidth: 1,
    backgroundColor: 'rgba(228, 228, 46, 0.2)',
    padding: 10
   }
})