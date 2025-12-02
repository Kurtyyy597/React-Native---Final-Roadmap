import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

export default function SafeAreaViewTask1() {
  return (
    <SafeAreaView style = {[styles.container, {flex: 1, backgroundColor: '#fff'}]}>
      <Text style = {[styles.textTitle, {color: '#000000ff'}]}> My Profile </Text>

      <View style = {[styles.profileContainer, {backgroundColor: '#fff'}]}>
        <View style = {[styles.profileCard, {backgroundColor: '#72ef0bff'}]}>
          <Image source={require('../../../Images/Kurt.jpg')} style = {[styles.imageProfile]}/>

          <View style = {[styles.textContainer, {backgroundColor: '#fff'}]}> 
          <Text style = {[styles.textName, {color: '#444'}]}> Kurt Allen A. Marquez </Text>
          <Text style = {[styles.textDream, {color: '#444'}]}> Aspiring to become mobile developer! </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  profileContainer: {
    flexDirection: 'column',
    width: '85%',
    margin: 10,
    gap: 15
    

  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    

  },

  imageProfile: {
    width: 120,
    height: 140,
    borderRadius: 20,
    

  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10
  },

  textName: {
    
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',


  },

  textDream: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',

  }
})