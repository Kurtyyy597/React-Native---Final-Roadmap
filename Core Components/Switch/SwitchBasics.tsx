import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

export default function SwitchBasics() {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <View style = {styles.container}>
      <Text style = {styles.textSwitch}> {enabled ? "Switch is on" : "Switch is off"} </Text>
      <Switch value={enabled} onValueChange={() => setEnabled(!enabled)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    alignItems: 'center'
  },

  textSwitch: {
    color: '#444'
  }
})