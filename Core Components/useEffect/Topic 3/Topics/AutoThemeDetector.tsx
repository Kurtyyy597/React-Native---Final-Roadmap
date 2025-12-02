import React, { useEffect, useState } from "react";
import { View, Text, Appearance, StyleSheet } from "react-native";

export default function TestTheme() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === "dark" ? "#000" : "#fff" }
    ]}>
      <Text style={{ color: theme === "dark" ? "#fff" : "#000", fontSize: 30 }}>
        Theme: {theme}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  }
});
