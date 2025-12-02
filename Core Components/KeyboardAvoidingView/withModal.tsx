import React, {useState} from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Modal, Pressable, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const lightTheme = {
  background: "#F5F5F5",
 
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};


const darkTheme = {
  background: "#121212",
  
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};

export default function KeyboardAvoidingViewLesson3() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>

      <Pressable onPress={() => setModalVisible(true)}
      onLongPress={() => alert("Long pressed")}
      delayLongPress={400}
      android_ripple={{ color: theme.ripple }}
      hitSlop={10}
      accessibilityRole="button"
      style = {({pressed}) => [
        styles.buttonOpenModal,
        {backgroundColor: pressed ? theme.accent : theme.warning}
      ]}>

        <Text style = {[styles.textOpenModal, {color: theme.textPrimary}]}>
          Open Modal
        </Text>
      </Pressable>

      <Modal visible={modalVisible} transparent={true}>

        <View style = {[styles.modalOverlay]}>

          <KeyboardAvoidingView
          behavior='height'
          style = {[styles.modalContainer]}>

            <ScrollView contentContainerStyle={{ padding: 20}}>

              <Text style = {[styles.textTitle, {color: theme.textPrimary}]}>
                Enter details
              </Text>

              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>
              <TextInput style = {[styles.input]} placeholder='type your name' placeholderTextColor={theme.textPrimary}/>

              <Pressable onPress={() => setModalVisible(false)}
              onLongPress={() => alert("Long pressed")}
              delayLongPress={400}
              android_ripple={{ color: theme.ripple }}
              hitSlop={10}
              accessibilityRole="button"
              style = {({pressed}) => [
              styles.buttonCloseModal,
              {backgroundColor: pressed ? theme.accent : theme.warning}]}>
              <Text style = {[styles.textCloseModal, {color: theme.textPrimary}]}>
                Close Modal
              </Text>
              </Pressable>

            </ScrollView>

          </KeyboardAvoidingView>
        </View>
      </Modal>

    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  buttonOpenModal: {
    borderWidth: 1,
    borderRadius: 20,
    width: '30%',
    paddingVertical: 5,
    padding: 10,
    margin: 10,


    
  },

  textOpenModal: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  },

modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)", // 🔥 makes modal visible
},

modalContainer: {
  width: "80%",
  maxHeight: "80%",
  backgroundColor: "#fff",
  borderRadius: 10,
  margin: 10,
  alignItems: 'center'
},

  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'

  },

  input: {
    width: 200,
    margin: 10,
    borderWidth: 1,
    alignItems: 'center',
    
    

  },

  buttonCloseModal: {
    borderWidth: 1,
    borderRadius: 20,
    width: '40%',
    paddingVertical: 5,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center'

  },

  textCloseModal: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  }


})
 

