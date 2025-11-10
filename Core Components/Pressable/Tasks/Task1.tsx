import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function MoodSwitcherTask1() {
  const [mood, setMood] = useState<"happy" | "sad" | "neutral">("neutral");

  // Function to change the mood
  const toggleMood = () => {
    if (mood === "neutral") setMood("happy");
    else if (mood === "happy") setMood("sad");
    else setMood("neutral");
  };

  // Function to get color based on mood
  const getMoodColor = () => {
    switch (mood) {
      case "happy":
        return "#FFD54F"; // yellow
      case "sad":
        return "#90CAF9"; // blue
      default:
        return "#E0E0E0"; // gray
    }
  };

  // Function to get emoji and text
  const getMoodText = () => {
    switch (mood) {
      case "happy":
        return "😊 Happy Mood";
      case "sad":
        return "😢 Sad Mood";
      default:
        return "😐 Neutral Mood";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getMoodColor() }]}>
      <Text style={styles.title}>Mood Switcher</Text>

      <Pressable
        onPress={toggleMood}
        onLongPress={() => setMood("neutral")}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#616161" : "#424242" },
        ]}
      >
        <Text style={styles.buttonText}>Change Mood</Text>
      </Pressable>

      <Text style={styles.moodText}>{getMoodText()}</Text>
      <Text style={styles.hintText}>
        Tap to change mood • Long press to reset
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 1,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  moodText: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
  },
  hintText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
});
