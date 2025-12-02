import React, { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  Switch,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ActivityIndicatorTask7() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [statusAge, setStatusAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exercise, setExercise] = useState(false);
  const [healthyMeal, setHealthyMeal] = useState(false);
  const [waterIntake, setWaterIntake] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [saveName, setSavedName] = useState('');
  const [saveAge, setSavedAge] = useState('');
  const [saveHeight, setSavedHeight] = useState('');
  const [saveWeight, setSavedWeight] = useState('');
  const [saveSleepHours, setSavedSleepHours] = useState('');
  const [saveWaterIntake, setSavedWaterIntake] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

  // Request permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Camera permission is required');
      }

      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== 'granted') {
        Alert.alert('Media library permission is required');
      }
    };
    requestPermissions();
  }, []);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Take a photo
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const checkHealth = () => {
    if (!name.trim() || !age.trim() || !height.trim() || !weight.trim() || !waterIntake.trim() || !sleepHours.trim()) {
      Alert.alert('Please fill in all fields to check your health!');
      return;
    }

    if (isNaN(Number(weight)) || isNaN(Number(height))) {
      Alert.alert('Weight and height should be numbers only!');
      return;
    }

    if (name.length < 3) {
      Alert.alert('Name should contain at least 3 characters!');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      Alert.alert('Name must not contain numbers!');
      return;
    }

    if (isNaN(Number(age))) {
      Alert.alert('Age must be a number!');
      return;
    }

    const numWeight = Number(weight);
    const numHeight = Number(height);
    const numAge = Number(age);

    const heightM = numHeight / 100;
    const bmiCalc = numWeight / (heightM * heightM);
    setBmiResult(bmiCalc.toFixed(2));

    let bmiCat = '';
    if (bmiCalc < 18.5) bmiCat = 'Underweight';
    else if (bmiCalc < 25) bmiCat = 'Normal Weight';
    else if (bmiCalc < 30) bmiCat = 'Overweight';
    else bmiCat = 'Obese';
    setBmiCategory(bmiCat);

    if (numAge <= 12) setStatusAge('You are a minor. Take care of your health while you have plenty of time!');
    else if (numAge <= 19) setStatusAge('You are a teenager. Stay active and maintain a healthy lifestyle!');
    else if (numAge <= 59) setStatusAge('You are an adult. It’s important to prioritize your health now.');
    else setStatusAge('You are a senior citizen. Take extra care of your health and well-being!');

    // Start loading
    setLoading(true);
    setSeconds(3); // seconds to countdown
    setShowProfile(false);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Save data
          setSavedName(name);
          setSavedAge(age);
          setSavedHeight(height);
          setSavedWeight(weight);
          setSavedSleepHours(sleepHours);
          setSavedWaterIntake(waterIntake);
          setDate(new Date().toLocaleDateString());
          setTime(new Date().toLocaleTimeString());

          // Reset input fields
          setName('');
          setAge('');
          setHeight('');
          setWeight('');
          setSleepHours('');
          setExercise(false);
          setHealthyMeal(false);
          setWaterIntake("");
          setProfilePic(null);

          setShowProfile(true);
          setLoading(false);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const clearAll = () => {
    setName('');
    setAge('');
    setHeight('');
    setWeight('');
    setSleepHours('');
    setWaterIntake('');
    setExercise(false);
    setHealthyMeal(false);
    setBmiResult('');
    setBmiCategory('');
    setShowProfile(false);
    setProfilePic(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}
        ref={scrollViewRef}
        contentContainerStyle={{ alignItems: 'center'}}
        keyboardShouldPersistTaps="handled"
      >
        {/* Dark Mode Toggle */}
        <View style={[styles.darkModeContainer, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}>
          <Text style={[styles.textDarkMode, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
            Dark Mode / Light Mode: {toggleDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch value={toggleDarkMode} onValueChange={setToggleDarkMode} />
        </View>

        {/* Input Form */}
        <View style={[styles.inputForm, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../../../Images/Kurt.jpg')}
            style={styles.imageProfile}
          />

          <View style={[styles.photoButtons, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}>
          <Pressable
              onPress={pickImage}
              style={({ pressed }) => [styles.buttonImagePick, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}
            >
              <Text style={[styles.textPickImage, { color: toggleDarkMode ? '#e0e0e0ff' : '#212121' }]}>
                Select from gallery
              </Text>
            </Pressable>
            <Pressable
              onPress={takePhoto}
              style={({ pressed }) => [styles.buttonImageTake, { backgroundColor:  toggleDarkMode ? '#121212' : '#F5F5F5' }]}
            >
              <Text style={[styles.textTakeImage, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Take Photo</Text>
            </Pressable>
          </View>
          {profilePic && (
            <Pressable
              onPress={() => Alert.alert("Photo saved!", "You can now proceed.")}
              style={{
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 20,
                width: 150,
                alignItems: "center",
                backgroundColor: toggleDarkMode ? "#121212" : "#F5F5F5"
              }}
            >
              <Text style={{ color: toggleDarkMode ? "#E0E0E0" : "#212121", fontWeight: "bold" }}>
                Submit Photo
              </Text>
            </Pressable>
          )}

          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Type your name"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Type your age"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Type your height (cm)"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Type your weight (kg)"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Water intake (L)"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={waterIntake}
            onChangeText={setWaterIntake}
          />
          <TextInput
            style={[styles.input, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}
            placeholder="Sleep hours"
            placeholderTextColor={toggleDarkMode ? '#E0E0E0' : '#212121'}
            value={sleepHours}
            onChangeText={setSleepHours}
          />

          {/* Exercise / Healthy Meal */}
          <View style={styles.containerSwitchExercise}>
            <Text style={[styles.textSwitchExercise, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
              Did you exercise? {exercise ? 'YES' : 'NO'}
            </Text>
            <Switch value={exercise} onValueChange={setExercise} />
          </View>
            
            <View style = {[styles.containerSwitchMeal]}> 
            <Text style={[styles.textSwitchMeal, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
              Did you eat healthy meal? {healthyMeal ? 'YES' : 'NO'}
            </Text>
            <Switch value={healthyMeal} onValueChange={setHealthyMeal} />
            </View>
          

          {/* Buttons */}
          <View style={styles.submitButtonsContainer}>
            <Pressable
              onPress={checkHealth}
              style={({ pressed }) => [styles.buttonHealth, {  backgroundColor:  toggleDarkMode ? '#121212' : '#F5F5F5' }]}
            >
              <Text style={[styles.textHealthButton, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
                Check Health
              </Text>
            </Pressable>

            <Pressable
              onPress={clearAll}
              style={({ pressed }) => [styles.buttonClear, {  backgroundColor:  toggleDarkMode ? '#121212' : '#F5F5F5' }]}
            >
              <Text style={[styles.textClearButton, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
                Clear All
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Loading */}
        {loading && (
          <View style={[styles.loadingView, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}>
            <ActivityIndicator size="large" color="#0ef471ff" />
            <Text style={[styles.textLoading, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
              Loading your profile... {seconds}s
            </Text>
          </View>
        )}

        {/* Profile Display */}
        {!loading && showProfile && (
          <View style={[styles.healthProfileView, { backgroundColor: toggleDarkMode ? '#121212' : '#F5F5F5' }]}>
            <Image style={styles.imageOutput} source={profilePic ? { uri: profilePic } : require('../../../Images/Kurt.jpg')} />
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Profile Name: {saveName}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Age: {saveAge}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>{statusAge}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Height: {saveHeight}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Weight: {saveWeight}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>
              BMI Result: {bmiResult} - {bmiCategory}
            </Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Sleep Hours: {saveSleepHours}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Water Intake: {saveWaterIntake}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Exercise Today? {exercise ? '✅' : '❌'}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Did you eat healthy? {healthyMeal ? '✅' : '❌'}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Date: {date}</Text>
            <Text style={[styles.textOutput, { color: toggleDarkMode ? '#E0E0E0' : '#212121' }]}>Time: {time}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    

  },

  darkModeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 40,
    right: 10
    


  },

  textDarkMode: {
    fontSize: 20,
    textAlign: 'center',
    left: 10
   


  },

  inputForm: {
    borderWidth: 3,
    width: 310,
    minHeight: 700,
    borderRadius: 20,
    alignItems: 'center'

  },

  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 30

  },

  photoButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  buttonImagePick: {
    borderWidth: 1,
    height: 45,
    width: 135,
    borderRadius: 20,
    right: 10
    

  },

  textPickImage: {
    fontSize: 16,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center'

  },

  buttonImageTake: {
    borderWidth: 1,
    height: 45,
    width: 135,
    borderRadius: 20,
    left: 10

  },

  textTakeImage: {
    fontSize: 16,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    
  

  },

  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'

  },

  containerSwitchExercise: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },

  textSwitchExercise: {
    fontSize: 16,
    fontWeight: 'bold',
    

  },

  containerSwitchMeal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 15,
    
    

  },

  textSwitchMeal: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    left: 5,
    

  },

  submitButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  

  },

  buttonHealth: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    right: 10
  

  },

  textHealthButton: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5
    

  },

  buttonClear: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    left: 10

  },

  textClearButton: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,

  },

  loadingView: {
    marginTop: 20,
    alignItems: 'center'

  },

  textLoading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  healthProfileView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 20,
    width: 300,
    minHeight: 610

  },

  imageOutput: {
    marginTop: 20,
    width: 150,
    height: 100,
    borderWidth: 3,
    borderRadius: 20,
    alignItems: 'center'

  },

  textOutput: {
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize'

  },








})
