import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, Image, Alert, StyleSheet, Switch} from 'react-native';

export default function SwitchTask5() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [applyMode, setApplyMode] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const loginButton = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(`Please fill in all fields!`);
      return;
    };

    if (!/^[A-Za-z\s]+$/.test(username) ) {
      Alert.alert(`Name should not contain numbers!`);
      return;
    };

    if (password.length < 6) {
      Alert.alert(`Password must be at least 6 characters!`);
      return;
    };

    if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
    Alert.alert("Password must contain at least one capital letter and one number!");
    return;
    };

    setShowStatus(true);
    Alert.alert("LOGIN SUCCESS!");
    setImage(require('../../../Images/Kurt.jpg'));
    setMessage(`Welcome back ${username}!`);
    setRole("Admin")
    const now = new Date().toLocaleString();
    setDate(now);
    setApplyMode(darkMode);
    setUsername("");
    setPassword("");

  };

  const logoutButton = () => {
    setShowStatus(false);
    setImage(null);
    setDarkMode(false);
    setPassword("");
    setUsername("");
    setShowPassword(false);
    setApplyMode(false);
  };

  return (
    <View style = {[styles.container, {backgroundColor: applyMode ? '#444': '#fff'}]}>
      <Text style = {styles.textTitle}> My Login App </Text>

      <View style = {styles.loginForm}>
        <Text style = {styles.loginText2}> Login your account </Text>
        <TextInput style = {styles.input} placeholder='type your username' value={username} onChangeText={setUsername}/>
        <TextInput style = {styles.input} placeholder='type your password' value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
        <Text style = {styles.textShowPassword}> {showPassword ? "show" : "hide"} </Text>
        <Switch value={showPassword} onValueChange={setShowPassword}/>
        <Text style = {[styles.textSwitch, {color: darkMode ? '#444': '#17b3e8ff'}]}>
          {darkMode ? "DARK MODE ON" : "DARK MODE OFF"}
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode}/>
        <Pressable
        onPress={loginButton}
        style={({pressed}) => [
          styles.loginButton,
          {backgroundColor: pressed? '#2808deff' : '#f5f5f5ff'}
        ]}>
          <Text style = {styles.loginText}> Login </Text>
        </Pressable>

        
       
      </View>
      {showStatus && (
          <View style = {styles.outputContainer}>
            <Image style = {styles.imageOutput} source={image}/>
            <Text style = {styles.textOutput}> {message} </Text>
            <Text style = {styles.textOutput}> Role: {role}</Text>
            <Text style = {styles.textOutput}> Date: {date} </Text>
            <Text style = {styles.textOutput}> Dark Mode: {applyMode ? "ON" : "OFF"}</Text>
            <Text style={styles.textOutput}>
            Last Login: {date ? date : "No previous login"}
            </Text>
            <Pressable
            onPress={logoutButton}
            style={({pressed}) => [
              styles.buttonLogout,
              {backgroundColor: pressed ? '#38e708ff' : '#f5eeeeff'}
            ]}>
              <Text style = {styles.logoutText}> Logout </Text>
            </Pressable>
            </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
    


  },

  textTitle: {
    color: '#2b1d1dff',
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'capitalize',

    
  

  },

  loginText2: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    
  },

  loginForm: {

    borderWidth: 3,
    marginTop: 20,
    width: '85%',
    borderRadius: 30,
    height: 350,

  },

  input: {
    marginTop: 10,
    width: '85%',
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 25,
    fontSize: 16,
    backgroundColor: '#fafcfcff'


  },

  textShowPassword: {
    textAlign: 'center',
    fontSize: 14,
    
    

  },

  textSwitch: {
    textAlign: 'center',
    fontSize: 16,
    

  },

  loginButton: {
    width: '85%',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'
    


  },

  loginText: {
    fontSize: 18,
    fontWeight: 'bold',


  },

  outputContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center'

  },

  imageOutput: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,



  },

  textOutput: {
    fontSize: 16,
    color: '#040404ff',
    textAlign: 'center',
    fontWeight: 'bold'


  },

  buttonLogout: {
    borderWidth: 4,
    marginTop: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: '#f1e0e0ff'

    

  },

  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fa6d6dff',
    textAlign: 'center',
    textTransform: 'capitalize'
    

  }


})