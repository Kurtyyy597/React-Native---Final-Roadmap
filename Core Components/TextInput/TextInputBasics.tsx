import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function TextInputBasics() {
    const [name, setName] = useState<string>("");

    return (
        <View style = {styles.container}>
            <TextInput 
            style = {styles.label}
            value={name}
            onChangeText={setName}/>

            <Text style = {styles.output}> Hello {name} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,              // Adds space at the top of the screen
        flex: 1,                     // Takes full screen height
        justifyContent: 'flex-start',// Align children from the top vertically
        alignItems: 'baseline',      // Align items from the start horizontally
        backgroundColor: '#e9f2f5ff' // Light background color
    },

    label : {
        fontSize: 20,                // Text size for input field content
        backgroundColor: '#9828c844',// Light purple background for input box
        fontWeight: 'bold'           // Makes input text bold
    },

    output: {
        color: 'rgba(4, 2, 11, 1)',  // Text color for output text
        textTransform: 'capitalize', // Makes first letter of each word uppercase
        letterSpacing: 1,            // Adds spacing between characters
        shadowColor: '#4444'         // Text shadow color (visual effect only)
    }
})
