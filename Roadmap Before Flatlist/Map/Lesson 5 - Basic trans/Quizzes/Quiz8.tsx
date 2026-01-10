import React, {useState} from 'react';
import {View, Text, Switch, ActivityIndicator, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
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
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};

type Downloads = {
  id: number;
  file: string;
  downloading: boolean;
};

export default function MapQuiz8() {
  const [seconds, setSeconds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [downloads, setDownloads] = useState<Downloads[]>([
  { id: 1, file: "Video.mp4", downloading: false},
  { id: 2, file: "Music.mp3", downloading: false },
  { id: 3, file: "Document.pdf", downloading: false},
  ])

const toggleDownload = (id: number) => {
  setLoading(true);
  setSeconds(5);

  const interval = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        clearInterval(interval);

        setDownloads(prev =>
          prev.map(download =>
            download.id === id
              ? { ...download, downloading: !download.downloading }
              : download
          )
        );

        setLoading(false);   // FIXED

        return 0;
      }

      return prev - 1;
    });
  }, 1000);
};

  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.cardShadow}]}>
      {downloads.map(({id, file, downloading}) => (
        <View key={id} style = {[styles.card, {backgroundColor: theme.background}]}>
          <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> file: {file} </Text>
           <Pressable
            onPress={() =>toggleDownload(id)}
            onLongPress={() => alert("Long pressed")}
            delayLongPress={400}
            android_ripple={{ color: "#4818e5ff" }}
            hitSlop={10}
            accessibilityRole="button"
            style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: theme.accent }
            ]}>
              <Text style = {[styles.textButton, {color: theme.textPrimary}]}> Load </Text>
            </Pressable>
          {downloading && loading ? (
            <>
             <ActivityIndicator size={'large'} color={'blue'} animating={true}/>
             <Text style = {[styles.textLoading, {color: theme.accent}]}> Loading... </Text>
            </>
           
          ) : (
            <Text style = {[styles.textLoading, {color: theme.textPrimary}]}> Done </Text>
          )}
        </View>
      ))}
    </SafeAreaView> 
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  
  card: {
    width: "85%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0 ,height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: "center",

  },

  textOutput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"

  },

  button: {
    width: '30%',
    paddingVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 20
    


  },

  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"

  },

  textLoading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"

  }
})