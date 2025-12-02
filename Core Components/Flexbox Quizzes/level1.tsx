import React, {} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FlexBoxLevel1() {
  return (
    <View>
      <Text style = {styles.container}> Hello world!</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})