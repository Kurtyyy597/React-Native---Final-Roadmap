import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Pressable, Alert, Image } from 'react-native';

export default function SwitchTask3() {
  const [name, setName] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [saveName, setSaveName] = useState<string>('');
  const [saveMood, setSaveMood] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>('#fff');

  const saveProfile = () => {
    if (!name.trim() || !mood.trim()) {
      Alert.alert('Please fill in all fields!');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert('Name must not contain numbers!');
      return;
    }

    const currentMood = mood.toLowerCase(); // save mood before clearing
    setSaveName(name);
    setSaveMood(currentMood);
    setShowProfile(true);

    // Handle mood image & background
    switch (currentMood) {
      case 'happy':
        setMessage(`That's good news! I'm glad you are happy, ${name}! 😄`);
        setImage(require('../../../Images/happy.jpg'));
        setBgColor('#d4ed45ff');
        break;
      case 'sad':
        setMessage(`Awe, you will be okay soon, ${name}! 😢`);
        setImage(require('../../../Images/sad.jpg'));
        setBgColor('#87CEFA');
        break;
      case 'angry':
        setMessage(`I understand your feeling 😡! Just relax and take a deep breath.`);
        setImage(require('../../../Images/angry.jpg'));
        setBgColor('#FF6347');
        break;
      default:
        setMessage('Your mood is neutral.');
        setImage(null);
        setBgColor('#f5f5f5');
    }

    // Clear inputs
    setName('');
    setMood('');
  };

  const clearInfo = () => {
    setShowProfile(false);
    setImage(null);
    setMessage('');
    setName('');
    setMood('');
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.textTitle}>WELCOME TO MOOD PICKER</Text>

      <View style={styles.moodForm}>
        <TextInput
          style={styles.input}
          placeholder="Type your name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mood? (happy/sad/angry)"
          value={mood}
          onChangeText={setMood}
        />
        <Text style={styles.switchText}>
          {privacy ? 'Your privacy is public' : 'Your privacy is private'}
        </Text>
        <Switch value={privacy} onValueChange={setPrivacy} />
        <Pressable
          onPress={saveProfile}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: pressed ? '#53ec11ff' : '#fff' },
          ]}
        >
          <Text style={styles.textButton}>Save Profile</Text>
        </Pressable>
        <Pressable
          onPress={clearInfo}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: pressed ? '#ff5555' : '#fff' },
          ]}
        >
          <Text style={styles.textButton}>Clear Profile</Text>
        </Pressable>
      </View>

      {showProfile && (
        <View style={styles.resultContainer}>
          {image && <Image style={styles.imageOutput} source={image} />}
          <Text style={styles.textOutput}>Name: {saveName}</Text>
          <Text style={styles.textOutput}>Mood: {saveMood} </Text>
          <Text style={styles.textOutput}>{message}</Text>
          <Text style={styles.textOutput}>
            Your current color based on your mood: {bgColor}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

  textTitle: {
    color: '#040404ff',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginBottom: 40,
  },

  moodForm: {
    borderWidth: 4,
    width: '85%',
    borderRadius: 10,
    borderColor: '#5f5b5bff',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    width: '85%',
    borderWidth: 1,
    fontSize: 14,
    borderColor: '#6c6767ff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
  },

  switchText: {
    marginTop: 5,
    color: '#444',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
    borderWidth: 1,
    width: '85%',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },

  saveButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: '85%',
    marginVertical: 5,
    paddingVertical: 10,
  },

  textButton: {
    color: '#2638e2ff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  resultContainer: {
    alignItems: 'center',
    paddingTop: 5,
  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
  },

  textOutput: {
    color: '#444',
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
