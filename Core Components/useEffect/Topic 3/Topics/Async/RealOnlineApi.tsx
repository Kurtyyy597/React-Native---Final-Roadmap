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

// 🌙 Dark Mode Colors
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
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default function FetchingApi() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] =useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkTheme: lightTheme;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        if (!response.ok) {
          throw new Error(`Were sorry failed to fetch`)
        }

        const data = await response.json();
        setUser(data);

      } catch (err) {
        setError(`❌Failed to fetch`)
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    
  }, []);

 return (
  <View style={[styles.container, { backgroundColor: theme.background }]}>

    {/* TOP TITLE */}
    <Text style={[styles.textTitle, { color: theme.textPrimary }]}>
      This is real API!
    </Text>

    {/* CENTER CONTENT */}
    <View style={styles.centerContainer}>
      {loading && (
        <>
          <ActivityIndicator size={"large"} color={"blue"} />
          <Text style={[styles.textLoading, { color: theme.textPrimary }]}>
            Fetching data...
          </Text>
        </>
      )}

      {!loading && user && (
        <View style={styles.outputView}>
          <Text style={[styles.textOutputTitle, { color: theme.textPrimary }]}>
            Congrats! You fetched the API ✔
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            Company: {user.company.name}
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            Name: {user.name}
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            Username: {user.username}
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            City: {user.address.city}
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            Phone: {user.phone}
          </Text>
          <Text style={[styles.textOutput, { color: theme.textPrimary }]}>
            Website: {user.website}
          </Text>
        </View>
      )}

      {!loading && error !== "" && (
        <Text style={[styles.textError, { color: theme.error }]}>
          {error}
        </Text>
      )}
    </View>

  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // keeps title on top
    alignItems: "center",
    paddingTop: 60 // spacing without marginTop
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center", // centers loading & user data
    alignItems: "center",
    width: "100%",
  },

  textTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },

  outputView: {
    alignItems: "center",
  },

  textOutputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  textOutput: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: "bold",
  },

  textLoading: {
    fontSize: 18,
    marginTop: 10,
  },

  textError: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
