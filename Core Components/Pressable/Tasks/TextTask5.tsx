import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, Alert, StyleSheet } from 'react-native';

export default function PressableTask5() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [savedUser, setSavedUser] = useState<string>('');
  const [savedPass, setSavedPass] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const handleSave = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Please fill in all fields!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long!');
      return;
    }

    setSavedUser(username);
    setSavedPass(password);
    setShowProfile(true);
    Alert.alert('Profile Saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <Image
        source={require('../../../Images/Kurt.jpg')}
        style={styles.profileImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* password + show button side by side */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={({ pressed }) => [
            styles.showPasswordButton,
            { backgroundColor: pressed ? '#ddd' : '#565151' },
          ]}
        >
          <Text style={styles.showText}>{showPassword ? '🙈' : '👁'}</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [
          styles.saveButton,
          { backgroundColor: pressed ? '#c3f5a4' : '#92d36e' },
        ]}
      >
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </Pressable>

      {showProfile && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>✅ Profile Saved Successfully!</Text>
          <Text style={styles.resultText}>Username: {savedUser}</Text>
          <Text style={styles.resultText}>Password: {savedPass}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    marginBottom: 20,
  },

  input: {
    borderWidth: 2,
    borderColor: '#c4c4c4',
    borderRadius: 10,
    padding: 10,
    width: '85%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
  },

  showPasswordButton: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 8,
  },

  showText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  saveButton: {
    padding: 12,
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: '#222',
    fontWeight: 'bold',
  },

  resultContainer: {
    marginTop: 25,
    alignItems: 'center',
  },

  resultText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
