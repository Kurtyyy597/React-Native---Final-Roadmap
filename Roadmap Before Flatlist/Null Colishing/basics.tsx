import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Student = {
  name: string;
  age?: number;
};

export default function NullishCoalescingBasics() {
  const [student, setStudent] = useState<Student | null>(null);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Pressable
        onPress={() => setStudent({ name: "Kurt", age: 0 })}
      >
        <Text>Add Student</Text>
      </Pressable>

      <Pressable onPress={() => setStudent(null)}>
        <Text>Remove Student</Text>
      </Pressable>

      <Text>
        Name: {student?.name ?? "No student"}
      </Text>

      <Text>
        Age: {student?.age ?? "Not provided"}
      </Text>
    </SafeAreaView>
  );
}
