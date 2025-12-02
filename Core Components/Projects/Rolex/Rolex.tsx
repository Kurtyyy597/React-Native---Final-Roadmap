import React, {useState, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Image, Keyboard, KeyboardAvoidingView, Platform, Alert, Switch, ActivityIndicator, Pressable, Modal, ScrollView } from 'react-native';


const lightTheme = {
  background: "#F5F5F5",
 
  textPrimary: "#212121",
  textSecondary: "#555555",
  border: "#CCCCCC",
  accent: "#2196F3",
  accentText: "#FFFFFF",
  ripple: "#BBDEFB",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#E53935",
  inputBackground: "#FAFAFA",
  divider: "#E0E0E0",
  cardShadow: "#00000020",
};


const darkTheme = {
  background: "#121212",
  
  textPrimary: "#E0E0E0",
  textSecondary: "#A5A5A5",
  border: "#2E2E2E",
  accent: "#90CAF9",
  accentText: "#000000",
  ripple: "#2B3646",
  success: "#81C784",
  warning: "#FFD54F",
  error: "#EF5350",
  inputBackground: "#2A2A2A",
  divider: "#383838",
  cardShadow: "#00000040",
};


type Props = {
  setGlobalDarkMode: (value: boolean) => void;
};
export default function CoreComponentsTask14({ setGlobalDarkMode } : Props ) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [modalVisible, setShowModalVisible] = useState<boolean>(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  
  
  const [errorMessageGeneral, setErrorMessageGeneral] = useState<string>("");

  const [selectedWatch, setSelectedWatch] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [errorMessageName, setErrorMessageName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");

  const [age, setAge] = useState<string>("");
  const [errorMessageAge, setErrorMessageAge] = useState<string>("");
  const [saveAge, setSavedAge] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [errorMessageAddress, setErrorMessageAddress] = useState<string>("");
  const [saveAddress, setSavedAddress] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState<string>("");
  const [savePhoneNumber, setSavedPhoneNumber] = useState<string>("");

  const [itemName, setItemName] = useState<string>("");
  const [saveItemName, setSavedItemName] = useState<string>("");

  const [randomId, setRandomId] = useState<string>("");
  const [timeStamp, setTimeStamp] = useState<string>("");
  const [dateOrder, setDateOrder] = useState<string>("");
  
  const [itemPrice, setItemPrice] = useState<string>("");
  const [saveItemPrice, setSavedItemPrice] = useState<string>("");
 

  const [itemQuantity, setItemQuantity] = useState<string>("");
  const [errorMessageItemQuantity, setErrorMessageItemQuantity] = useState<string>("");
  const [saveItemQuantity, setSavedItemQuantity] = useState<string>("");

  const [delivery, setDelivery] = useState<boolean>(false);
  const [saveDelivery, setSavedDelivery] = useState<boolean>(false);
  
  const [voucher, setVoucher] = useState<boolean>(false);
  const [saveVoucher, setSavedVoucher] = useState<boolean>(false);

  const [vat, setVat] = useState<boolean>(true);
  const [saveVat, setSavedVat] = useState<boolean>(false);

  const [grandTotal, setGrandTotal] = useState<string>("");

  const [itemImage, setItemImage] = useState<any>(null);
  const [saveItemImage, setSavedItemImage] = useState<any>(null);

  const theme = darkMode ? darkTheme : lightTheme;

  const buyButton = () => {
    if (!name.trim() || !age.trim() || !address.trim() || !itemName.trim() || !itemPrice.trim() || !itemQuantity.trim()) {
      setErrorMessageGeneral("Please fill in all fields!");
      return;
    } else {
      setErrorMessageGeneral("");
    };

    if (name.length < 3) {
      setErrorMessageName("Name is too short! invalid");
      return;
    } else {
      setErrorMessageName("");
    };

  

    if (isNaN(Number(age))) {
      setErrorMessageAge("Age must not contain words!");
      return;
    } else {
      setErrorMessageAge("");
    };

    if (address.length < 15) {
      setErrorMessageAddress("Address is too short!");
      return;
    } else {
      setErrorMessageAddress("");
    };

    if (isNaN(Number(itemPrice))) {
      Alert.alert(`Invalid Price!`);
      return;
    };

    if (isNaN(Number(itemQuantity))) {
      setErrorMessageItemQuantity("Price contains number only!");
      return;
    } else {
      setErrorMessageItemQuantity("");
    };

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessagePhoneNumber("Invalid phone number");
      return;
    } else {
      setErrorMessagePhoneNumber("");
    };



    setLoading(true);
    setShowReceipt(false);
    setSeconds(5);
    setTimeout(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setLoading(false);
          setShowReceipt(true);
          setShowModalVisible(true);

         
       

          setName("");
          setAge("");
          setAddress("");
          setItemName("");
          setItemPrice("");
          setItemQuantity("");

          setErrorMessageName("");
          setErrorMessageAge("");
          setErrorMessageAddress("");
          setErrorMessageItemQuantity("");
          setErrorMessageGeneral("");
          
          setSavedName(name);
          setSavedAge(age);
          setSavedAddress(address);
          setSavedPhoneNumber(phoneNumber);
          setSavedItemName(itemName);
          setSavedItemPrice(itemPrice);
          setSavedItemQuantity(itemQuantity);

          setRandomId(Date.now().toString());
          setTimeStamp(new Date().toISOString());
          setDateOrder(new Date().toLocaleDateString());

          if (delivery) {
            setSavedDelivery(delivery);
          } else {
            setSavedDelivery(false);
          };

          if (voucher) {
            setSavedVoucher(voucher)
          } else {
            setSavedVoucher(false);
          };

          if (vat) {
            setSavedVat(vat);
          } else {
            setSavedVat(false);
          };

          let img = null;
          const lower = itemName.trim().toLowerCase();
          if (lower === "cosmograph daytona") {
            img = (require('../../../Images/cosmograph_daytona.jpg'));
          } else if (lower === "daydate") {
            img = (require('../../../Images/daydate.jpg'));
          } else if (lower === "skydweller") {
            img = (require('../../../Images/skydweller.jpg'));
          } else if (lower === "datejust") {
            img = (require('../../../Images/datejust.jpg'));
          } else if (lower === "oyster perpetual") {
            img = (require('../../../Images/oyster.jpg'));
          } else if (lower === "submariner") {
            img = require('../../../Images/submariner.jpg');
          } else if (lower === "deepsea") {
            img = require('../../../Images/deepsea.jpg');
          } else if (lower === "yatch-master") {
            img = require('../../../Images/yatchmaster.jpg');
          } else if (lower === "air king") {
            img = require('../../../Images/airking.jpg');
          } else if (lower === "gmt-master2" || lower === "gmt master 2") {
            img = require('../../../Images/gmt.jpg');
          } else {
            img = null;
          };
         
          setItemImage(img);
          setSavedItemImage(img);
 
          const numItemPrice = Number(itemPrice);
          const numItemQuantity = Number(itemQuantity);

          const calculate = numItemPrice * numItemQuantity;
          const deliveryFee = delivery ? 40 : 0;
          
          const totalAfterDelivery = calculate + deliveryFee;
          
          const totalAfterVoucher = voucher ? totalAfterDelivery * 0.90 : totalAfterDelivery;
          
          const calculateVat = totalAfterVoucher * 0.10;
          
          const grandTotal = totalAfterVoucher + calculateVat;
          
          setGrandTotal(Number(grandTotal.toFixed(2)).toLocaleString());

          return 0;
          
         

        } else {
          return prev - 1
        }
      });
    }, 1000);
  };

  const clearAllButton = () => {
    Alert.alert(
      "Reset?",
      "This will clear all your inputs.",
      [
        {text: "cancel", style: "cancel"},
        {
          text: "Reset",
          style: 'destructive',
          onPress: () => {
            setName("");
            setAge("");
            setAddress("");
            setPhoneNumber("");
            setItemName("");
            setItemPrice("");
            setItemQuantity("");

            setDelivery(false);
            setVoucher(false);
            setSelectedWatch("");

            setErrorMessageName("");
            setErrorMessageAddress("");
            setErrorMessageAge("");
            setErrorMessageGeneral("");
            setErrorMessagePhoneNumber("");
            setErrorMessageItemQuantity("");
            setErrorMessageGeneral("");

            setLoading(false);
            setShowReceipt(false);
          }
        }
      ]
    );
  };

 const scrollToOutput = () => {
  if (scrollViewRef.current && typeof scrollViewRef.current.scrollToEnd === 'function') {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }
};

const buyAgain = () => {
  Alert.alert(
    "Buy Again?",
    "We're pleased to know you'll be buying from us again!",
    [
      {text: "cancel", style: "cancel"},
      {
        text: "Buy Again", style: 'destructive',
        onPress: () => {
          setName("");
          setAge("");
          setAddress("");
          setPhoneNumber("");

          setSelectedWatch("");

          setErrorMessageAddress("");
          setErrorMessageAge("");
          setErrorMessageGeneral("");
          setErrorMessageItemQuantity("");
          setErrorMessageName("");
          setErrorMessagePhoneNumber("");

          setDelivery(false);
          setVoucher(false);

          setLoading(false);
          setShowReceipt(false);
          setSeconds(0);

            setTimeout(() => {
            scrollToTop();
        }, 300);

        }
      }
    ]
  )
 
};

const scrollToTop = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }
};


  
  return (
     <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
        >



           <ScrollView
              style={[styles.container, { backgroundColor: theme.background }]}
              ref={scrollViewRef}
              contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
              keyboardShouldPersistTaps="never">
                
                <Text style = {[styles.waterMark, {color: theme.textPrimary}]}> Made by Kurt Marquez </Text>



                {/* DARKMODE CONTAINER */}
                <View style = {[styles.darkModeContainer, {backgroundColor: theme.background}]}>
                  
                  <Text style = {[styles.textDarkMode, {color: theme.textPrimary}]}>
                    Theme: {darkMode ? "🌙DARK MODE" : "☀️LIGHT MODE"}
                  </Text>
                <Switch
                value={darkMode}
                onValueChange={(value) => {
                Keyboard.dismiss();
                setDarkMode(value);
                setGlobalDarkMode(value); 
                }}
                thumbColor={darkMode ? theme.accent : theme.warning}
                trackColor={{ true: theme.accent, false: theme.warning }}/>           
                </View>
                {/* DARKMODE CONTAINER */}



                {/* TITLE TEXT CONTAINER */}
                <View style = {[styles.titleContainer, {backgroundColor: theme.background}]}>
                  <Text style = {[styles.textTitle, {color: theme.textPrimary}]}> 🕒 Popular Watches </Text>
                </View>
                {/* TITLE TEXT CONTAINER */}


                {/* Watch List Container*/}
                <View style = {[styles.watchContainerGrid, {backgroundColor: theme.background}]}>
                   
                   {/* CARD TEMPLATE — CARD 1 */}
                   <Pressable style = {[styles.card,  selectedWatch === "cosmograph_daytona" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("cosmograph_daytona")
                    setItemImage(require('../../../Images/cosmograph_daytona.jpg'))
                    setItemName("Cosmograph Daytona")
                    setItemPrice("700000")
                   }}>

                    <Image source={require('../../../Images/cosmograph_daytona.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}> ⌚ Cosmograph Daytona </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                      The Cosmograph Daytona was designed to meet the needs of motor racing professionals.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱700,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE — CARD 1 */}
                   
                   {/* CARD TEMPLATE - CARD 2 */}
                   <Pressable style = {[styles.card,  selectedWatch === "Daydate" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Daydate")
                    setItemImage(require('../../../Images/daydate.jpg'))
                    setItemName("Daydate")
                    setItemPrice("800000")
                   }}>

                    <Image source={require('../../../Images/daydate.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ DayDate </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textPrimary }]}>
                       The Day-Date was the first self-winding waterproof chronometer wristwatch to display.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱800,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 2 */}

                   {/* CARD TEMPLATE - CARD 3 */}
                   <Pressable style = {[styles.card, selectedWatch === "Datejust" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Datejust")
                    setItemImage(require('../../../Images/datejust.jpg'))
                    setItemName("Datejust")
                    setItemPrice("900000")
                   }}>

                    <Image source={require('../../../Images/datejust.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ Datejust</Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                        The first self-winding waterproof chronometer wristwatch with a date window at 3 o’clock.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱900,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 3 */}

                   
                   {/* CARD TEMPLATE - CARD 4 */}
                   <Pressable style = {[styles.card, selectedWatch === "Oyster Perpetual" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Oyster Perpetual")
                    setItemImage(require('../../../Images/oyster.jpg'))
                    setItemName("Oyster Perpetual")
                    setItemPrice("1000000")
                   }}>

                    <Image source={require('../../../Images/oyster.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ Oyster Perpetual </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                        Rolex's first self-winding waterproof chronometer wristwatch.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱1,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 4  */}

                    {/* CARD TEMPLATE - CARD 5 */}
                   <Pressable style = {[styles.card, selectedWatch === "Submariner" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Submariner")
                    setItemImage(require('../../../Images/submariner.jpg'))
                    setItemName("Submariner")
                    setItemPrice("1500000")
                   }}>

                    <Image source={require('../../../Images/submariner.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}> ⌚ Submariner </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                         The first divers’ wristwatch waterproof to 100 meters.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱1,500,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 5  */}

                   {/* CARD TEMPLATE - CARD 6 */}
                   <Pressable style = {[styles.card, selectedWatch === "Skydweller" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Skydweller")
                    setItemImage(require('../../../Images/skydweller.jpg'))
                    setItemName("SkyDweller")
                    setItemPrice("2000000")
                   }}>

                    <Image source={require('../../../Images/skydweller.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ SkyDweller </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                           A technically sophisticated and elegant watch.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱2,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 6  */}

                   {/* CARD TEMPLATE - CARD 7 */}
                   <Pressable style = {[styles.card, selectedWatch === "Deepsea" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Deepsea")
                    setItemImage(require('../../../Images/deepsea.jpg'))
                    setItemName("Deepsea")
                    setItemPrice("3000000")
                   }}>

                    <Image source={require('../../../Images/deepsea.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ Deepsea </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                      The Rolex Deepsea and Deepsea Challenge are ultra-resistant professional divers’ watches. 
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱3,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 7  */}

                   {/* CARD TEMPLATE - CARD 8 */}
                   <Pressable style = {[styles.card, selectedWatch === "GMT-MASTER 2" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("GMT-MASTER 2")
                    setItemImage(require('../../../Images/gmt.jpg'))
                    setItemName("gmt master 2")
                    setItemPrice("4000000")
                   }}>

                    <Image source={require('../../../Images/gmt.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ GMT-MASTER 2 </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                     The GMT-Master II is the ultimate cosmopolitan watch, connecting people across distances and time zones. 
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱4,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 8  */}

                   {/* CARD TEMPLATE - CARD 9 */}
                   <Pressable style = {[styles.card, selectedWatch === "Yatch-Master" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Yatch-Master")
                    setItemImage(require('../../../Images/yatchmaster.jpg'))
                    setItemName("Yatch-Master")
                    setItemPrice("5000000")
                   }}>

                    <Image source={require('../../../Images/yatchmaster.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ Yatch-Master </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                     The Yacht-Master has a bidirectional rotatable bezel for navigational time, is a chronometer, and is designed for navigators with a robust Oyster case. 
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱5,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 9  */}

                    {/* CARD TEMPLATE - CARD 10 */}
                   <Pressable style = {[styles.card, selectedWatch === "Air King" && styles.cardSelected, {backgroundColor: theme.background}]}
                   onPress={() => {
                    setSelectedWatch("Air King")
                    setItemImage(require('../../../Images/airking.jpg'))
                    setItemName("Air King")
                    setItemPrice("9000000")
                   }}>

                    <Image source={require('../../../Images/airking.jpg')} style = {[styles.imageCard]}/>

                    <View style = {[styles.infoContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textTitleWatch, {color: theme.textPrimary}]}>⌚ Air King  </Text>
                    <Text style={[styles.textDescriptionWatch, { color: theme.textSecondary }]}>
                     The Air-King is the watch of those who decide to take charge of their destiny and push back their own limits, continually reaching for greater heights.
                    </Text>
                    <Text style={[styles.textPriceWatch, { color: theme.success }]}>₱9,000,000</Text>

                    </View>
                   </Pressable>
                   {/* CARD TEMPLATE - CARD 10  */}
                 </View>
                 {/* Watch List Container*/}


                 {/*ORDER NOW TEXT*/}
                 <View style = {[styles.textOrderNowContainer, {backgroundColor: theme.background}]}>
                  <Text style = {[styles.textOrderNow, {color: theme.textPrimary}]}> Choose Your Timepiece⌚  </Text>
                 </View>
                {/*ORDER NOW TEXT*/}

                
                
                
                
                
                
                
                
                
                
                
                {/*INPUT FORMS CONTAINER*/}
                <View style = {[styles.inputFormsContainer, {backgroundColor: theme.background}]}>
                   
                  {/* 1. CUSTOMER NAME */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='type your name'
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                    blurOnSubmit={true}
                    />
                    {errorMessageName && (
                      <Text style = {[styles.textErrorMessage, {color: errorMessageName && theme.error}]}>
                        {errorMessageName}
                      </Text>
                    )}
                  </View>
                  
                  {/* 1. CUSTOMER NAME */ }

                  {/* 2. CUSTOMER AGE */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='type your age'
                    value={age}
                    onChangeText={setAge}
                    keyboardType='numeric'
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                    blurOnSubmit={true}
                    />
                    {errorMessageAge && (
                      <Text style = {[styles.textErrorMessage, {color: errorMessageAge && theme.error}]}>
                        {errorMessageAge}
                      </Text>
                    )}
                    
                  </View>
                  {/* 2. CUSTOMER AGE */ }

                  {/* 3. CUSTOMER Address */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='type your address'
                    value={address}
                    onChangeText={setAddress}
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                      blurOnSubmit={true}
                    />
                    {errorMessageAddress && (
                      <Text style = {[styles.textErrorMessage, {color: errorMessageAddress && theme.error}]}>
                        {errorMessageAddress}
                      </Text>
                    )}
                  </View>
                  {/* 3. CUSTOMER Address*/ }

                  {/* 4. CUSTOMER PHONE NUMBER */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='type your phone number'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                    keyboardType='numeric'
                    blurOnSubmit={true}
                    />
                    {errorMessagePhoneNumber && (
                      <Text style = {[styles.textErrorMessage, {color: errorMessagePhoneNumber && theme.error}]}>
                        {errorMessagePhoneNumber}
                      </Text>
                    )}
                  </View>
                  {/* 4. CUSTOMER PHONE NUMBER */ }

                  {/* 5. ITEM NAME */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='Item Name'
                    value={itemName}
                    onChangeText={setItemName}
                    
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                      blurOnSubmit={true}
                    />
                 </View>
                  {/* 5. ITEM NAME */ }

                   {/* 6. ITEM PRICE */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='Price'
                    value={itemPrice}
                    onChangeText={setItemPrice}
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                      blurOnSubmit={true}
                    />
                 </View>
                  {/* 6. ITEM PRICE */ }

                  {/* 7. ITEM QUANTITY */ }
                  <View style = {[styles.inputCard, {backgroundColor: theme.background}]}>
                    <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                    placeholder='Quantity'
                    value={itemQuantity}
                    keyboardType='numeric'
                    onChangeText={setItemQuantity}
                    placeholderTextColor={theme.textPrimary}
                    cursorColor={theme.accent}
                    blurOnSubmit={true}
                    />
                 </View>
                  {/* 7. ITEM QUANTITY */ }

                  {/* DELIVERY CONTAINER CONTAINER */ }
                  <View style = {[styles.deliveryContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textDelivery, {color: theme.textPrimary}]}>
                      Delivery/Pickup: {delivery ? "Add ₱40" : "pickup"}
                    </Text>
                    <Switch value={delivery} onValueChange={setDelivery}
                    thumbColor={delivery ? theme.accent : '#fff'}
                    trackColor={{true: theme.accent, false: '#fff'}}/>
                  </View>
                  {/* DELIVERY CONTAINER CONTAINER */ }

                  {/* VOUCHER CONTAINER */ }
                  <View style = {[styles.voucherContainer, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.textVoucher, {color: theme.textPrimary}]}>
                      Voucher: {voucher ? "10% discount" : "None"}
                    </Text>
                    <Switch value={voucher} onValueChange={setVoucher}
                    thumbColor={voucher ? theme.accent : '#fff'}
                    trackColor={{true: theme.accent, false: '#fff'}}/>
                  </View>
                  {/* VOUCHER */ }

                  {/* BUY BUTTON AND CLEAR BUTTON CONTAINER */ }
                  <View style = {[styles.buyandClearContainer, {backgroundColor: theme.background}]}>
                  <Pressable
                    onPress={buyButton}
                    android_ripple={{ color: theme.ripple }}
                    disabled={loading}
                    style={[styles.button,
                    { backgroundColor: theme.success, borderColor: theme.border },
                    ]}>
                    <Text style={[styles.textButton, { color: theme.accentText }]}>
                    🛒Buy Watch
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={clearAllButton}
                    android_ripple={{ color: theme.ripple }}
                    disabled={loading}
                    style={[styles.button,
                    { backgroundColor: theme.warning, borderColor: theme.border },
                    ]}>
                    <Text style={[styles.textButton, { color: theme.accentText }]}>
                      ♻️Clear All
                    </Text>
                  </Pressable>
                  </View>
                  {errorMessageGeneral && (
                    <Text style = {[styles.textErrorMessage, {color: errorMessageGeneral && theme.error}]}>
                      {errorMessageGeneral}
                    </Text>
                  )}
                  {/* BUY BUTTON AND CLEAR BUTTON CONTAINER */ }
                
                </View>
                {/*INPUT FORMS CONTAINER*/}
                

               {loading && (
              <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
              <ActivityIndicator size={'large'} color={'blue'} />
               <Text style={[styles.textLoading, { color: theme.textPrimary }]}>
               Processing your order... {seconds}s
              </Text>
              </View>
              )}

                {!loading && showReceipt && (
                  <View style = {[styles.outputContainer, {backgroundColor: theme.textPrimary}]}>
                    <View style = {[styles.outputCard, {backgroundColor: theme.background}]}>

                      <Text style = {[styles.textOutputTitle, {color: theme.textPrimary}]}>
                        ORDER SUMMARY
                      </Text>
                      <Text style = {[styles.textOutput, {color: theme.accent}]}> ------------------------------------------------------------------------</Text>
                      <Image source={saveItemImage} style = {[styles.imageOutput]}/>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> ⌚ Watch: {saveItemName} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 👤 Customer Name: {saveName} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🎂 Age: {saveAge} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🏠 Address: {saveAddress} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 📱 Number: {savePhoneNumber} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 💰 Price: {saveItemPrice} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🔢 Quantity: {saveItemQuantity} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🚚 Delivery Fee: {saveDelivery ? "Add 40": "0"} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🎫 Voucher: {saveVoucher ? "10% discount" : "None"} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🧾 VAT: {saveVat ? "Total Price* 0.10" : "None"} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🕒 TimeStamp: {timeStamp} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 🆔 Order Id: {randomId} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> 📅 Date Ordered: {dateOrder} </Text>
                      <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> ₱Total Price: {grandTotal.toString()} </Text>
                      <Pressable
                      onPress={buyAgain}
                      android_ripple={{ color: theme.ripple }}
                      disabled={loading}
                      style={[styles.button,
                      { backgroundColor: theme.success, borderColor: theme.border },
                      ]}>
                      <Text style={[styles.textButton, { color: theme.accentText }]}>
                      🛒Buy Again
                      </Text>
                    </Pressable>

                     
                    </View>
                  </View>
                )}
                
                

           
              </ScrollView>
              <Modal
              visible={modalVisible}
              animationType='slide'
              transparent={true}
              presentationStyle="overFullScreen"
              onRequestClose={() => setShowModalVisible(false)
              
              }>

                <View style = {[styles.modalContainer, {backgroundColor: theme.background}]}>

                  <View style = {[styles.modalCard, {backgroundColor: theme.background}]}>
                    <Text style = {[styles.modalTitle, {color: theme.textPrimary}]}> 
                    Order  Confirmation
                    </Text>

                     <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                      {saveItemImage && (
                        <Image source={saveItemImage} style = {[styles.imageModal]}/>
                      )}
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>⌚ Watch: {saveItemName}</Text>
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>👤 Name: {saveName}</Text>
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>🎂 Age: {saveAge}</Text>
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>🏠Address: {saveAddress}</Text>
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>📱 Phone: {savePhoneNumber}</Text>
                      
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>💰 Price: ₱{saveItemPrice}</Text>
                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>🔢 Quantity: {saveItemQuantity}</Text>

                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>
                       🚚 Delivery Fee: {saveDelivery ? "₱40" : "₱0"}
                      </Text>

                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>
                       🎫 Voucher: {saveVoucher ? "10% Discount" : "None"}
                      </Text>

                      <Text style={[styles.modalText, { color: theme.textPrimary }]}>
                       🧾 VAT: {saveVat ? "Total Price * 0.10" : "None"}
                      </Text>

                      

                      <Text style={[styles.modalTotal, { color: theme.success }]}>
                      Total: ₱{grandTotal}
                      </Text>

                       <Pressable
                        style={[styles.modalConfirmButton, { backgroundColor: theme.success }]}
                        onPress={() => {
                        Alert.alert("Success", "Your order has been confirmed!");
                        setShowModalVisible(false);
                            setTimeout(() => scrollToOutput(), 300);
                        }}>
                      
                        <Text style={[styles.textConfirm, {color: '#444'}]}>
                        ✔️Confirm Order
                        </Text>
                        </Pressable>

                      <Pressable
                      style={[styles.modalCloseButton, { backgroundColor: theme.accent }]}
                      onPress={() => {
                        setShowModalVisible(false)
                        setShowReceipt(false)
                        setName("");
                        setAge("");
                        setAddress("");
                        setPhoneNumber("");
                        setDelivery(false);
                        setVoucher(false);
                        setSelectedWatch("");
                        setTimeout(() => {
                        scrollToTop();
                        }, 300);
                      }}>
                      
                      
                      <Text style={[styles.textConfirm, {color: '#444'}]}>
                       ❌Choose Other Watch
                      </Text>
                      </Pressable>
                     </ScrollView>
                  </View>
                </View>
              </Modal>


      </KeyboardAvoidingView>

  )




};

const styles = StyleSheet.create({
  container: {
    flex: 1

  },

  darkModeContainer: {
    margin: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10

  },

  waterMark: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  textDarkMode: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 1,
    

  },

  titleContainer: {
    alignSelf: 'baseline'
    

  },
  
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'left'

  },

  watchContainerGrid: {
    margin: 10,
    flexDirection: 'column',
    width: '100%',
    gap: 15,
    
    
    

  },

  cardSelected: {
  borderWidth: 5,
  borderColor: "#2196F3",
  transform: [{ scale: 1.02 }],
  shadowColor: "#2196F3",
  shadowOpacity: 0.4,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 8,

  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
    elevation: 10,
    shadowColor: '#fefeffff',
    shadowOpacity: 0.15,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 19,
    


  },

  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 5,
    right: 5
    

    

  },

  infoContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
  
    


  },

  textTitleWatch: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'

  },

  textDescriptionWatch: {
    textAlign: 'justify',
    fontSize: 14,
    flexShrink: 1,
  
    
    

  },

  textPriceWatch: {
    fontSize: 18,
    fontWeight: 'bold',

  },

  textOrderNowContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },

  textOrderNow: {
    fontSize: 25,
    fontWeight: '900'

  },

  inputFormsContainer: {
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    gap: 1,
    
    

    shadowColor: "#000",
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    height: 670

  },

  inputCard: {
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: '85%',
    borderRadius: 20,

  },

  input: {
    fontSize: 16,
    fontWeight: 'bold',
    

  },

  textErrorMessage: {
    marginTop: 10,
    fontSize: 12

  },

  deliveryContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'

  },

  textDelivery: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  voucherContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'

  },

  textVoucher: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  buyandClearContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
   
    
    

  },

  button: {
    width: '35%',
    borderRadius: 20,
    paddingVertical: 10,
  

  },

  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  

  },

  textLoading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  outputContainer: {
    flex: 1,
    width: '85%',
    
    marginTop: 160

  },

  outputCard: {
    shadowColor: "#000",
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    gap: 5
    


  },

  textOutputTitle: {
    
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify'


  },

  textOutput: {
    
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'

  },

  imageOutput: {
    marginTop: 30,
    width: 300,
    height: 150,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  modalContainer: {
    flex: 1,
    width:'auto',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  modalCard: {
    borderRadius: 10,
    maxHeight: '85%',
    shadowColor: "#000",
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    gap: 10,
    
   
  

  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  modalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },

  modalTotal: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'

  },

  modalCloseButton: {
    marginTop: 10,
    width: '30%',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    

  },

  modalConfirmButton: {
    width: '30%',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10

  },


  imageModal: {
    
    width: 250,
    height: 200,
    borderRadius: 20
  },

  textConfirm: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  loadingContainer: {
    marginTop: 20
  }





  
})