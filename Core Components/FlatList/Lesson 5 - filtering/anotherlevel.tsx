import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Section = "A" | "B" | "C";

type Student = {
  id: number;
  name: string;
  age: number;
  section: Section;
  isActive: boolean;
};

type Filters = {
  isActive: boolean | null;
  section: Section | null;
  minAge: number | null;
};

const DATA: Student[] = [
  { id: 1, name: "Juan", age: 20, section: "A", isActive: true },
  { id: 2, name: "Maria", age: 18, section: "B", isActive: false },
  { id: 3, name: "Carlos", age: 22, section: "A", isActive: true },
];

export default function FlatListFilterCombined() {
  const [allStudents, setAllStudents] = useState<Student[]>(DATA);
  const [students, setStudents] = useState<Student[]>(DATA);
  const [filters, setFilters] = useState<Filters>({
    isActive: null,
    section: null,
    minAge: null,
  });

  const applyFilters = (nextFilters: Filters) => {
    let result = allStudents;

    if (nextFilters.isActive !== null) {
      result = result.filter(s => s.isActive === nextFilters.isActive);
    }

    if (nextFilters.section) {
      result = result.filter(s => s.section === nextFilters.section);
    }

    if (nextFilters.minAge !== null) {
      const minAge = nextFilters.minAge
      result = result.filter(s => s.age === minAge)
    }

    setStudents(result);
  };

  const updateFilters = (partial: Partial<Filters>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    applyFilters(next);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.section})</Text>
        )}
        ListEmptyComponent={<Text>No match</Text>}
      />

      <Pressable onPress={() => updateFilters({ isActive: true })}>
        <Text>Active</Text>
      </Pressable>

      <Pressable onPress={() => updateFilters({ section: "A" })}>
        <Text>Section A</Text>
      </Pressable>

      <Pressable onPress={() => updateFilters({ minAge: 20 })}>
        <Text>Age 20+</Text>
      </Pressable>

      <Pressable onPress={() => updateFilters({
        isActive: null,
        section: null,
        minAge: null,
      })}>
        <Text>Reset</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
