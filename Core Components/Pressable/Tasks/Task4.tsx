import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

export default function PressableTask4() {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [saveName, setSaveName] = useState<string>("");
  const [saveBio, setSaveBio] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [saveProfile, setSaveProfile] = useState<boolean>(false);

  const saveButton = () => {
    if (!name.trim() || !bio.trim()) {
      Alert.alert("Please fill in all fields!");
      return;
    }

    if (bio.length < 10) {
      Alert.alert("Your bio is too short!");
      return;
    }

    setImage(require("../../../Images/Kurt.jpg"));
    setSaveName(name);
    setSaveBio(bio);
    setSaveProfile(true);
    Alert.alert("✅ PROFILE SAVED!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Create Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Write a short bio (min. 10 chars)"
        placeholderTextColor="#888"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Pressable
        onPress={saveButton}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#388E3C" : "#4CAF50" },
        ]}
      >
        <Text style={styles.textButton}>Save Profile</Text>
      </Pressable>

      {saveProfile && (
        <View style={styles.resultContainer}>
          <Image style={styles.imageOutput} source={image} />
          <Text style={styles.textOutputName}>{saveName}</Text>
          <Text style={styles.textOutputBio}>{saveBio}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 30,
  },

  input: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#ccc",
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 1
  },

  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  resultContainer: {
    width: "85%",
    backgroundColor: "#eaf60bff",
    borderRadius: 16,
    marginTop: 30,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  textOutputName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  textOutputBio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
