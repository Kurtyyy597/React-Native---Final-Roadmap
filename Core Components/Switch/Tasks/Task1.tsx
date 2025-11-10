import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Switch, Pressable, Alert } from 'react-native';

export default function SwitchTask1() {
  const [name, setName] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [switchMode, setSwitchMode] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [saveMood, setSavedMood] = useState<string>("");
  const [saveProfile, setSavedProfile] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const saveProfileUser = () => {
    if (!name.trim() || !mood.trim()) {
      Alert.alert(`Please fill in all fields`);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert(`Your name must not contain numbers!`);
      return;
    }

    setSavedProfile(true);
    getMoodColor(mood); // pass current mood
    setSaveName(name);
    setSavedMood(mood);
    Alert.alert(`Profile Saved!`);
    setMessage(`This is your profile`);
    setName("");
    setMood("");
  };

  const getMoodColor = (currentMood: string) => {
    switch (currentMood.toLowerCase()) {
      case 'happy':
        setImage(require('../../../Images/happy.jpg'));
        setBgColor('#fff');
        break;
      case 'sad':
        setImage(require('../../../Images/sad.jpg'));
        setBgColor('#605c5cff');
        break;
      case 'angry':
        setImage(require('../../../Images/angry.jpg'));
        setBgColor('#f60808ff');
        break;
      default:
        setBgColor('#383535ff');
        setImage(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.textTitle}>Profile Creator</Text>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder='Type your name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder='Mood? (happy/sad/angry)'
          value={mood}
          onChangeText={setMood} // fixed
        />
        <Text style={styles.textSwitch}>
          {switchMode ? "SWITCH IS ON" : "SWITCH IS OFF"}
        </Text>
        <Switch
          value={switchMode}
          onValueChange={setSwitchMode}
          thumbColor={switchMode ? '#e61717ff' : '#555'}
          trackColor={{ true: '#fff', false: '#555' }}
        />
        <Pressable
          onPress={saveProfileUser}
          style={({ pressed }) => [
            styles.buttonSave,
            { backgroundColor: pressed ? "#2fe00bff" : "#747272ff" }
          ]}
        >
          <Text style={styles.textButtonSave}>Save Profile</Text>
        </Pressable>

        {saveProfile && (
          <View style={styles.outputContainer}>
            {image && <Image style={styles.imageContainer} source={image} />}
            <Text style={styles.textOutput}>
              {message} {"\n"}
              Name: {saveName} {"\n"}
              Mood: {saveMood}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputForm: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  textSwitch: {
    marginVertical: 10,
    fontSize: 16,
  },
  buttonSave: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  textButtonSave: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  outputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 60,
  },
  textOutput: {
    fontSize: 16,
    textAlign: 'center',
  },
});
