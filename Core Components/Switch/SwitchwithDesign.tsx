import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SwitchBasics() {
  const [isEnable, setIsEnabled] = useState<boolean>(false);

  return (
    <View style={[styles.container, { backgroundColor: isEnable ? '#222' : '#f9f9f9' }]}>
      <Text style={[styles.textSwitch, { color: isEnable ? '#fff' : '#000' }]}>
        {isEnable ? 'Dark Mode ON 🌙' : 'Light Mode OFF ☀️'}
      </Text>

      <Switch
        value={isEnable}
        onValueChange={setIsEnabled}
        thumbColor={isEnable ? '#fff' : '#444'}
        trackColor={{ false: '#ccc', true: '#81b0ff' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // <-- This makes it take the full screen height
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  textSwitch: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
