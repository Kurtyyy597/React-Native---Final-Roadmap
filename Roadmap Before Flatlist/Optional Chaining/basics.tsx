import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Student = {
  name: string;
  isActive: boolean;
};

export default function OptionalChainingBasics() {
  const [student, setStudent] = useState<Student | null>(null);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Pressable
        onPress={() =>
          setStudent({ name: "Kurt", isActive: true })
        }
      >
        <Text>Add Student</Text>
      </Pressable>

      <Pressable onPress={() => setStudent(null)}>
        <Text>Remove Student</Text>
      </Pressable>

      <Text>
        Active Status {" "} 
        {student?.isActive ? "ACTIVE" : "NOT ACTIVE"}
      </Text>
    </SafeAreaView>
  );
}
