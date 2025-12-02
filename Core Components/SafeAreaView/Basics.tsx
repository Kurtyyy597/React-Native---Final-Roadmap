import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default function SafeAreaviewBasics() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text style={styles.title}>Hello!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Remove the line
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
