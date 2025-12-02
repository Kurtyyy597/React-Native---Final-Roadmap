import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function UseEffectTopic1() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("Welcome kurt kaya mo yan. Kakayanin mo!");
  }, []);

  return (
    <View style = {[styles.container]}>
      <Text style = {[styles.textOutput]}> Message ko sa sarili ko! {message} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    

  },

  textOutput: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 40,


  },


})