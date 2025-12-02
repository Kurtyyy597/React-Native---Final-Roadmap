import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  Image,
  Modal,
  Alert,
  Pressable,
  Switch,
  ActivityIndicator,
  StyleSheet,
} from "react-native";


const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  accentText: "#000000",
  border: "#2E2E2E",
  divider: "#383838",
  accent: "#90CAF9",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  cardShadow: "#00000040",
  placeholderText: "#757575",
  link: "#64B5F6",
  disabled: "#424242",
};

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#555555",
  accentText: "#FFFFFF",
  border: "#CCCCCC",
  divider: "#E0E0E0",
  accent: "#2196F3",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  cardShadow: "#00000020",
  placeholderText: "#9E9E9E",
  link: "#1565C0",
  disabled: "#BDBDBD",
};

// ================= MAIN APP =================
export default function ActivityIndicatorTask11() {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);

  const [userImage, setUserImage] = useState<any>(null);
  const [loginDate, setLoginDate] = useState("");
  const [loginTime, setLoginTime] = useState("");

  const theme = toggleDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background}]}>
      {isLoggedin ? (
        <ProfileScreen
          theme={theme}
          onLogout={() => setIsLoggedIn(false)} // ✅ Correct binding
          toggleDarkMode={toggleDarkMode}
          setToggleDarkMode={setToggleDarkMode}
          image={userImage}
          dateLogin={loginDate}
          timeLogin={loginTime}
        />
      ) : (
        <LoginScreen
          theme={theme}
          onLoginSuccess={() => setIsLoggedIn(true)}
          toggleDarkMode={toggleDarkMode}
          setToggleDarkMode={setToggleDarkMode}
          setUserImage={setUserImage}
          setLoginDate={setLoginDate}
          setLoginTime={setLoginTime}
        />
      )}
    </View>
  );
}

// ================= LOGIN SCREEN =================
type LoginScreenProps = {
  theme: any;
  onLoginSuccess: () => void;
  toggleDarkMode: boolean;
  setToggleDarkMode: (value: boolean) => void;
  setUserImage: (img: any) => void;
  setLoginDate: (date: string) => void;
  setLoginTime: (time: string) => void;
};
function LoginScreen({
  theme,
  onLoginSuccess,
  toggleDarkMode,
  setToggleDarkMode,
  setUserImage,
  setLoginDate,
  setLoginTime,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("⚠️ Please fill in all fields!");
      setLoginAttempts((prev) => prev + 1);
      return;
    }

    if (!email.includes("@")) {
      setErrorEmailMessage("⚠️ Please use (@)");
      setLoginAttempts((prev) => prev + 1);
      return;
    }

    if (password.length < 4) {
      setErrorPasswordMessage("Weak ❌");
      setLoginAttempts((prev) => prev + 1);
    } else if (password.length < 8) {
      setErrorPasswordMessage("Moderate ⚠️");
    } else {
      setErrorPasswordMessage("Strong ✅");
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert("Password must include at least one uppercase letter.");
      setLoginAttempts((prev) => prev + 1);
      return;
    }

    if (password.includes(" ")) {
      Alert.alert("⚠️ Password cannot contain spaces.");
      setLoginAttempts((prev) => prev + 1);
      return;
    }

    if (loginAttempts >= 5) {
      Alert.alert(
        "Too Many Attempts! 🚫",
        "You have reached the maximum number of login attempts.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Try Again",
            style: "destructive",
            onPress: () => {
              setEmail("");
              setPassword("");
              setErrorEmailMessage("");
              setErrorPasswordMessage("");
              setSeconds(0);
              setLoginAttempts(0);
              setShowPassword(false);
            },
          },
        ]
      );
      return;
    }

    // ✅ Start loading
    setLoading(true);
    setSeconds(5);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoading(false);
          setUserImage(require("../../../Images/Kurt.jpg"));
          setLoginDate(new Date().toLocaleDateString());
          setLoginTime(new Date().toLocaleTimeString());
          onLoginSuccess();
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const clearAll = () => {
    Alert.alert("Clear?", "This will reset your full input forms", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setEmail("");
          setPassword("");
          setErrorEmailMessage("");
          setErrorPasswordMessage("");
          setLoginAttempts(0);
          setShowPassword(false);
          setSeconds(0);
          setModalVisible(false);
        },
      },
    ]);
  };

  return (
    <View style={[styles.loginContainer, { backgroundColor: theme.background }]}>
      <Text style={[styles.textTitleLogin, { color: theme.textPrimary }]}>Login Screen</Text>

      {/* 🌗 Dark Mode Switch */}
      <View style={[styles.darkModeContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.textDarkMode, { color: theme.textPrimary }]}>
          Theme: {toggleDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={toggleDarkMode}
          onValueChange={setToggleDarkMode}
          thumbColor={toggleDarkMode ? theme.success : theme.ripple}
          trackColor={{ true: theme.accent, false: theme.divider }}
        />
      </View>

      {/* 💬 Email Input */}
      <View style = {[styles.inputForms, {backgroundColor: theme.background}]}> 
      <TextInput
        style={[styles.inputEmail, { borderColor: theme.border, color: theme.textPrimary }]}
        placeholder="type your email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.textSecondary}
        cursorColor={theme.accent}
      />
      {errorEmailMessage ? (
        <Text style={[styles.textEmailError, { color: theme.textPrimary }]}>
          {errorEmailMessage}
        </Text>
      ) : (
        <Text style={[styles.textEmailErrorGood, { color: theme.textPrimary }]}>Good✅</Text>
      )}

      {/* 🔒 Password Input */}
      <View style={[styles.passwordContainer, { backgroundColor: theme.background }]}>
        <TextInput
          style={[styles.inputPassword, { borderColor: theme.border, color: theme.textPrimary }]}
          placeholder="type your password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.textSecondary}
          cursorColor={theme.accent}
          secureTextEntry={!showPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={[styles.showPasswordButton, { backgroundColor: theme.inputBackground }]}
        >
          <Text style={[styles.textShowPassword, { color: theme.textPrimary }]}>
            {showPassword ? "🙈" : "👁️"}
          </Text>
        </Pressable>
      </View>

      {errorPasswordMessage ? (
        <Text style={[styles.textErrorPassword, { color: theme.textPrimary }]}>
          {errorPasswordMessage}
        </Text>
      ) : (
        <Text style={[styles.textErrorPasswordGood, { color: theme.textPrimary }]}>Good✅</Text>
      )}

      {/* 🔘 Login Button */}
      <View style = {[styles.loginandClearContainer, {backgroundColor: theme.background}]}>  
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        android_ripple={{ color: theme.ripple }}
        style={[styles.loginButton, { backgroundColor: theme.success, borderColor: theme.border }]}
      >
        <Text style={[styles.textLogin, { color: theme.textPrimary }]}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </Pressable>

      {/* 🧹 Clear Modal */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[styles.buttonModalClear, { backgroundColor: theme.accent }]}
      >
        <Text style={[styles.textModalClear, { color: theme.accentText }]}>Clear All Fields</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalText, { color: theme.textPrimary }]}>
              Are you sure you want to clear?
            </Text>
            <Button title="cancel" onPress={() => setModalVisible(false)} color={theme.accent}/>
            <Button title="Confirm Clear" onPress={clearAll} color={theme.error} />
          </View>
        </View>
      </Modal>
      </View>
    </View>

      {loading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.accent} />
          <Text style={{ color: theme.textPrimary }}>Verifying... {seconds}s</Text>
        </View>
      )}
    </View>
  );
}

type ProfileScreenProps = {
  theme: any;
  onLogout: () => void;
  toggleDarkMode: boolean;
  setToggleDarkMode: (value: boolean) => void;
  image: any;
  dateLogin: string;
  timeLogin: string;
};
// ================= PROFILE SCREEN =================
function ProfileScreen({
  theme,
  onLogout,
  toggleDarkMode,
  setToggleDarkMode,
  image,
  dateLogin,
  timeLogin,
}: ProfileScreenProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning";
    else if (hour < 18) return "🌤️ Good Afternoon";
    else if (hour < 21) return "🌇 Good Evening";
    else return "🌙 Good Night";
  }

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.textProfileHeader, { color: theme.textPrimary }]}>Profile Screen 👤</Text>
      
      <View style={[styles.darkModeContainerProfile, { backgroundColor: theme.background }]}>
      
        <Text style={[styles.textDarkModeProfile, { color: theme.textPrimary }]}>
          Theme: {toggleDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={toggleDarkMode}
          onValueChange={setToggleDarkMode}
          thumbColor={toggleDarkMode ? theme.success : theme.ripple}
          trackColor={{ true: theme.accent, false: theme.divider }}
        />
      </View>

      

      <Image style={[styles.imageProfile]} source={image} />
      <Text style={[styles.textGreeting, { color: theme.textPrimary }]}>
        {getGreeting()}, Kurt!
      </Text>
      <Text style={[styles.textDate, { color: theme.textSecondary }]}>
        Logged in at {timeLogin} — {dateLogin}
      </Text>

      {/* 🚪 Logout Button */}
      <Pressable
        onPress={() => setModalVisible(true)}
        android_ripple={{ color: theme.ripple }}
        style={[styles.logoutButtonModal, { backgroundColor: theme.error, borderColor: theme.border }]}
      >
        <Text style={[styles.textLogoutModal, { color: theme.accentText }]}>Logout</Text>
      </Pressable>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlayProfile}>
          <View style={[styles.modalCardProfile, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTextProfile, { color: theme.textPrimary }]}>
              Are you sure you want to logout?
            </Text>
            <View style={{ flexDirection: "row", marginTop: 15, gap: 10 }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color={theme.accent} />
              <Button
                title="Logout"
                onPress={() => {
                  setModalVisible(false);
                  onLogout();
                }}
                color={theme.error}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ========== COMMON CONTAINERS ==========
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ========== LOGIN SCREEN ==========
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  textTitleLogin: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    backgroundColor: "#64B5F6",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
  },

  // Theme Switch Row
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },

  textDarkMode: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Input Box Section
  inputForms: {
    width: '90%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },

  inputEmail: {
    width: '90%',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
  },

  textEmailError: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E53935',
    marginBottom: 8,
  },

  textEmailErrorGood: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },

  // Password Input with Toggle
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  inputPassword: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },

  showPasswordButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  textShowPassword: {
    fontSize: 18,
  },

  textErrorPassword: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E53935',
    marginTop: 5,
  },

  textErrorPasswordGood: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 5,
  },

  // Login and Clear Buttons
  loginandClearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 25,
  },

  loginButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 12,
    elevation: 3,
  },

  textLogin: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonModalClear: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingVertical: 12,
    elevation: 3,
  },

  textModalClear: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },

  modalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },

  // ========== PROFILE SCREEN ==========
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  textProfileHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#64B5F6",
    color: "#fff",
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 30,
    width: 300,
  },

  darkModeContainerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 25,
  },

  textDarkModeProfile: {
    fontSize: 18,
    fontWeight: '600',
  },

  imageProfile: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
  },

  textGreeting: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },

  textDate: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 25,
  },

  logoutButtonModal: {
    backgroundColor: '#E53935',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 3,
  },

  textLogoutModal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },

  // Profile Logout Modal
  modalOverlayProfile: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCardProfile: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },

  modalTextProfile: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
});

