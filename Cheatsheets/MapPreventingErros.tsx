/**
===============================================================
🔥 MAP() — PREVENTING ERRORS CHEATSHEET (React Native + TSX)
===============================================================

This file contains ALL the common map() mistakes and how
to fix them. Copy-paste into VSCode: MapPreventingError.tsx

===============================================================
🏁 0. WHAT MAP DOES
---------------------------------------------------------------
array.map((item, index) => {
  return something;
});

- Loops through the array
- Returns a NEW array (does NOT mutate original)
- map is only for TRANSFORMATION
- Returned value goes into the new array

===============================================================
🚫 1. FORGETTING RETURN INSIDE MAP
---------------------------------------------------------------
❌ WRONG:
const list = items.map(item => {
  <Text>{item}</Text> // nothing returned!
});

✔️ RIGHT:
const list = items.map(item => {
  return <Text>{item}</Text>;
});

✔️ SHORT HAND:
const list = items.map(item => <Text>{item}</Text>);

===============================================================
🚫 2. MISSING key={} WHEN RETURNING JSX
---------------------------------------------------------------
❌ WRONG:
{fruits.map(fruit => <Text>{fruit}</Text>)}

✔️ RIGHT:
{fruits.map((fruit, index) => (
  <Text key={index}>{fruit}</Text>
))}

- key helps React track each list item
- Required when mapping JSX

===============================================================
🚫 3. MAPPING A NON-ARRAY VALUE
---------------------------------------------------------------
❌ WRONG:
const data = { name: "Kurt" };
data.map(...)  // ERROR

✔️ RIGHT:
const data = [{ name: "Kurt" }];
data.map(...)

===============================================================
🚫 4. MUTATING INSIDE MAP (VERY BAD)
---------------------------------------------------------------
❌ WRONG:
numbers.map(n => numbers.push(n + 1));

✔️ RIGHT:
const updated = numbers.map(n => n + 1);

- map should be PURE (no side effects)
- Always return new values only

===============================================================
🚫 5. USING map() FOR SIDE EFFECTS
---------------------------------------------------------------
❌ WRONG:
items.map(item => setState(item));

✔️ RIGHT:
items.forEach(item => setState(item)); // use forEach for actions
map → for returning new array
forEach → for doing actions

===============================================================
🚫 6. RETURNING MULTIPLE SIBLINGS (NO WRAPPER)
---------------------------------------------------------------
❌ WRONG:
return (
  <>
    <Text>{user.name}</Text>
    <Text>{user.age}</Text>  // React Native doesn't allow unwrapped siblings!
  </>
);

✔️ RIGHT:
return (
  <View>
    <Text>{user.name}</Text>
    <Text>{user.age}</Text>
  </View>
);

===============================================================
🚫 7. MISSING PARENTHESES WHEN MULTI-LINE JSX
---------------------------------------------------------------
❌ WRONG:
users.map(user =>
  <View>
    <Text>{user.name}</Text>
  </View>
)  // unpredictable behavior

✔️ RIGHT:
users.map(user => (
  <View key={user.name}>
    <Text>{user.name}</Text>
  </View>
))

===============================================================
🚫 8. USING index AS KEY FOR DYNAMIC LISTS
---------------------------------------------------------------
❌ BAD FOR LISTS THAT CHANGE:
key={index}

✔️ BEST:
key={user.id}

- index breaks when items are reordered, deleted, or inserted
- Only safe for STATIC lists

===============================================================
🚫 9. MAP OUTSIDE JSX WITHOUT USING RESULT
---------------------------------------------------------------
❌ WRONG:
function App() {
  users.map(...)
  return (...)
}

✔️ RIGHT:
function App() {
  const list = users.map(...)
  return <View>{list}</View>
}

===============================================================
🚫 10. RETURNING MULTIPLE ROOT ELEMENTS
---------------------------------------------------------------
❌ WRONG:
return (
  users.map(...)
)

✔️ RIGHT:
return (
  <View>
    {users.map(...)}
  </View>
)

React Native requires one parent container.

===============================================================
🔥 SUMMARY — HOW TO AVOID MAP ERRORS
---------------------------------------------------------------
✔ Always return something inside map  
✔ Always include key={}  
✔ Only map arrays  
✔ Never mutate state inside map  
✔ Never push/pop/splice inside map  
✔ Wrap multiple JSX items with <View>  
✔ Use parentheses for multi-line JSX  
✔ Avoid index keys in dynamic lists  
✔ Keep map pure (return value only)  

===============================================================
END OF FILE — MapPreventingError.tsx
===============================================================
*/
