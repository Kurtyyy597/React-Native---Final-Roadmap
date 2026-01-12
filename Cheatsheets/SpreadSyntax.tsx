/**
================================================================
🔥 SPREAD OPERATOR — FULL CHEATSHEET (React Native + TypeScript)
================================================================

File name: SpreadOperatorCheatsheet.tsx
This file teaches ALL spread operator patterns you need before
FlatList, filter, map, and state updates.

================================================================
🏁 0. WHAT IS THE SPREAD OPERATOR?
----------------------------------------------------------------
The spread operator "..." EXPANDS arrays or objects into pieces.

Example:
const arr = [1, 2, 3];
const copy = [...arr];  
// copy becomes [1, 2, 3]

================================================================
🟦 1. COPYING ARRAYS (NON-MUTATING)
----------------------------------------------------------------
// ❌ WRONG: mutates original
const a = [1, 2];
a.push(3);

// ✔️ RIGHT: new array
const b = [1, 2];
const c = [...b, 3];
// b stays unchanged

================================================================
🟩 2. ADDING ITEMS TO ARRAYS (END)
----------------------------------------------------------------
const numbers = [1, 2, 3];

// Add 4 at the end
const updated = [...numbers, 4];
// → [1, 2, 3, 4]

================================================================
🟧 3. ADDING ITEMS TO ARRAYS (START)
----------------------------------------------------------------
const updated = [0, ...numbers];
// → [0, 1, 2, 3]

================================================================
🟪 4. MERGING TWO ARRAYS
----------------------------------------------------------------
const a = [1, 2];
const b = [3, 4];

const merged = [...a, ...b];
// → [1, 2, 3, 4]

================================================================
🟥 5. COPYING OBJECTS
----------------------------------------------------------------
const user = { name: "Kurt", age: 20 };

const copy = { ...user };
// New object, same values

================================================================
🟫 6. UPDATING OBJECT PROPERTIES
----------------------------------------------------------------
const user = { name: "Kurt", age: 20 };

// Update age
const updated = {
  ...user,
  age: 25
};

================================================================
🟩 7. ADDING NEW OBJECT PROPERTIES
----------------------------------------------------------------
const updated = {
  ...user,
  isAdult: true
};

================================================================
🟦 8. NESTED OBJECT UPDATES (SAFE WAY)
----------------------------------------------------------------
const person = {
  name: "Kurt",
  address: { city: "Manila", zip: 1000 }
};

// Update nested city
const updated = {
  ...person,
  address: {
    ...person.address,
    city: "Quezon City"
  }
};

================================================================
🟨 9. USING SPREAD INSIDE REACT STATE
----------------------------------------------------------------
// Array state (React Native):
const [items, setItems] = useState<number[]>([1, 2, 3]);

// Add item safely (NO push)
setItems([...items, 4]);

----------------------------------------------------------------
// Object state:
const [user, setUser] = useState({ name: "Kurt", age: 20 });

// Update name
setUser({ ...user, name: "Allen" });

================================================================
🟣 10. REMOVING ITEMS FROM ARRAY (FILTER + SPREAD)
----------------------------------------------------------------
// Remove number 2
const updated = items.filter(n => n !== 2);

================================================================
🟪 11. UPDATING ITEMS IN ARRAY (MAP + SPREAD)
----------------------------------------------------------------
const updated = items.map(item =>
  item === 2 ? item + 10 : item
);

================================================================
🟦 12. SPREAD VS STRUCTURED CLONE (WHY SPREAD IS USED)
----------------------------------------------------------------
✔ Fast
✔ Simple
✔ Works in all React Native versions
✔ Perfect for state updates
✔ Makes new references → triggers re-renders

================================================================
🔥 13. COMMON MISTAKES TO AVOID
----------------------------------------------------------------

// ❌ Mutating arrays
arr.push(4);     // BAD
arr.splice(1,1); // BAD
arr.pop();       // BAD

// ✔️ Spread instead
[...arr, 4];

// ❌ Mutating state objects
user.age = 30;

// ✔️ Spread instead
{ ...user, age: 30 }

// ❌ Forgetting nested spread
address: person.address // still same reference

// ✔️ Correct nested
address: { ...person.address, city: "Cebu" }

================================================================
🟩 14. REAL-WORLD EXAMPLES
----------------------------------------------------------------

// Add new todo item
setTodos([...todos, { id: 1, title: "Buy milk" }]);

// Update user settings
setSettings({ ...settings, theme: "dark" });

// Merge product lists
const allProducts = [...featured, ...latest];

// Copy array before sorting
const sorted = [...prices].sort();

================================================================
🔥 SUMMARY — WHAT YOU MUST REMEMBER
----------------------------------------------------------------
1. Spread operator = creates NEW arrays/objects  
2. Never mutate (push, pop, splice) inside React  
3. Use spread to trigger re-renders  
4. Use spread for:
   - adding items
   - copying arrays
   - merging lists
   - updating objects
   - updating state safely

================================================================
END OF FILE — SpreadOperatorCheatsheet.tsx
================================================================
*/
