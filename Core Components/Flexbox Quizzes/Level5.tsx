import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

export default function FlexBoxLevel5() {
  return (
    <View style = {styles.mainContainer}>

      {/* Card Container */}
      <View style = {styles.cardContainer}>
        
        {/* Image PhOTO */}
        <Image source={require('../../Images/Nike Pegasus 41.jpg')} style = {styles.imagePhoto}/>
        {/* Image PhOTO */}

        {/* INFO SECTION CONTAINER */}
        <View style = {styles.infoContainer}>
          <Text style = {styles.textShoesName}> Nike Pegasus 41</Text>
          <Text style = {styles.shoesDescription}>
          Responsive cushioning in the Pegasus provides an energized ride for everyday road running.
          </Text>
          <Text style = {styles.productPrice}> ₱1999 </Text>

          <Pressable style  = {styles.buyButton}>
            <Text style = {styles.textBuyButton}> Buy</Text>
          </Pressable>
        </View>
        {/* INFO SECTION CONTAINER */}

      </View>
       {/* Card Container */}
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 50
    

  },

  cardContainer: {
    flexDirection: 'row',
    
    padding: 10,
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,


    



  },

  imagePhoto: {
    width: 120,
    height: 120,
    borderRadius: 20

  },

  infoContainer: {
    flexDirection: 'column',
    gap: 5,
    flex: 1,
    padding: 10
  
    
    

  },

  textShoesName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',

  },

  shoesDescription: {
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'left',

  },

  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',

  },

  buyButton: {
    marginTop: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#245ae4ff',
    width: '50%',
    alignItems: 'center',
    alignSelf: 'flex-start'
    
    
    

    


  },

  textBuyButton: {
    fontWeight: 'bold',
    fontSize: 20,
    
  

  },





})