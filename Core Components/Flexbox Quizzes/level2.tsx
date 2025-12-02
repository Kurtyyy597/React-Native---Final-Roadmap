import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FlexBoxLevel2() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  box1: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ffadad',
  },

  box2: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ffd6a5',
  },

  box3: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#caffbf',
  },
});
