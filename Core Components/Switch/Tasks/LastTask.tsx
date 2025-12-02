import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, Image, Alert, StyleSheet, Switch, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProfileScreen: {
    name: string;
    email: string;
    age: string;
    religion: string;
    profileImage: string;
    loginDate: string;
    role: string;
  };
};

export default function SwitchLastTask() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [religion, setReligion] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Request permission for ImagePicker
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photos to upload your profile image.');
      }
    })();
  }, []);

  // Pick profile image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Login button
  const loginButton = () => {
    if (!email.trim() || !password.trim() || !name.trim() || !age.trim() || !religion.trim()) {
      Alert.alert('Please fill in all fields!');
      return;
    }
    if (!profileImage) {
      Alert.alert('Upload a profile picture!');
      return;
    }
    if (!email.includes('@gmail.com')) {
      Alert.alert('Invalid email format!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters!');
      return;
    }

    let role = '';
    if (email.toLowerCase() === 'admin123@gmail.com' && password === 'Admin2') {
      role = 'Admin';
    } else if (email.toLowerCase() === 'user123@gmail.com' && password === 'User2') {
      role = 'User';
    } else {
      Alert.alert('Invalid credentials!');
      return;
    }

    const loginDate = new Date().toLocaleString();

    // Navigate to Profile screen and pass data
   navigation.navigate('ProfileScreen', {
    name: name,
    email: email,
    age: age,
    religion: religion,
    profileImage: profileImage,
    loginDate: loginDate,
    role: role,
});

  };

  return (
    <View style={[styles.container, {backgroundColor: darkMode ? '#222' : '#fff'}]}>
      <Text style={styles.title}>PORTAL LOGIN</Text>

      <Pressable style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageText}>Upload Picture</Text>
      </Pressable>
      {profileImage && <Image source={{uri: profileImage}} style={styles.imagePreview} />}

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.showPassButton}>
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
        </Pressable>
      </View>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Religion" value={religion} onChangeText={setReligion} />

      <View style={styles.darkModeContainer}>
        <Text style={{color: darkMode ? '#fff' : '#000'}}>Dark Mode: {darkMode ? 'ON' : 'OFF'}</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Pressable style={styles.loginButton} onPress={loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  imageButton: { width: 120, height: 50, borderWidth: 1, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  imageText: { fontWeight: 'bold' },
  imagePreview: { width: 120, height: 120, borderRadius: 20, marginVertical: 10 },
  input: { width: '80%', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, marginVertical: 5 },
  passwordContainer: { flexDirection: 'row', width: '80%', borderWidth: 1, borderRadius: 20, alignItems: 'center', marginVertical: 5 },
  inputPassword: { flex: 1, paddingHorizontal: 10, height: 40 },
  showPassButton: { paddingHorizontal: 10 },
  darkModeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', marginVertical: 10 },
  loginButton: { backgroundColor: '#6eee1a', padding: 10, borderRadius: 20, marginTop: 10, width: '50%', alignItems: 'center' },
  loginText: { 
  fontWeight: 'bold',
  textAlign: 'center'
},
});
