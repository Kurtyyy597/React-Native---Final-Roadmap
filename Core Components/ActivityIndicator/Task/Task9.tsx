import React, {useState} from 'react';
import {View, Text, TextInput, Alert, Image, ActivityIndicator, Switch, StyleSheet, Pressable} from 'react-native';



const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#D1E9FF",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
};

const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
};

export default function ActivityIndicatorTask9() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>("");
  const [saveGoal, setSavedGoal] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [saveMood, setSavedMood] = useState<string>("");
  const [focusModeUser, setFocusModeUser] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [messageFocus, setMessageFocus] = useState<string>("")

  const theme = darkMode ? darkTheme : lightTheme;


  const saveUserGoal = () => {
    if (!goal.trim() || !mood.trim()) {
      Alert.alert(`Please fill in all fields!`);
      return;
    };

    if (focusModeUser) {
      setMessageFocus("Its good that you are focus!");
    } else {
      setMessageFocus("You should focus next time!");
    }

    setLoading(true);
    setSeconds(3);
    setShowProfile(false);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);

          setSavedGoal(goal);
          setSavedMood(mood);
          setDate(new Date().toLocaleDateString());
          setTime(new Date().toLocaleTimeString());

          setGoal("");
          setMood("");

          setShowProfile(true);
          setLoading(false);
          Alert.alert(`🎉Goal Saved Successfully!`);
          return 0;
        } else {
          return prev - 1
        }
      });
    }, 1000);
  };

  const clearAll = () => {
    Alert.alert(
      'Reset?',
      'This will clear all the information and light mode',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setSeconds(0);
            setGoal("");
            setDate("");
            setTime("");
            setFocusModeUser(false);
            setImage(null);
            setMood("");
            setSavedGoal("");
            setSavedMood("");
            setLoading(false);
            setDarkMode(false);
            setShowProfile(false);
          }
        }
      ]
    );
  };

  return (
    <View 
      style = {[styles.container, {backgroundColor: theme.background}]}>
      accessibble={true}
      accessibilityLabel="Main container"
      accessibilityHint= "basic layout box"

      <Image style = {[styles.imageBackGround, {backgroundColor: theme.border}]} resizeMode='cover' source={require('../../../Images/focus.jpg')}/>

      <View style={styles.toggleDarkModeContainer}>
      <Text style = {[styles.textDarkMode, {color: theme.textPrimary}]}>
        Theme: {darkMode ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch
      value={darkMode}
      onValueChange={setDarkMode}
      trackColor={{true: theme.accent, false: theme.success}}
      thumbColor={darkMode ? theme.accent : theme.success}/>
      </View>

      <View style = {[styles.inputForms, {backgroundColor: theme.background}]}>
        <TextInput style = {[styles.input, {backgroundColor: theme.surface, color: theme.textPrimary, borderColor: theme.border}]}
        placeholder='type your goals'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={goal}
        onChangeText={setGoal}
        placeholderTextColor={theme.textSecondary}
        cursorColor={theme.accent}/>

        <TextInput style = {[styles.input, {backgroundColor: theme.surface, color: theme.textPrimary, borderColor: theme.border}]}
        placeholder='type your mood'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={mood}
        onChangeText={setMood}
        placeholderTextColor={theme.textSecondary}
        cursorColor={theme.accent}/>
        
        <View style = {[styles.SwitchFocusModeUser, {backgroundColor: theme.background}]}> 
        <Text style = {[styles.textFocusMode, {color: theme.textPrimary}]}>
          Focus? {focusModeUser ? "Yes" : "No"}
        </Text>
        <Switch 
        value={focusModeUser} 
        onValueChange={setFocusModeUser} 
        thumbColor={focusModeUser ? theme.accent : theme.accent}
        trackColor={{true: theme.accent, false: theme.success}}
        />
        
        </View>

        <Pressable
        onPress={saveUserGoal}
        disabled={loading}
        style = {({pressed}) => [
          styles.saveButton,
          {
            backgroundColor: theme.accent,
            borderColor: theme.border,
            opacity: loading ? 0.7 : 1,
          },
          pressed && !loading && styles.pressed
        ]}
        android_ripple={{color: theme.ripple}}
        accessibilityRole='button'
        accessibilityLabel='Save Goal'>

          <Text style = {[styles.textSaveButton, {color: theme.accentText}]}>
            Save
          </Text>
        </Pressable>
      </View>

      {loading && (
        <View style = {[styles.loadingView, {backgroundColor: theme.background}]}>
          <ActivityIndicator size={'large'} color={theme.accent} animating={true}/>
          <Text style = {[styles.textLoading, {color: theme.textPrimary}]}>
           ⏳ Saving your goal... {seconds}s
          </Text>
          </View>
      )}

      {!loading && showProfile&& (
        <View style = {[styles.profileCardOutput, {backgroundColor: theme.background, borderColor: theme.border}]}>
          <Text style={[styles.cardHeader, { color: theme.accent }]}>🎯 Daily Focus Summary</Text>
          <View style={styles.cardDivider} />
          <Text style = {[styles.outputText, {color: theme.textPrimary}]}> Goal: {saveGoal}</Text>
          <Text style = {[styles.outputText, {color: theme.textPrimary}]}> Mood: {saveMood} </Text>
          <Text style = {[styles.outputText, {color: theme.textPrimary}]}> Focus Mode: {focusModeUser ? "ON" : "OFF"} </Text>
          <Text style = {[styles.outputText, {color: theme.textPrimary}]}> {messageFocus} </Text>
          <Text style={[styles.outputText, { color: theme.textSecondary }]}> 📅 {date} | ⏰ {time}
  </Text>

         
          <Pressable
          onPress={clearAll}
          onLongPress={() => console.log(`Long pressed`)}
          android_ripple={{
            color: theme.ripple
          }}
          accessibilityRole='button'
          accessibilityLabel='clear button'
          hitSlop={10}
          style={({pressed}) => [
            styles.clearButton,
            {
            backgroundColor: pressed ? theme.accent : theme.success,
            borderColor: theme.border
            
          }]}>
            <Text style = {[styles.textClearAll, {color: theme.textPrimary}]}>
              Clear All
            </Text>
          </Pressable>
        </View>

       
      )}
      
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    

  },

  imageBackGround: {
    marginTop: 50,
    width: 350,
    height: 180,
    borderRadius: 20

  },

  toggleDarkModeContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'

  },

  textDarkMode: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  inputForms: {
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    width: '90%',
    height: 220,
    marginTop: 5,

  },

  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    fontSize: 16

  },

  SwitchFocusModeUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },

  textFocusMode: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    

  },

  pressed: {

  },

  textSaveButton: {
    fontSize: 20,
    fontWeight: 'bold'

  },

  loadingView: {


  },

  textLoading: {
    alignItems: 'center'

  },
  
  profileCardOutput: {
  bottom: 100,
  width: '90%',
  alignSelf: 'center',
  marginTop: 25,
  padding: 20,
  borderRadius: 20,
  borderWidth: 1,
  elevation: 6, // deeper Android shadow
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
  alignItems: 'center',
},

outputText: {
  fontSize: 18,
  fontWeight: '600',
  marginVertical: 6,
  textAlign: 'center',
  textTransform: 'capitalize',
},

cardHeader: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},

cardDivider: {
  width: '85%',
  height: 1,
  backgroundColor: '#140202ff',
  marginVertical: 10,
  opacity: 0.5,
},


  

  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow

  },

  textClearAll: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },








 
})

