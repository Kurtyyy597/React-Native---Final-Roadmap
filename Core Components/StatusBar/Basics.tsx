import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function StatusBarLesson1() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>

      {/* 
        ⭐ BASIC STATUS BAR  
        barStyle controls the color of the text/icons in the status bar.
        - "dark-content" → dark icons (best for light backgrounds)
      */}
      <StatusBar barStyle='dark-content' />

      <Text style={[styles.title, { color: '#000' }]}>
        StatusBar Basics
      </Text>

      <View style={[styles.box, { backgroundColor: '#24ea2dff' }]}>
        <Text style={[styles.boxText]}>
          barStyle = "dark-content"
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,            // screen fills vertically
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  box: {
    
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 16,
    color: '#444',
  },
});
