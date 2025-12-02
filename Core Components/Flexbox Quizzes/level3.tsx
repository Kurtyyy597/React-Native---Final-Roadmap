import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function FlexBoxLevel3() {
  return (
    <View style={styles.mainContainer}>

      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.box}><Text>1</Text></View>
        <View style={styles.box}><Text>2</Text></View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.box}><Text>3</Text></View>
        <View style={styles.box}><Text>4</Text></View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,        // space between rows
    backgroundColor: '#fff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,        // space between columns
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: '#4ade80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
