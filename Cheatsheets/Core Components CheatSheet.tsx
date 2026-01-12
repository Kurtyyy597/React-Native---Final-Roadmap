/**
===============================================================
🔥 REACT NATIVE CORE COMPONENTS — FULL CHEATSHEET (TSX COMMENT)
===============================================================
Copy-paste this file anywhere.  
This is a full learning reference.  
It will NOT run code — everything is inside comments only.
===============================================================




===============================================================
1. 🧱 VIEW
---------------------------------------------------------------
- Main layout container (like <div> in web).
- Supports:
  ✔ Flexbox layout
  ✔ Borders & background
  ✔ Shadows
  ✔ Accessibility
  ✔ onLayout (dimensions)
---------------------------------------------------------------
Example:
<View
style={{
flex: 1,
backgroundColor: "#fff",
justifyContent: "center",
alignItems: "center",
padding: 16,
margin: 8,
borderRadius: 10,
borderWidth: 1,
borderColor: "#ccc",
elevation: 5, // Android shadow
shadowColor: "#000", // iOS shadow
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.3,
shadowRadius: 4,
}}
accessible={true}
accessibilityLabel="Main container view"
onLayout={(e) => console.log(e.nativeEvent.layout)}
>
<Text>View Component Example</Text>
</View>




===============================================================
2. 🧾 SCROLLVIEW
---------------------------------------------------------------
- Scroll container for content larger than the screen.
- Best for:
  ✔ Forms
  ✔ Static pages
  ✔ Small lists
---------------------------------------------------------------
Example:
      <ScrollView
      contentContainerStyle={{ padding: 20 }}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      decelerationRate="normal"
      nestedScrollEnabled={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      onScrollBeginDrag={() => console.log("Scrolling...")}>
        
      </ScrollView>




===============================================================
3. 🖋️ TEXT
---------------------------------------------------------------
- Displays text.
- Can be stylized, selectable, pressable, multi-line.
---------------------------------------------------------------
Example:
<Text
style={{
fontSize: 18,
color: "#222",
fontWeight: "bold",
textAlign: "center",
lineHeight: 24,
letterSpacing: 1,
}}
selectable={true}
numberOfLines={2}
ellipsizeMode="tail"
onPress={() => Alert.alert("Text Pressed!")}
>
Selectable and pressable text.
</Text>




===============================================================
4. 🖼️ IMAGE
---------------------------------------------------------------
- Shows images (local or network).
- resizeMode controls fit.
---------------------------------------------------------------
Example:
<Image
source={{ uri: "https://picsum.photos/200" }}
style={{
width: 150,
height: 150,
borderRadius: 12,
borderWidth: 2,
borderColor: "#aaa",
}}
resizeMode="cover"
defaultSource={require("./placeholder.png")}
fadeDuration={300}
onLoad={() => console.log("Loaded")}
onError={() => console.log("Error loading")}
accessible
accessibilityLabel="Sample image"
/>




===============================================================
5. 💡 SWITCH
---------------------------------------------------------------
- Toggle button (ON/OFF)
---------------------------------------------------------------
Example:
<Switch
value={enabled}
onValueChange={setEnabled}
thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
trackColor={{ false: "#767577", true: "#81b0ff" }}
ios_backgroundColor="#3e3e3e"
style={{ marginVertical: 10 }}
/>




===============================================================
6. ⏳ ACTIVITYINDICATOR
---------------------------------------------------------------
- Loading spinner.
---------------------------------------------------------------
Example:
<ActivityIndicator
size="large"
color="#6200ee"
animating={true}
hidesWhenStopped={true}
style={{ marginVertical: 10 }}
/>




===============================================================
7. 👆 PRESSABLE
---------------------------------------------------------------
- Most powerful touch component:
  ✔ Press styles
  ✔ Ripple (Android)
  ✔ Long press
---------------------------------------------------------------
Example:
      <Pressable
      onPress={() => selectStudent(item.id)}
      onLongPress={() => alert(`Long pressed: ${item.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.studentCard, {backgroundColor: theme.inputBackground},
      pressed && styles.selectedStudent,
      isSelected && styles.selectedCard]}>

      </Pressable>
      //Para sa card




      <Pressable
      onPress={() => selectStudent(item.id)}
      onLongPress={() => alert(`Long pressed: ${item.name}`)}
      delayLongPress={400}
      android_ripple={{ color: "#4818e5ff" }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
      styles.button, {backgroundColor: theme.inputBackground},
      pressed && {opacity: 0.1},]}>
        <Text style = {[styles.textButton, {color: theme.textPrimary}]}> </Text> 
      </Pressable>
      //Para sa button
          




===============================================================
8. 🖐️ TOUCHABLEOPACITY
---------------------------------------------------------------
- Fade animation when pressed.
---------------------------------------------------------------
Example:
<TouchableOpacity
onPress={() => console.log("Pressed")}
activeOpacity={0.6}
style={{
backgroundColor: "#ddd",
padding: 12,
borderRadius: 10,
}}
>
<Text>TouchableOpacity</Text>
</TouchableOpacity>




===============================================================
9. 🎨 STYLESHEET
---------------------------------------------------------------
- For reusable, optimized styles.
---------------------------------------------------------------
Example:
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
input: {
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 8,
paddingHorizontal: 10,
paddingVertical: 8,
marginVertical: 8,
},
text: {
fontSize: 18,
color: "#222",
},
});




===============================================================
10. 🔘 BUTTON
---------------------------------------------------------------
- Simple built-in button (limited styling).
---------------------------------------------------------------
<Button
title="Click Me"
color="#03A9F4"
onPress={() => Alert.alert("Pressed!")}
/>




===============================================================
11. 📝 TEXTINPUT
---------------------------------------------------------------
- Input field for forms.
- Real world features:
  ✔ password mode
  ✔ keyboard type
  ✔ show/hide password
  ✔ focus / blur events
---------------------------------------------------------------
Example:
<TextInput
style={{
borderWidth: 1,
padding: 10,
borderRadius: 8,
}}
placeholder="Type here..."
placeholderTextColor="#888"
value={text}
onChangeText={setText}
keyboardType="default"
autoCapitalize="none"
autoCorrect={true}
secureTextEntry={secure}
maxLength={40}
cursorColor="#6200ee"
selectionColor="#6200ee"
onFocus={() => console.log("Focus")}
onBlur={() => console.log("Blur")}
/>




===============================================================
12. 🪟 MODAL
---------------------------------------------------------------
- Displays overlay content (dialogs, forms).
---------------------------------------------------------------
<Modal
visible={visible}
animationType="slide"
transparent={true}
onRequestClose={() => setVisible(false)}
hardwareAccelerated={true}
statusBarTranslucent={true}
>
  <View style={modal.overlay}>
    <View style={modal.box}>
      <Text style={modal.title}>Confirm Action</Text>
      <Button title="Close" onPress={() => setVisible(false)} />
    </View>
  </View>
</Modal>




===============================================================
13. 🚨 ALERT
---------------------------------------------------------------
- Native OS dialog box.
---------------------------------------------------------------
Alert.alert(
  "Delete Item?",
  "Are you sure?",
  [
    { text: "Cancel", style: "cancel" },
    { text: "Yes", onPress: () => {} },
  ]
);




===============================================================
14. 🟦 STATUSBAR
---------------------------------------------------------------
- Controls device status bar (top).
---------------------------------------------------------------
<StatusBar
barStyle="light-content"
backgroundColor="#000"    // Android only
hidden={false}
translucent={false}
animated={true}
/>




===============================================================
15. 🎹 KEYBOARDDAVOIDINGVIEW
---------------------------------------------------------------
- Pushes screen up when keyboard appears.
---------------------------------------------------------------
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
keyboardVerticalOffset={80}
style={{ flex: 1 }}
>
  <ScrollView>
    <TextInput />
  </ScrollView>
</KeyboardAvoidingView>




===============================================================
16. 🌅 IMAGEBACKGROUND
---------------------------------------------------------------
<ImageBackground
source={require("./bg.jpg")}
style={{ width: "100%", height: 200, justifyContent: "center" }}
resizeMode="cover"
imageStyle={{ borderRadius: 20 }}
>
<Text style={{ color: "#fff" }}>Hello inside background</Text>
</ImageBackground>




===============================================================
17. 🔘 TOUCHABLEHIGHLIGHT (OPTIONAL)
---------------------------------------------------------------
<TouchableHighlight
underlayColor="#ddd"
activeOpacity={0.7}
onPress={() => console.log("Pressed")}
style={{ padding: 15, backgroundColor: "#eee" }}
>
<Text>Highlight Row</Text>
</TouchableHighlight>




===============================================================
18. 👇 TOUCHABLEWITHOUTFEEDBACK
---------------------------------------------------------------
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1 }}>
    <TextInput placeholder="Tap outside to dismiss keyboard" />
  </View>
</TouchableWithoutFeedback>




===============================================================
19. 🔄 REFRESHCONTROL (Pull-to-refresh)
---------------------------------------------------------------
<ScrollView
refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
    colors={["#2196F3"]}
    tintColor="#2196F3"
  />
}
/>
===============================================================




===============================================================
20. 📚 SECTIONLIST (Optional)
---------------------------------------------------------------
<SectionList
sections={[
  { title: "Fruits", data: ["Apple", "Mango"] },
  { title: "Vegetables", data: ["Carrot", "Cabbage"] },
]}
renderItem={({ item }) => <Text style={{ padding: 10 }}>{item}</Text>}
renderSectionHeader={({ section }) => (
  <Text style={{ fontWeight: "bold", padding: 10 }}>{section.title}</Text>
)}
keyExtractor={(item, index) => index}
/>
===============================================================




===============================================================
END OF CORE COMPONENTS CHEATSHEET
===============================================================
*/
