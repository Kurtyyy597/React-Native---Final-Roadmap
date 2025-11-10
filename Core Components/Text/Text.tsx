import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function TextBasics() {
    return (
        <View style={styles.container}>
            <View>
                <Text style = {styles.title}> ITO ANG TITLE! </Text>
                <Text style = {styles.section}> ITO ANG SUBTITLE </Text>
                <Text style= {styles.footer}> ITO ANG PAA </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-evenly'
    },

    title: {
        color:"#333",
        fontSize: 20,
        textTransform: 'capitalize'
    },

    section: {
        color: '#a2d24033',
        fontSize: 15,
        textTransform: 'uppercase'
    },

    footer: {
        color: '#132797ff',
        fontSize: 10,
        textTransform: 'lowercase'
    }



})