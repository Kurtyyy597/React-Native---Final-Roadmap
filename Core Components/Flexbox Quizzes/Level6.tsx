import React, {useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

export default function FlexBoxLevel6() {
  return (
    <View style = {styles.mainContainer}>



      {/* First Row */}
      <View style = {styles.row1}>
        
        {/* Box 1 */}
        <View style = {styles.box1}> 
        <Image source={require('../../Images/apple.jpg')} style = {styles.imageBox1}/>
        <Text style = {styles.textTitle}> Apple </Text>
        <Text style = {styles.textPrice}> ₱160</Text>
        <Pressable style = {styles.buyButton}>
          <Text style = {styles.textBuyButton}> Buy </Text>
        </Pressable>
        </View>
        {/* Box 1 */}
        

        {/* Box 2 */}
        <View style = {styles.box1}>
          <Image source={require('../../Images/blackberry.jpg')} style = {styles.imageBox1}/>
          <Text style = {styles.textTitle}> Black Berry </Text>
          <Text style = {styles.textPrice}> ₱250 </Text>
          <Pressable style = {styles.buyButton}>
          <Text style = {styles.textBuyButton}> Buy </Text>
        </Pressable>
        </View>
        {/* Box 2 */}

      </View>
      {/* First Row */}

      {/* Second Row */}
      <View style = {styles.row1}>
         
         {/* Box 1*/}
         <View style = {styles.box1}>
          <Image source={require('../../Images/banana.jpg')} style = {styles.imageBox1}/>
          <Text style = {styles.textTitle}> Banana </Text>
          <Text style = {styles.textPrice}> ₱250 </Text>
          <Pressable style = {styles.buyButton}>
            <Text style = {styles.textBuyButton}> Buy </Text>
          </Pressable>
         </View>
        {/* Box 1*/}

           {/* Box 2*/}
         <View style = {styles.box1}>
          <Image source={require('../../Images/grapes.jpg')} style = {styles.imageBox1}/>
          <Text style = {styles.textTitle}> Grapes </Text>
          <Text style = {styles.textPrice}> ₱300 </Text>
          <Pressable style = {styles.buyButton}>
            <Text style = {styles.textBuyButton}> Buy </Text>
          </Pressable>
           {/* Box 2*/}
         </View>

      </View>


    
    
    
    
    </View>

  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  
    
    


  },

  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    gap: 20,
    width: '85%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    
    

  },

  imageBox1: {
    width: 120,
    height: 120,
    borderRadius: 20,
 

  },

  box1: {
    flex: 1,
    width: 120,
    height: 'auto',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    

  },

  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',


  },

  textPrice: {
    fontSize: 16,
    fontWeight: '300'

  },

  buyButton: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: '#490fe9ff',
    paddingVertical: 4,
    margin: 10

  },

  textBuyButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    

  },
})