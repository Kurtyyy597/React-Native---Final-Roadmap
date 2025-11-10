import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

export default function TextInputTask1() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  return (
    <View style={styles.container}>

      <View style={styles.imageCard}>
        <Image style={styles.image} source={require('../../../Images/Kurt.jpg')} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.output}> Name: {name} </Text>
      <Text style={styles.output}> Age: {age} </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F1F6F7',
  },

  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    resizeMode: 'cover',
  },

  input: {
    width: 150,
    fontSize: 18,
    backgroundColor: '#D6FCD8',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontWeight: '500',
  },

  output: {
    color: '#110000',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});
