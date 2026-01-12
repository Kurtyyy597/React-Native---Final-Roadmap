/**
================================================================
🔥 MAP() — FULL SYNTAX CHEATSHEET (React Native + TypeScript)
================================================================

This file contains ALL the important map() syntax patterns:
- numbers
- strings
- objects
- JSX
- formatting
- transformations
- real-world usage

================================================================
🏁 0. BASIC MAP SYNTAX
----------------------------------------------------------------
const result = array.map((item, index) => {
  return something;
});

OR short form:

const result = array.map(item => something);

================================================================
🟦 1. MAP ON NUMBERS
----------------------------------------------------------------

// Double each number
[1, 2, 3].map(n => n * 2);
// → [2, 4, 6]

// Add 5 to each number
[10, 20, 30].map(n => n + 5);
// → [15, 25, 35]

// Subtract values
[5, 10, 15].map(n => n - 2);
// → [3, 8, 13]

// Convert numbers to strings
[1, 2, 3].map(n => `Number: ${n}`);
// → ["Number: 1", "Number: 2", "Number: 3"]

// Use index in calculation
[1, 2, 3].map((n, i) => n + i);
// → [1, 3, 5]

================================================================
🟪 2. MAP ON STRINGS
----------------------------------------------------------------

// Make uppercase
["apple", "banana"].map(f => f.toUpperCase());
// → ["APPLE", "BANANA"]

// Make lowercase
["HELLO", "WORLD"].map(s => s.toLowerCase());

// Add text before or after
["apple", "banana"].map(f => "Fruit: " + f);

// Add numbering using index
["apple", "banana"].map((f, i) => `${i + 1}. ${f}`);

// Convert string → object
["apple", "banana"].map((f, i) => ({
  id: i + 1,
  name: f,
}));

================================================================
🟥 3. MAP ON OBJECTS
----------------------------------------------------------------
const users = [
  { name: "Kurt", age: 20 },
  { name: "John", age: 25 },
];

// Extract names only
users.map(u => u.name);
// → ["Kurt", "John"]

// Format text from object
users.map(u => `${u.name} is ${u.age} years old`);

// Add new property to each object
users.map(u => ({
  ...u,
  isAdult: u.age >= 18,
}));

// Transform object shape
users.map((u, i) => ({
  id: i + 1,
  fullName: "Mr. " + u.name,
}));

================================================================
🟧 4. MAP TO JSX (React Native)
----------------------------------------------------------------

// Basic text list
{fruits.map((fruit, index) => (
  <Text key={index}>{fruit}</Text>
))}

// Map objects to styled cards
{users.map((user, index) => (
  <View key={index} style={styles.card}>
    <Text>{user.name}</Text>
    <Text>{user.age} years old</Text>
  </View>
))}

// Wrap siblings inside a View
{items.map((item, index) => (
  <View key={index}>
    <Text>{item.title}</Text>
    <Text>{item.desc}</Text>
  </View>
))}

================================================================
🟦 5. MAP → NEW ARRAY OF OBJECTS
----------------------------------------------------------------

// Add ID to all items
["apple", "banana"].map((name, index) => ({
  id: index + 1,
  name,
}));

// Add computed field
users.map(u => ({
  ...u,
  isSenior: u.age > 50,
}));

================================================================
🟩 6. MAP → CONDITIONAL VALUES
----------------------------------------------------------------

// Label fruits depending on starting letter
["Apple", "Banana", "Avocado"].map(f => {
  return f.startsWith("A") ? f + " (A fruit)" : f;
});

// Replace values based on condition
[10, 20, 30].map(n => (n > 15 ? "High" : "Low"));

================================================================
🟨 7. MAP WITH INDEX FORMATTING
----------------------------------------------------------------

// Number items
["A", "B", "C"].map((item, index) => `${index + 1}. ${item}`);

// Show index in UI
{items.map((item, index) => (
  <Text key={index}>{index}: {item}</Text>
))}

================================================================
🟣 8. MAP + FILTER (Common Combo)
----------------------------------------------------------------

// Remove empty values then uppercase
["apple", "", "mango"]
  .filter(f => f !== "")
  .map(f => f.toUpperCase());

================================================================
🟫 9. COMPLEX TRANSFORMATIONS
----------------------------------------------------------------

// Convert prices → with tax
[100, 200, 300].map(price => ({
  original: price,
  tax: price * 0.12,
  total: price * 1.12,
}));

// Convert users → greeting messages
users.map(u => `Hello ${u.name}, age ${u.age}`);

================================================================
🔥 10. IMPORTANT RULES (SUMMARY)
----------------------------------------------------------------
✔ map RETURNS a new array  
✔ DO NOT mutate original array  
✔ Always include key={index} for JSX  
✔ Wrap multiple elements with <View>  
✔ Use parentheses for multi-line JSX  
✔ map ONLY works on arrays  
✔ Keep map PURE (no setState inside map)  

================================================================
END OF FILE — MapSyntaxCheatsheet.tsx
================================================================
*/
