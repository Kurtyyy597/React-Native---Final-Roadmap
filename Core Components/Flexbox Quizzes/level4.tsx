import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

export default function FlexBoxLevel4() {
  return (
    
    <View style = {styles.mainContainer}>   {/*Main Container */}

      
      
   
      <Image source={require('../../Images/Kurt.jpg')} style = {styles.imagePhoto}/>
     
      

      
      
      
      {/*Profile Container */}
      <View style = {styles.infoSection}>
        <Text style = {styles.nameText}> Kurt Allen A. Marquez </Text>
        <Text style = {styles.emailText}> kurtmarquez238@gmail.com </Text>

        <Pressable style = {styles.followButton}>
          <Text style = {styles.textFollow}> follow </Text>
        </Pressable>
      </View>
      {/*Profile Container */}











     {/*Main Container */}
    </View>
    
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 20
    

  },
    imagePhoto: {
    width: 120,
    height: 120,
    borderRadius: 20

  },

  infoSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8

  },

  nameText: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',


  },

  emailText: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',

  },

  followButton: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
    backgroundColor: '#1e62ffff'

  },

  textFollow: {
    fontSize: 16,
    fontWeight: 'bold',
    

  },
})