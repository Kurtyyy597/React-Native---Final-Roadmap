import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function ImageTask2() {
    return (
        <View style={styles.container}>
            
            {/* Center only the card + image */}
            <View style={styles.centerBox}>
                <View style={styles.card}>
                    <Image source={require('../../../Images/Kurt.jpg')} style={styles.image}/>
                </View>
            </View>

            {/* Text stays left */}
            <Text style={styles.name}> Hello I am Kurt Allen A. Marquez </Text>
            <Text style={styles.future}> Hoping that I become mobile developer </Text>
            <Text style={styles.location}> I am from Philippines! </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#131010ff',
        padding: 10,
        paddingTop: 40,
        alignItems: 'flex-start', // text stays left
    },

    // ✅ Wrapper to center card + image only
    centerBox: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },

    card: {
        width: 140,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#564343ff',
        shadowColor: '#000',
        elevation: 5,
        shadowRadius: 10,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        resizeMode: 'cover'
    },

    name: {
        color: '#3bf6f6ff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        letterSpacing: 1,
        marginBottom: 5,
    },

    future: {
        color: '#19e8e8ff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        letterSpacing: 1,
        marginBottom: 5,
    },

    location: {
        color: '#d6eff1ff',
        fontSize: 12,
        textAlign: 'left',
        letterSpacing: 1,
    }
});
