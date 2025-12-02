import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StatusBarLesson2() {
  return (
    <>
      <StatusBar
        style='dark'
        backgroundColor="#ff0000"
        translucent={false}
      />

      <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>
        <View style={[styles.header, { backgroundColor: '#2bd8ff' }]}>
          <Text style={[styles.headerText, { color: '#fff' }]}>
            Android Header + StatusBar Color
          </Text>
        </View>

        <View style={[styles.content, { backgroundColor: '#fff' }]}>
          <Text style={[styles.contentText]}>
            This screen uses a colored StatusBar (Android only).
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  header: {
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#444',
  },
});
