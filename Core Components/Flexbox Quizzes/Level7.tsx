import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function FlexBoxLevel7() {
  return (
    <View style={styles.mainContainer}>
      
      {/* GRID CONTAINER */}
      <View style={styles.gridContainer}>

        {/* CARD 1 */}
        <View style={styles.card}>
          <Image source={require('../../Images/apple.jpg')} style={styles.image} />
          <Text style={styles.title}>Apple</Text>
          <Text style={styles.price}>₱160</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <Image source={require('../../Images/banana.jpg')} style={styles.image} />
          <Text style={styles.title}>Banana</Text>
          <Text style={styles.price}>₱120</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
        </View>

        {/* CARD 3 */}
        <View style={styles.card}>
          <Image source={require('../../Images/grapes.jpg')} style={styles.image} />
          <Text style={styles.title}>Grapes</Text>
          <Text style={styles.price}>₱300</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
        </View>

        {/* CARD 4 */}
        <View style={styles.card}>
          <Image source={require('../../Images/blackberry.jpg')} style={styles.image} />
          <Text style={styles.title}>Black Berry</Text>
          <Text style={styles.price}>₱250</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },

  card: {
    flexBasis: '48%',          // << the magic: 2 cards per row
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',

    // shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  price: {
    fontSize: 15,
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#2210c9ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
