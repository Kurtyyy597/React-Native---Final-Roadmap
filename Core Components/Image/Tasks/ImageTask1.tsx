import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function ImageTask1() {
    return (
        <View style = {styles.container}> 

        <View style = {{alignItems: 'center'}}>
            <Image source={require('../../Images/Miles.jpg')} style={styles.image}/>
            <Text style = {styles.title}> Hello I am Kurt Allen A. Marquez </Text>
            <Text style = {styles.future}> Hoping that i become mobile developer!</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30b612ff'
    },

    image: {
        width: 100,
        height: 100,
        resizeMode: 'center',
        borderRadius: 1000,
        justifyContent: 'center'
        
    },



    title: {
        color: '#180404ff',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold'

    },

    future: {
        color: '#0d38b7ff',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold'
    }
})