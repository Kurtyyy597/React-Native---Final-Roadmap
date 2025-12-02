// ControlsCardTask.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Switch,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// ---- Color themes (from the palette we discussed) ----
const LIGHT_THEME = {
  bg: '#F5F5F5',
  card: '#0ff1e6ff',
  text: '#212121',
  mutedText: '#616161',
  border: '#DDDDDD',
  buttonBorder: '#CFCFCF',
  accentPrimary: '#0EA5E9',
  accentPrimaryPressed: '#0284C7',
  accentPrimaryText: '#FFFFFF',
  danger: '#EF4444',
  dangerPressed: '#DC2626',
  overlay: 'rgba(0,0,0,0.06)',
  spinner: '#0EA5E9',
  ripple: 'rgba(0,0,0,0.08)',
};

const DARK_THEME = {
  bg: '#121212',
  card: '#1E1E1E',
  text: '#E0E0E0',
  mutedText: '#BDBDBD',
  border: '#333333',
  buttonBorder: '#4A4A4A',
  accentPrimary: '#38BDF8',
  accentPrimaryPressed: '#0EA5E9',
  // You can switch this to '#FFFFFF' if you prefer white text on blue
  accentPrimaryText: '#0B1220',
  danger: '#F87171',
  dangerPressed: '#EF4444',
  overlay: 'rgba(255,255,255,0.08)',
  spinner: '#38BDF8',
  ripple: 'rgba(255,255,255,0.12)',
};

export default function ControlsCardTask() {
  // ---- State ----
  const [dark, setDark] = useState(false);     // theme
  const [liked, setLiked] = useState(false);   // like toggle
  const [loading, setLoading] = useState(false); // save spinner

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  // ---- Actions ----
  const onSave = () => {
    if (loading) 
    return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Saved!', 'Your settings were saved.');
    }, 2000); // 2 seconds
  };

  const onReset = () => {
    Alert.alert(
      'Reset?',
      'This will clear the like and set light mode.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setLiked(false);
            setDark(false);
            setLoading(false);
          },
        },
      ]
    );
  };

  // ---- UI ----
  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Controls Card — Basics</Text>

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Theme row */}
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Theme: {dark ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={dark ? '#E5E7EB' : '#FFFFFF'}
            accessibilityLabel="Toggle theme"
          />
        </View>

        {/* Image */}
        <Image
          source={{ uri: 'https://picsum.photos/300/200' }}
          style={[styles.image, { borderColor: theme.border }]}
          resizeMode="cover"
        />

        {/* Caption */}
        <Text style={[styles.caption, { color: theme.text }]}>
          {liked ? 'You like this photo ❤️' : 'Do you like this photo?'}
        </Text>

        {/* Buttons */}
        <View style={styles.actions}>
          {/* Like */}
          <Pressable
            onPress={() => setLiked((v) => !v)}
            style={({ pressed }) => [
              styles.btn,
              { borderColor: theme.buttonBorder, backgroundColor: 'transparent' },
              pressed && styles.pressed,
            ]}
            android_ripple={{ color: theme.ripple }}
            accessibilityRole="button"
            accessibilityLabel="Like photo"
          >
            <Text style={[styles.btnText, { color: theme.text }]}>
              {liked ? 'Unlike' : 'Like'}
            </Text>
          </Pressable>

          {/* Save (shows spinner inside while loading) */}
          <Pressable
            onPress={onSave}
            disabled={loading}
            style={({ pressed }) => [
              styles.btn,
              {
                borderColor: theme.accentPrimary,
                backgroundColor: theme.accentPrimary,
                opacity: loading ? 0.7 : 1,
              },
              pressed && !loading && styles.pressed,
            ]}
            android_ripple={{ color: theme.ripple }}
            accessibilityRole="button"
            accessibilityLabel="Save settings"
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.accentPrimaryText} />
            ) : (
              <Text style={[styles.btnText, { color: theme.accentPrimaryText }]}>Save</Text>
            )}
          </Pressable>

          {/* Reset (confirmation) */}
          <Pressable
            onPress={onReset}
            style={({ pressed }) => [
              styles.btn,
              { borderColor: theme.danger, backgroundColor: 'transparent' },
              pressed && styles.pressed,
            ]}
            android_ripple={{ color: theme.ripple }}
            accessibilityRole="button"
            accessibilityLabel="Reset card"
          >
            <Text style={[styles.btnText, { color: theme.danger }]}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ---- Styles (sizes/layout; colors come from theme above) ----
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    width: 320,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: { fontSize: 16, fontWeight: '600' },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  caption: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  actions: { flexDirection: 'row', width: '100%', marginTop: 4 },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  btnText: { fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.85 },
});
