import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet, TextInput } from 'react-native';

export default function SwitchTask2() {
  const [goal, setGoal] = useState<string>('');
  const [spent, setSpent] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>('#f4f7f8');

  const calculateButton = () => {
    if (!goal.trim() || !spent.trim()) {
      Alert.alert('Please enter your goal and your spending.');
      return;
    }

    const goalNum = parseFloat(goal);
    const spentNum = parseFloat(spent);

    if (isNaN(goalNum) || isNaN(spentNum) || goalNum <= 0 || spentNum < 0) {
      Alert.alert('Please enter valid positive numbers.');
      return;
    }

    // You had (goalNum / spentNum) * 100, but that’s inverted.
    const percentage = (spentNum / goalNum) * 100;
    setProgress(percentage);
    setShowResult(true);

    if (percentage < 50) {
      setStatus("You're doing great! Keep saving 💚");
      setBgColor('#b4f7c4');
      setImage(require('../../../Images/happy.jpg'));
    } else if (percentage < 100) {
      setStatus('Be careful! You’re spending a lot! ⚠️');
      setBgColor('#ffdb8a');
      setImage(require('../../../Images/sad.jpg'));
    } else {
      setStatus("You've exceeded your budget! 🔴");
      setBgColor('#ff9d9d');
      setImage(require('../../../Images/angry.jpg'));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.textTitle}>Budget Tracker</Text>

      <View style={styles.trackerForm}>
        <TextInput
          style={styles.input}
          placeholder="Type your budget (₱)"
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
        />
        <TextInput
          style={styles.input}
          placeholder="How much did you spend? (₱)"
          keyboardType="numeric"
          value={spent}
          onChangeText={setSpent}
        />

        <Pressable
          onPress={calculateButton}
          style={({ pressed }) => [
            styles.buttonCalculate,
            { backgroundColor: pressed ? '#3ee70b' : '#14dbf6' },
          ]}
        >
          <Text style={styles.textButton}>Submit Your Budget</Text>
        </Pressable>
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          {image && <Image style={styles.imageOutput} source={image} />}
          <Text style={styles.textOutput}>{status}</Text>
          <Text style={styles.textProgress}>Progress: {progress.toFixed(1)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },

  textTitle: {
    fontSize: 32,
    color: '#0b0b0b',
    fontWeight: 'bold',
    textShadowColor: '#ccc',
    textShadowRadius: 4,
    marginBottom: 25,
  },

  trackerForm: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#ffffffaa',
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#14dbf6',
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },

  buttonCalculate: {
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    paddingVertical: 12,
  },

  textButton: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 15,
  },

  imageOutput: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  textOutput: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },

  textProgress: {
    fontSize: 16,
    textAlign: 'center',
  },
});
