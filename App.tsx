import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useState } from "react";

// SAFE AREA PROVIDER (required!)
import { SafeAreaProvider } from "react-native-safe-area-context";
import ArraysTopic2 from "./Roadmap Before Flatlist/Arrays/Level 2/CallingArray";
//import NestedObjectRemovingQuiz from "./Roadmap Before Flatlist/Objects/Lesson 5 -  Nested Object/Tasks/Task2";
//import RemovingNestedObject from "./Objects/Lesson 5 -  Nested Object/Removing/RemovingObject";
//import ObjectLesson4 from "./Core Components/Objects/Lesson 4/removingObjects";
//import NestedAddingObjectQuiz1 from "./Core Components/Objects/Lesson 5 -  Nested Object/Tasks/task1";
//import NestedObjectsUpdate from "./Core Components/Objects/Lesson 5 -  Nested Object/NestedUpdateBascics";
//import ObjectsNestedLesson5 from "./Core Components/Objects/Lesson 5 -  Nested Object/Intro";
//import ObjectsLesson4Quiz1 from "./Core Components/Objects/Lesson 4/Quizzes/Quiz1";
//import ObjectsAdding from "./Core Components/Objects/Lesson 4/AddingObjects";
//import ObjectsLesson3 from "./Core Components/Objects/Lesson 3/UpdatingObjectProperties";
//import ObjectsLesson2BracketNotation from "./Core Components/Objects/Lesson2/Bracket Notation";
//import ObjectsLevel1 from "./Core Components/Objects/Level 1/level1";
//import KurtLoginScreen from "./Core Components/Projects/Login/Login";
//import ActivityIndicatorTask12 from "./Core Components/ActivityIndicator/Task/Task12";
//import ActivityIndicatorTask6 from "./Core Components/ActivityIndicator/Task/Task6";
//import ActivityIndicatorTask5 from "./Core Components/ActivityIndicator/Task/Task5";
//import KurtLoginScreen from "./Core Components/ActivityIndicator/Task/Task10";
//import ArraysBasics from "./Core Components/Arrays/level1";
//import KeyboardAvoidingViewLesson3 from "./Core Components/KeyboardAvoidingView/withModal";
//import KeyboardAvoidingViewLesson2 from "./Core Components/KeyboardAvoidingView/Lesson2";
//import KeyboardAvoidingViewAndroid1 from "./Core Components/KeyboardAvoidingView/Lesson1";
//import StatusBarLesson2 from "./Core Components/StatusBar/lesson2";
//import StatusBarLesson1 from "./Core Components/StatusBar/Basics";
//import SafeAreaViewTask1 from "../Final/Core Components/SafeAreaView/Tasks/Task1";

// Your SafeAreaView practice screen
//import SafeAreaviewBasics from "./Core Components/SafeAreaView/Basics";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    NavigationBar.setBehaviorAsync("overlay-swipe");
    NavigationBar.setVisibilityAsync("hidden");

    // change background depending on theme
    NavigationBar.setBackgroundColorAsync(isDark ? "#000000" : "#FFFFFF");
  }, [isDark]);

  return (
    <SafeAreaProvider>
      <StatusBar hidden /> 
      <ArraysTopic2/>
    </SafeAreaProvider>
  );
}
