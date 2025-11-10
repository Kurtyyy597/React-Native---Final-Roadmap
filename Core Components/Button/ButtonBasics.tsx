import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ButtonBasics() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click the button</Text>

      <Button
        title="Press Me"
        onPress={() => alert("Button Clicked!")}
        color="#2196F3" // button color (Android only)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  }
});
