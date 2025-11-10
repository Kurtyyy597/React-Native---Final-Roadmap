import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';

export default function TouchableOpacityTask3() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitButton = () => {
    // ❌ invalid if missing @ OR password too short
    if (!email.includes("@") || password.length < 3) {
      Alert.alert(`Invalid Email or Password!\nEmail must include "@", password must be at least 3 characters.`);
      return;
    }

    // ✅ success
    Alert.alert(`Welcome ${email}!`);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../Images/Kurt.jpg')} />

      <TextInput 
        style={styles.input} 
        placeholder='type your email' 
        value={email} 
        onChangeText={setEmail}
      />

      <TextInput 
        style={styles.input} 
        placeholder='type your password' 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity style={styles.buttonforPassword} onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.textforPassword}>{showPassword ? 'hide' : 'show'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonForInput} onPress={submitButton}>
        <Text style={styles.inputText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 20,
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#2ed617ff',
    width: 170,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
    fontSize: 15,
    padding: 8,
    marginVertical: 5,
  },

  buttonforPassword: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#27dbb1ff',
    borderRadius: 10,
  },

  textforPassword: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonForInput: {
    backgroundColor: 'rgba(38, 38, 213, 0.2)',
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#440cedff',
    borderRadius: 12,
    marginTop: 10,
  },

  inputText: {
    color: '#440cedff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
