/**
===========================================================
🔥 FLEXBOX CHEATSHEET (with explanation every line)
===========================================================

-----------------------------------------------------------
1. FLEX CONTAINER — applied to PARENT
Controls how children are arranged.
-----------------------------------------------------------
container: {
  flex: 1,                     // Fills the entire available screen space

  flexDirection: 'row',        // Main axis direction:
                               // 'row' → left → right
                               // 'column' → top → bottom (default)

  justifyContent: 'center',    // Aligns items ALONG MAIN AXIS:
                               // works differently depending on flexDirection
                               // row → horizontal alignment
                               // column → vertical alignment
                               // options: flex-start | center | flex-end |
                               // space-between | space-around | space-evenly

  alignItems: 'center',        // Aligns items ALONG CROSS AXIS (opposite of main)
                               // row → vertical alignment
                               // column → horizontal alignment

  alignContent: 'flex-start',   // Controls multi-line alignment (when flexWrap is used)
                                // Only works if items wrap onto multiple rows/columns

  flexWrap: 'wrap',             // Allows children to wrap into new lines
                                // 'nowrap' = single line (default)
                                // 'wrap' = move to next line if no space

  gap: 10,                      // Space between child elements
                                // Cleaner alternative to margin

  rowGap: 20,                   // Vertical spacing between wrapped rows

  columnGap: 15,                // Horizontal spacing between wrapped columns

  padding: 20,                  // Inner spacing inside the container

  backgroundColor: '#eee',      // Background color (not flex-related)
},

-----------------------------------------------------------
2. FLEX ITEM — applied to CHILDREN
Controls how an item behaves inside a flex container.
-----------------------------------------------------------
item: {
  flex: 1,                      // Item takes proportional space
                                // flex:1 + flex:1 = 50/50 split

  flexGrow: 1,                  // Item grows to fill remaining space

  flexShrink: 1,                // Item shrinks if there is not enough space
                                // 0 = don't shrink

  flexBasis: 100,               // Initial size before grow/shrink
                                // Think of it as "preferred width/height"

  alignSelf: 'flex-start',      // Overrides parent's alignItems
                                // Useful for aligning 1 specific item differently

  height: 80,                   // Height is still allowed (not a cheat)
  width: 80,                    // Width is allowed too

  backgroundColor: 'lightblue', // Visual only, not flexbox logic
  borderRadius: 10,
},

-----------------------------------------------------------
3. FLEX DIRECTION — Visual guide
-----------------------------------------------------------

flexDirection: 'row'
→  [ item 1 ][ item 2 ][ item 3 ]

flexDirection: 'column'
→  
    item 1
    item 2
    item 3

flexDirection: 'row-reverse'
→  [ item 3 ][ item 2 ][ item 1 ]

flexDirection: 'column-reverse'
→  
    item 3
    item 2
    item 1

-----------------------------------------------------------
4. JUSTIFY CONTENT — MAIN AXIS CONTROL
-----------------------------------------------------------

justifyContent: 'flex-start'
→  [1][2][3]------   (start)

justifyContent: 'center'
→    ---[1][2][3]---   (center)

justifyContent: 'flex-end'
→   ------[1][2][3]   (end)

justifyContent: 'space-between'
→  [1]---[2]---[3]

justifyContent: 'space-around'
→  --[1]--[2]--[3]--

justifyContent: 'space-evenly'
→  ---[1]---[2]---[3]---

-----------------------------------------------------------
5. ALIGN ITEMS — CROSS AXIS CONTROL
-----------------------------------------------------------

alignItems: 'flex-start'
→ Align to top (column) or left (row)

alignItems: 'center'
→ Align to middle

alignItems: 'flex-end'
→ Align to bottom (column) or right (row)

alignItems: 'stretch'
→ Items expand to fill the cross axis

-----------------------------------------------------------
6. alignSelf — Overrides single item alignment
-----------------------------------------------------------
childItem: {
  alignSelf: 'flex-start',  // Only this item aligns to start
}

-----------------------------------------------------------
7. Common Flex Layout Patterns (Ready to Use)
-----------------------------------------------------------

// Center everything
centerEverything: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

// Row with equal boxes
rowEqual: {
  flexDirection: 'row',
},
equalBox: {
  flex: 1,      // makes them equal width
  height: 100,
},

// Grid without flexWrap (nested rows)
grid: {
  flexDirection: 'column',
  gap: 20,
},

// Space between two items
spaceBetweenRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

-----------------------------------------------------------
8. Flexbox debugging helpers
-----------------------------------------------------------
debugBorder: {
  borderWidth: 1,
  borderColor: 'red',      // See item size
},
debugBg: {
  backgroundColor: 'rgba(0,255,0,0.2)',
},

===========================================================
END OF FLEXBOX CHEATSHEET
===========================================================
*/
