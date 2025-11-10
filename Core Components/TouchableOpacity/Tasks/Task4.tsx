import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function TouchableOpacityTask4() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitButton = () => {
    // Basic empty field check
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Please fill in all fields!");
      return;
    }

    // Name validation
    if (name.length < 4 || /\d/.test(name)) {
      Alert.alert("🚫 Name must be at least 4 characters and not contain numbers!");
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      Alert.alert("Invalid Email format!");
      return;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters!");
      return;
    }

    // Simulated login check
    if (email === "Kurtmarquez238@gmail.com" && password === "kurtpogi") {
      Alert.alert("✅ Login success!");
      setName("");
      setEmail("");
      setPassword("");
      return;
    }

    Alert.alert("❌ Email or password do not match!");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../Images/Kurt.jpg')} />

      <TextInput style={styles.input} placeholder='Type your name' value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder='Type your email' value={email} onChangeText={setEmail} />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder='Type your password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.showHideButton} onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={submitButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#f0f0f0'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  input: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    marginBottom: 15
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16
  },
  showHideButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10
  },
  showHideText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
