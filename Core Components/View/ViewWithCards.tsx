import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewWithCards() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Hello from a Card!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Take up the full screen
    justifyContent: 'center',   // Center children vertically
    alignItems: 'center',       // Center children horizontally
    backgroundColor: '#e0e0e0', // Light grey background for the screen
  },
  card: {
    width: 250,                 // Set card width
    padding: 20,                // Inner spacing inside the card
    borderRadius: 15,           // Rounded corners of the card
    backgroundColor: '#fff',    // White background for the card
    shadowColor: '#000',        // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.25,        // Shadow transparency (iOS)
    shadowRadius: 3.84,         // Shadow blur radius (iOS)
    elevation: 5,               // Shadow for Android
  },
  text: {
    fontSize: 16,               // Text size
    color: '#333',              // Dark grey text color
  },
});
