const lightTheme : Theme = {
  background: "#F8F9FB",        // Softer & cleaner than F5F5F5
  surface: "#FFFFFF",           
  textPrimary: "#1A1D1F",       // Deeper, modern black
  textSecondary: "#6B7280",     // Soft gray
  border: "#E5E7EB",            // Modern border gray
  accent: "#3B82F6",            // Modern blue (Material 3 / iOS style)
  accentText: "#FFFFFF",
  ripple: "#E0E7FF",
  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",
  inputBackground: "#F3F4F6",   // Softest light gray
  divider: "#E5E7EB",
  cardShadow: "#00000025",      // Softer natural shadow
};
const darkTheme : Theme = {
  background: "#0D0E11",       // Deeper, more modern dark
  surface: "#1A1C1E",
  textPrimary: "#F3F4F6",      // Slightly softer white
  textSecondary: "#9CA3AF",
  border: "#2D2F33",           // Clean, subtle border
  accent: "#60A5FA",           // Softer blue; beautiful in dark mode
  accentText: "#0D0E11",       
  ripple: "#1E2530",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  inputBackground: "#24262A",  // Matches modern dark surfaces
  divider: "#2F3135",
  cardShadow: "#00000060",
};

type Theme = {
  background: string        // Softer & cleaner than F5F5F5
  surface: string           
  textPrimary: string      // Deeper, modern black
  textSecondary: string    // Soft gray
  border: string          // Modern border gray
  accent: string           // Modern blue (Material 3 / iOS style)
  accentText: string
  ripple: string
  success: string
  warning: string
  error: string
  inputBackground: string   // Softest light gray
  divider: string
  cardShadow: string
};
const card = {
  width: "85%",
  borderRadius: 20,
  paddingVertical: 20,
  paddingHorizontal: 24,
  gap: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0 ,height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 0,
  alignSelf: "center",
}

const selectedCard = {
    borderLeftWidth: 6,
    borderLeftColor: "#FACC15",   // yellow accent
    borderRightWidth: 6,
    borderRightColor: "#F87171",  // red accent
    backgroundColor: "#FFFBEB",
}

const button = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: "#4ADE80",
}

const textButton = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
}


const getDivider = {
  height: 1,
  width: "100%",
  marginVertical: 14,
}

const input = {
  width: "90%",
  alignSelf: "center",
  backgroundColor: "#F9FAFB", // soft gray
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: 16,
  color: "#111827",
  borderWidth: 1,
  borderColor: "#E5E7EB",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
}

accentLeft: {
  position: "absolute"
  left: 0
  top: 0
  width: 8
  height: "100%"
  borderTopLeftRadius: 20
  borderBottomLeftRadius: 20
  // backgroundColor: theme.accent
}

accentRight: {
  position: "absolute"
  right: 0
  top: 0
  width: 8
  height: "100%"
  borderTopRightRadius: 20
  borderBottomRightRadius: 20
  // backgroundColor: theme.accent
}

accentTop: {
  position: "absolute"
  top: 0
  left: 0
  height: 8
  width: "100%"
  borderTopLeftRadius: 20
  borderTopRightRadius: 20
  // backgroundColor: theme.accent
}
accentBottom: {
  position: "absolute"
  bottom: 0
  left: 0
  height: 8
  width: "100%"
  borderBottomLeftRadius: 20
  borderBottomRightRadius: 20
  // backgroundColor: theme.accent
}

// ⭐ Spacing Scale
// const spacing = { xs:4 sm:8 md:12 lg:16 xl:24 xxl:32 };

// // ⭐ Radius Scale
// const radius = { sm:6 md:12 lg:20 pill:999 };

// // ⭐ Shadow Presets
// const shadow = { sm:{shadowColor:"#000"shadowOpacity:0.08shadowRadius:4elevation:2} md:{shadowColor:"#000"shadowOpacity:0.12shadowRadius:8elevation:5} lg:{shadowColor:"#000"shadowOpacity:0.2shadowRadius:12elevation:8} };

// // ⭐ Button Variants
// const button = { primary:{backgroundColor:lightTheme.accentpadding:14borderRadius:12} outline:{borderWidth:1borderColor:lightTheme.borderpadding:14borderRadius:12} ghost:{padding:14borderRadius:12backgroundColor:"transparent"} danger:{backgroundColor:lightTheme.errorpadding:14borderRadius:12} };

// // ⭐ Input Styles
// const input = { base:{padding:12borderRadius:12borderWidth:1backgroundColor:lightTheme.inputBackgroundborderColor:lightTheme.borderfontSize:16} focused:{borderColor:lightTheme.accent} error:{borderColor:lightTheme.error} };

// // ⭐ Chip / Tag / Badge
// const chip = { base:{paddingVertical:6paddingHorizontal:14backgroundColor:lightTheme.dividerborderRadius:20} success:{backgroundColor:lightTheme.success+"33"} error:{backgroundColor:lightTheme.error+"33"} };

// // ⭐ Avatar Sizes
// const avatar = { sm:{width:32height:32borderRadius:16} md:{width:48height:48borderRadius:24} lg:{width:80height:80borderRadius:40} };

// // ⭐ Blur Surface
// const blurSurface = { light:{backgroundColor:"rgba(2552552550.4)"borderRadius:20} dark:{backgroundColor:"rgba(0000.4)"borderRadius:20} };

// // ⭐ Row Layout Helpers
// const row = { between:{flexDirection:"row"justifyContent:"space-between"alignItems:"center"} center:{flexDirection:"row"justifyContent:"center"alignItems:"center"} start:{flexDirection:"row"alignItems:"flex-start"} };

// // ⭐ Container Wrapper
// const container = { padding:20flex:1backgroundColor:lightTheme.background };

// // ⭐ Section Title
// const sectionTitle = { fontSize:20fontWeight:"700"marginBottom:8 };

// // ⭐ Divider Variants
// const dividerVariants = { solid:{height:1width:"100%"} inset:{height:1width:"85%"alignSelf:"center"} dashed:{height:1borderBottomWidth:1borderStyle:"dashed"} };

// // ⭐ List Item
// const listItem = { paddingVertical:14paddingHorizontal:16borderBottomWidth:1borderColor:lightTheme.divider };

// // ⭐ Modal Card
// const modalCard = { backgroundColor:lightTheme.surfacepadding:30borderRadius:20...shadow.md };

// // ⭐ Toast Notifications
// const toast = { success:{backgroundColor:lightTheme.successpadding:12borderRadius:12} error:{backgroundColor:lightTheme.errorpadding:12borderRadius:12} };

// // ⭐ Typography Scale
// const typography = { h1:{fontSize:32fontWeight:"700"} h2:{fontSize:26fontWeight:"600"} h3:{fontSize:22fontWeight:"600"} p:{fontSize:16} small:{fontSize:14opacity:0.8} };

// // ⭐ Icon Button
// const iconButton = { padding:10borderRadius:12backgroundColor:lightTheme.surface };

// // ⭐ Card Variants
// const cardVariants = { success:{borderLeftWidth:6borderLeftColor:lightTheme.success} warning:{borderLeftWidth:6borderLeftColor:lightTheme.warning} error:{borderLeftWidth:6borderLeftColor:lightTheme.error} };

// // ⭐ Surface Levels
// const surfaces = { level1:{backgroundColor:lightTheme.surface} level2:{backgroundColor:"#FAFAFA"} level3:{backgroundColor:"#F0F0F0"} };

// // ⭐ Button Text Variants
// const buttonText = { primary:{color:"#fff"fontWeight:"700"fontSize:16} ghost:{color:lightTheme.textPrimaryfontWeight:"600"} };

// // ⭐ Your Card Style (One-line version)



