import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';

export default function TouchableOpacityTask8() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bgcolor, setBgColor] = useState<string>("");
  const [login, setLoggedIn] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getGreeting = () => {
     const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(`Good morning!`);
      setBgColor('#def10dff')
    } else if (hour < 18) {
      setGreeting(`Good afternoon`)
      setBgColor('rgba(246, 140, 11, 1)')
    } else {
      setGreeting(`Good evening!`)
      setBgColor('#444');
    }
  };

  const loginButton = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(`Please fill in all fields!`);
      return;
    };

    if (email.toLowerCase() === "admin" && password.toLowerCase() === "123") {
      setLoggedIn(true);
      setImage(require('../../../Images/Kurt.jpg'));
      setRole("admin");
      getGreeting();
    } else if (email.toLowerCase() === "user123" && password.toLowerCase() === "user" ) {
      setLoggedIn(true);
      setImage(require('../../../Images/Kurt.jpg'));
      setRole("User");
      getGreeting();
    } else if (email.toLowerCase() === "customer" && password.toLowerCase() === "customer123") {
      setLoggedIn(true);
      setImage(require('../../../Images/Kurt.jpg'));
      setRole('Customer');
      getGreeting();
    } else {
      Alert.alert(`Invalid ACccount`)
    }

}

  const logoutButton = () => {
    setEmail("");
    setGreeting("");
    setImage(null);
    setPassword("");
    setRole("");
    setLoggedIn(false);
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.greetingText}> Welcome here, login your account! </Text>
    
       {/* container ng login form  */}
      <View style = {styles.loginForm}>
      
      {/* Email  */}
      <TextInput style = {styles.input} placeholder='type your email' value={email} onChangeText={setEmail}/>
      
      {/* Password  */}
      <TextInput style = {styles.input} placeholder='type your password' value = {password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
      <TouchableOpacity style = {styles.showHideButton} onPress={() => setShowPassword(!showPassword)}>
        <Text style = {styles.textHideandShow}> {showPassword ? "👁️" : "👁️" }</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity style = {styles.button} onPress={loginButton}>
        <Text style = {styles.loginText}> Login </Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity style = {styles.button} onPress={logoutButton}>
        <Text style = {styles.logoutText}> Logout </Text>
      </TouchableOpacity>
      {/* container ng login form  */}
      </View>

      {login && (
        <View style={[styles.resultsContainer, { backgroundColor: bgcolor }]}>
          <Image style = {styles.image} source={image}/>
          <Text style = {styles.greeting}>{`${greeting} ${role}`}</Text>
          
          </View>
      )}
    </View>)

}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    alignItems: 'center',
    paddingTop: 100,
  },

  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
    paddingBottom: 60

  },

  loginForm: {
    borderWidth: 20,
    borderColor: 'rgba(101, 98, 98, 1)',
    width: 300,
    elevation: 10,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20

  },

  input: {
    borderWidth: 3,
    width: 250,
    marginVertical: 5,
    fontSize: 15,
    elevation: 1,
    fontWeight: 'bold'


  
    
  },

  showHideButton: {
    backgroundColor: '#15020644',
    width: 25,
    borderRadius: 50

    

  },

  textHideandShow: {
    color: '#be7fd6ff',
    backgroundColor: '#010005ff'
  },

  button: {
    width: 200,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#40136eff',
    marginVertical: 3
  },

  loginText: {
    color: '#130101ff',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },

  logoutText: {
    color: '#130101ff',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },

  resultsContainer: {
    flex: 1,
    paddingTop: 30
  },

  image: {
    height: 100,
    width: 200,
    borderRadius: 300,
    elevation: 5,
  },

  greeting: {
    color: '#4444',
    fontWeight: 'bold',
    fontSize: 20
  }
})

  
