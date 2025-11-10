import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ImageSyntax() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Image</Text>
      <Image
        source={require('../Image/ImageSyntax.png')} // ✅ include file extension
        style={styles.image}
      />

      <Text style={styles.title}>Remote Image (URL)</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // ✅ URL syntax
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});