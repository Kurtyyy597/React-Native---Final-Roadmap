import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

export default function ExampleModal() {
  const [modalVisible, setModalVisible] = useState(false); // control visibility

  return (
    <View style={styles.container}>
      {/* Button that shows modal */}
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      {/* 🪟 Modal Component */}
      <Modal
        animationType="slide" // other options: 'fade', 'none'
        transparent={true}    // background shows through with dim effect
        visible={modalVisible} // controls open/close
        onRequestClose={() => setModalVisible(false)} // Android back button
      >
        {/* Content inside the modal */}
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>This is a Modal! 🪟</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 🪩 Semi-transparent background behind the modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 📦 The actual modal box
  modalBox: {
    width: 300,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 8, // shadow for Android
  },

  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
});
