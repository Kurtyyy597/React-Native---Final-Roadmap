import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

export default function TextInputTask2() {
  const [name, setName] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  return (
    <View style={styles.container}>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image 
          style={styles.image} 
          source={require('../../../Images/Kurt.jpg')}
        />
        <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.course}>Course: {course}</Text>
      </View>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Type your name"
        value={name}
        onChangeText={setName}
      />

      {/* Course Input */}
      <TextInput 
        style={styles.input}
        placeholder="Type your course"
        value={course}
        onChangeText={setCourse}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,                         // takes entire screen
    justifyContent: 'flex-start',   // content starts from top
    alignItems: 'center',           // horizontally center children
    backgroundColor:'#fff',         // white background
    paddingTop: 50,                 // space from top screen
  },

  profileCard : {
    alignItems: 'center',           // center image + text inside card
    width: 200,                     // card width
    padding: 10,                    // inner spacing
    backgroundColor: '#fff',        // card background color
    borderRadius: 60,               // rounded card corners
    elevation: 10,                   // shadow effect (Android)
    marginBottom: 19,               // space under card
  },

  image : {
    width: 100,                     // image width
    height: 100,                    // image height
    resizeMode: 'cover',            // crop image nicely
    borderRadius: 50,               // make it a circle (half of size)
    marginBottom: 10,               // space before text
  },

  name: {
    color: '#222',                  // text color
    fontSize: 16,                   // text size
    fontWeight: 'bold',             // bold text
    textAlign: 'center',            // center text
    textTransform: 'capitalize',    // capitalize letters
  },

  course: {
    color: '#222',                  // text color
    fontSize: 16,                   // text size
    fontWeight: 'bold',             // bold text
    textAlign: 'center',            // center text
    textTransform: 'capitalize',    // capitalize letters
  },

  input: {
    width: 160,                     // input field width
    fontSize: 16,                   // text size inside input
    backgroundColor: '#d6ffd6',     // light green background
    borderRadius: 1,                // rounded corners
    padding: 10,                    // inner padding text
    marginTop: 10,                  // space between inputs
    fontWeight: '100',              // semi-bold text
    borderWidth: 1,                 // border thickness
    borderColor: '#6bff89',         // border color (green)
  }
});
