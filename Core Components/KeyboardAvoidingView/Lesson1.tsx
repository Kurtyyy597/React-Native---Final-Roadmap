import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default function KeyboardAvoidingViewAndroid1() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>

      {/* ⭐ ANDROID BEST PRACTICE
          behavior="height" gives safe spacing above the keyboard
      */}
      <KeyboardAvoidingView
        behavior="height"
        style={[styles.avoiding]}
      >
        <Text style={[styles.title, { color: '#000' }]}>
          Android KeyboardAvoidingView
        </Text>

        <TextInput
          style={[styles.input]}
          placeholder="Enter something"
          placeholderTextColor="#888"
        />

        <TextInput
          style={[styles.input]}
          placeholder="More text..."
          placeholderTextColor="#888"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoiding: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#000',
  },
});
