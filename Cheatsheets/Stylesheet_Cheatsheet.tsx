// /**
// ===========================================================
// 🔥 ULTIMATE REACT NATIVE STYLE CHEATSHEET (COMMENT VERSION)
// ===========================================================
// Everything you need to style real-world RN apps.
// Each line has a purpose explained clearly.
// ===========================================================



// ===========================================================
// 1. 🧱 LAYOUT — FLEX CONTAINER (Parent)
// Controls how children are laid out.
// ===========================================================
// */
// const container = {
//   flex: 1,                       // Makes the container fill the entire screen
//   flexDirection: 'column',       // Layout children vertically (default)

//   justifyContent: 'center',      // Align children vertically (main axis)
//   // Options: flex-start, center, flex-end, space-between, space-around, space-evenly

//   alignItems: 'center',          // Align children horizontally (cross axis)
//   // Options: flex-start, center, flex-end, stretch

//   gap: 12,                       // Adds space BETWEEN children (React Native 0.71+)
//   rowGap: 10,                    // Vertical spacing between rows
//   columnGap: 10,                 // Horizontal spacing between columns

//   flexWrap: 'nowrap',            // Allow children to wrap to new lines
//   alignContent: 'stretch',       // Controls wrapped rows alignment
//   aspectRatio: 1,                // Set width-to-height ratio, 1 = perfect square

//   backgroundColor: '#f2f2f2',    // Background color of container
// };



// /**
// ===========================================================
// 2. 📏 SPACING — MARGIN (outside) & PADDING (inside)
// ===========================================================
// */
// const box = {
//   margin: 12,                    // Margin on all sides
//   marginVertical: 10,            // Margin top + bottom
//   marginHorizontal: 8,           // Margin left + right
//   marginTop: 10,                 // Margin top only
//   marginBottom: 10,              // Margin bottom only

//   padding: 15,                   // Padding on all sides
//   paddingVertical: 10,           // Padding top + bottom
//   paddingHorizontal: 12,         // Padding left + right
//   paddingLeft: 10,               // Padding left only
//   paddingRight: 10,              // Padding right only
// };



// /**
// ===========================================================
// 3. 📐 SIZE — Dimensions & Responsiveness
// ===========================================================
// */
// const size = {
//   width: 120,                    // Fixed width
//   height: 50,                    // Fixed height

//   width: '80%',                  // Width relative to parent width
//   maxWidth: 300,                 // Maximum allowed width
//   minWidth: 100,                 // Minimum allowed width

//   height: '50%',                 // Height relative to parent height
//   maxHeight: 500,                // Maximum height
//   minHeight: 40,                 // Minimum height
// };



// /**
// ===========================================================
// 4. 🎨 BACKGROUND, BORDER, RADIUS, OPACITY
// ===========================================================
// */
// const boxStyle = {
//   backgroundColor: '#fff',       // Box background color

//   borderWidth: 1,                // Border thickness
//   borderColor: '#000',           // Border color
//   borderRadius: 12,              // Round all corners

//   borderStyle: 'solid',          // Border type (solid, dotted, dashed)

//   opacity: 0.9,                  // Transparency level (0 = invisible, 1 = solid)

//   // Individual borders:
//   borderTopWidth: 2,             // Top border thickness
//   borderBottomWidth: 2,          // Bottom border thickness
//   borderLeftColor: '#f00',       // Left border color
//   borderRightColor: '#0f0',      // Right border color
// };



// /**
// ===========================================================
// 5. 🌫️ SHADOWS — iOS vs ANDROID
// ===========================================================
// */
// const shadowBox = {
//   // iOS shadow properties:
//   shadowColor: '#000',           // Shadow color
//   shadowOffset: { width: 0, height: 2 }, // Shadow direction
//   shadowOpacity: 0.25,           // Darkness of the shadow
//   shadowRadius: 3.84,            // Shadow blur radius

//   // Android shadow property:
//   elevation: 5,                  // Android-only shadow depth
// };

// const textShadow = {
//   textShadowColor: '#000',       // Text shadow color
//   textShadowOffset: { width: 1, height: 1 }, // Offset shadow
//   textShadowRadius: 2,           // Shadow blur
// };



// /**
// ===========================================================
// 6. ✍️ TEXT STYLES
// ===========================================================
// */
// const text = {
//   color: '#333',                 // Text color
//   fontSize: 16,                  // Text size
//   fontWeight: '600',             // Boldness (100–900)

//   fontStyle: 'italic',           // Italic text

//   textAlign: 'center',           // Alignment: left, center, right
//   lineHeight: 22,                // Space between lines
//   letterSpacing: 0.5,            // Space between letters

//   textDecorationLine: 'underline', // underline | line-through
//   textTransform: 'uppercase',    // uppercase | lowercase | capitalize

//   includeFontPadding: false,     // Removes extra spacing on Android
//   writingDirection: 'ltr',       // Text direction
// };



// /**
// ===========================================================
// 7. 🖼️ IMAGE STYLES
// ===========================================================
// */
// const image = {
//   width: 100,                    // Image width
//   height: 100,                   // Image height
//   borderRadius: 20,              // Rounded image corners

//   borderWidth: 2,                // Border thickness
//   borderColor: '#ccc',           // Border color

//   resizeMode: 'cover',           // cover | contain | stretch | repeat | center
// };



// /**
// ===========================================================
// 8. 📍 POSITIONING — Absolute / Relative / Z-Index
// ===========================================================
// */
// const position = {
//   position: 'absolute',          // Remove from normal layout
//   top: 10,                       // Position 10 units from top
//   left: 20,                      // Position 20 units from left
//   right: 0,                      // Stick to the right edge
//   bottom: 0,                     // Stick to the bottom edge

//   zIndex: 20,                    // Controls stacking order (higher = on top)
// };

// const fillAbsolute = {
//   ...StyleSheet.absoluteFillObject, // Fill entire parent (top:0, left:0, right:0, bottom:0)
// };



// /**
// ===========================================================
// 9. 🔘 BUTTONS — TouchableOpacity / Pressable
// ===========================================================
// */
// const button = {
//   backgroundColor: '#007bff',    // Button background
//   paddingVertical: 12,           // Inside spacing (top & bottom)
//   paddingHorizontal: 20,         // Inside spacing (left & right)
//   borderRadius: 8,               // Rounded corners

//   alignItems: 'center',          // Center text horizontally
//   justifyContent: 'center',      // Center text vertically
// };

// const buttonPressed = {
//   opacity: 0.6,                  // Visual feedback when pressed
// };

// const buttonText = {
//   color: '#fff',                 // White text color
//   fontSize: 16,                  // Text size
//   fontWeight: '700',             // Bold text
// };

// const hitSlopUtility = {
//   hitSlop: {                     // Increases touch area
//     top: 10,
//     bottom: 10,
//     left: 10,
//     right: 10,
//   },
// };



// /**
// ===========================================================
// 10. ✏️ TEXTINPUT — Real-world form styling
// ===========================================================
// */
// const input = {
//   borderWidth: 1,                // Input border thickness
//   borderColor: '#ccc',           // Input border color
//   borderRadius: 10,              // Rounded corners

//   padding: 12,                   // Inner spacing
//   paddingHorizontal: 15,         // Extra horizontal spacing
//   fontSize: 16,                  // Text size inside input

//   backgroundColor: '#fff',       // Input background color
// };



// /**
// ===========================================================
// 11. 📜 SCROLLVIEW
// ===========================================================
// */
// const scroll = {
//   flex: 1,                       // Take available screen space
//   padding: 10,                   // Inner padding for content
// };

// const horizontalScroll = {
//   flexDirection: 'row',          // Arrange children side-by-side for horizontal scroll
// };



// /**
// ===========================================================
// 12. 🌀 OVERFLOW — Clipping content
// ===========================================================
// */
// const overflowExample = {
//   overflow: 'hidden',            // Hide overflowing content
// };



// /**
// ===========================================================
// 13. ⚙️ FLEX ITEM — Child Behavior
// ===========================================================
// */
// const flexItem = {
//   flex: 1,                       // Expand to fill available space
//   alignSelf: 'flex-start',       // Override parent's alignItems

//   flexGrow: 1,                   // Allow to grow
//   flexShrink: 1,                 // Allow to shrink
//   flexBasis: '50%',              // Suggested initial size
// };



// /**
// ===========================================================
// 14. 🔲 BORDER RADIUS SHORTCUTS
// ===========================================================
// */
// const rounded = {
//   borderTopLeftRadius: 10,
//   borderTopRightRadius: 10,
//   borderBottomLeftRadius: 10,
//   borderBottomRightRadius: 10,
// };

// const circle = {
//   borderRadius: 9999,           // Very large = perfect circle
// };



// /**
// ===========================================================
// 15. 🔄 TRANSFORM — rotate / scale / translate
// ===========================================================
// */
// const transformExample = {
//   transform: [
//     { rotate: '45deg' },         // Rotate 45 degrees
//     { scale: 1.2 },              // Increase size by 20%
//     { translateX: 10 },          // Move right by 10
//     { translateY: 20 },          // Move down by 20
//   ],
// };



// /**
// ===========================================================
// 16. 👻 OPACITY & VISIBILITY
// ===========================================================
// */
// const hidden = {
//   opacity: 0,                    // Invisible but still takes space
// };

// const removed = {
//   display: 'none',               // Remove element completely
// };



// /**
// ===========================================================
// 17. 🧠 EXTRA UTILITY STYLES
// ===========================================================
// */
// const centered = {
//   justifyContent: 'center',      // Center vertically
//   alignItems: 'center',          // Center horizontally
// };

// const textCenter = {
//   textAlign: 'center',           // Center text
// };

// const shadowSm = {
//   elevation: 2,                  // Small Android shadow
// };

// const shadowLg = {
//   elevation: 12,                 // Large Android shadow
// };



// /**
// ===========================================================
// 18. 🌈 COLOR UTILITIES
// ===========================================================
// */
// const primaryBg = { backgroundColor: '#3498db' };
// const secondaryBg = { backgroundColor: '#2ecc71' };
// const dangerBg = { backgroundColor: '#e74c3c' };
// const warningBg = { backgroundColor: '#f1c40f' };
// const lightBg = { backgroundColor: '#ecf0f1' };
// const darkBg = { backgroundColor: '#2c3e50' };



// /**
// ===========================================================
// 19. 📱 RESPONSIVE TRICKS
// ===========================================================
// */
// const fullWidth = {
//   width: '100%',                // Fill full width of parent
// };

// const halfWidth = {
//   width: '50%',                 // Half of parent width
// };

// const responsiveBox = {
//   width: '90%',                 // Almost full width
//   maxWidth: 400,                // But never exceed 400
//   padding: 20,
// };



// /**
// ===========================================================
// 20. 🧿 DEBUG HELPERS — For Layout Practice
// ===========================================================
// */
// const debugBorder = {
//   borderWidth: 1,               // Thin border
//   borderColor: 'red',           // Helps visualize layout
// };

// const debugBg = {
//   backgroundColor: 'rgba(0,255,0,0.2)', // Light green debug background
// };


// /**
// ===========================================================
// END OF STYLE CHEATSHEET WITH FULL COMMENTS
// ===========================================================
// */
