import React, {useState, useRef} from 'react';
import {View, Text, Image, TextInput, Platform, Pressable, Modal, ActivityIndicator, Switch, StyleSheet, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';

const lightTheme = {
  background: "#F5F5F5",
  surface: "#FFFFFF",
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

// 🌙 Dark Mode Colors
const darkTheme = {
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#ffffff",
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

export default function ActivityIndicatorTask12() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const scrollViewRef = useRef(null);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [errorMessageName, setErrorMessageName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");

  const [age, setAge] = useState<string>("");
  const [errorMessageAge, setErrorMessageAge] = useState<string>("");
  const [saveAge, setSavedAge] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [errorAddressMessage, setErrorAddressMessage] = useState<string>("");
  const [saveAddress, setSavedAddress] = useState<string>("");

  const [itemName, setItemName] = useState<string>("");
  const [errorItemName, setErrorItemName] = useState<string>("");
  const [saveItemName, setSavedItemName] = useState<string>("");

  const [itemPrice, setItemPrice] = useState<string>("");
  const [saveItemPrice, setSavedItemPrice] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<string>("");
  const [errorMessageItemQuantity, setErrorMessageItemQuantity] = useState<string>("");
  const [saveItemQuantity, setSavedItemQuantity] = useState<string>("");
  const [voucher, setVoucher] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [itemImage, setItemImage] = useState<any>(null);

 
 

  


  const theme = darkMode ? darkTheme: lightTheme;

  const buyButton = () => {
  if (!name.trim() || !age.trim() || !address.trim() || !itemName.trim() || !itemPrice.trim() || !itemQuantity.trim()) {
    Alert.alert("Please fill in all fields first!");
    return;
  }

  if (/[0-9]/.test(name)) {
    setErrorMessageName("Name cannot contain numbers");
    return;
  } else if (name.length < 4) {
    setErrorMessageName("Name is too short!");
    return;
  } else {
    setErrorMessageName("");
  }

  if (isNaN(Number(age))) {
    setErrorMessageAge("Age should be numbers only!");
    return;
  } else {
    setErrorMessageAge("");
  }

  if (/[\u{1F600}-\u{1F6FF}]/u.test(address)) {
    setErrorAddressMessage("Address cannot contain emojis");
    return;
  }

  if (address.length < 15) {
    setErrorAddressMessage("Address is too short!");
    return;
  } else if (address.length > 100) {
    setErrorAddressMessage("Address is too long!");
    return;
  } else {
    setErrorAddressMessage("");
  }

  if (isNaN(Number(itemPrice))) {
    Alert.alert("Price invalid!");
    return;
  }

  if (isNaN(Number(itemQuantity))) {
    setErrorMessageItemQuantity("Quantity Invalid");
    return;
  } else {
    setErrorMessageItemQuantity("");
  }

  const listofItems = "apple, apricot, banana, blackberry, blueberry";
  const fruit = itemName.trim().toLowerCase();

  if (!listofItems.includes(fruit)) {
    setErrorItemName("Fruit not available!");
    return;
  } else {
    setErrorItemName("");
  }

  // START LOADING
  setLoading(true);
  setShowReceipt(false);
  setSeconds(5);

  const interval = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        clearInterval(interval);

        setLoading(false);
        setShowReceipt(true);

        setSavedName(name);
        setSavedAge(age);
        setSavedAddress(address);
        setSavedItemName(itemName);
        setSavedItemPrice(itemPrice);
        setSavedItemQuantity(itemQuantity);
        setDate(new Date().toLocaleDateString());
        setTime(new Date().toLocaleTimeString());

        const numPrice = Number(itemPrice);
        const numQty = Number(itemQuantity);

        const subtotal = numPrice * numQty;
        const subtotalAfterVoucher = voucher ? subtotal * 0.90 : subtotal;

        const deliveryFee = delivery ? 40 : 0;
        const totalWithDelivery = subtotalAfterVoucher + deliveryFee;

        const vat = totalWithDelivery * 0.12;
        const grandTotal = totalWithDelivery + vat;

        setTotal(grandTotal.toFixed(2));

        if (fruit === "apple") setItemImage(require('../../../Images/apple.jpg'));
        if (fruit === "apricot") setItemImage(require('../../../Images/apricot.jpg'));
        if (fruit === "banana") setItemImage(require('../../../Images/banana.jpg'));
        if (fruit === "blackberry") setItemImage(require('../../../Images/blackberry.jpg'));
        if (fruit === "blueberry") setItemImage(require('../../../Images/blueberry.jpg'));

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

}; // closes buyButton

  return (
     <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>

          <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            ref={scrollViewRef}
            scrollEnabled={true}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 60, // prevents auto-scroll
            }}>

              {/* Fruits Title Text Container */}
              <View style = {[styles.fruitTitleContainer, {backgroundColor: theme.success, borderColor: theme.border}]}>
                <Text style = {[styles.textFruitTitle, {color: theme.textPrimary}]}>
                  Welcome to Fruit Shop!
                </Text>
              </View>
              {/* Fruits Title Text Container */}

              {/* Darkmode Container */}
              <View   pointerEvents="box-none" style = {[styles.darkModeContainer, {backgroundColor: theme.background}]}>
                <Text style = {[styles.textDarkMode, {color: theme.textPrimary}]}>
                  Theme: {darkMode ? "DARK MODE" : "LIGHT MODE"}
                </Text>
                <Switch value={darkMode} onValueChange={setDarkMode}/>
              </View>
              {/* Darkmode Container */}

              
              {/* Fruits overall Container */}
              <View style = {[styles.fruitImagesContainer, {backgroundColor: theme.background}]}>
                {/* Apple */}
                <Pressable style = {[styles.itemCard, {borderColor: theme.border}]}
                onPress={() => {
                  setItemImage(require('../../../Images/apple.jpg'))
                  setItemName("Apple")
                  setItemPrice("200")
                }}>
                  
                 <Image source={require('../../../Images/apple.jpg')} style = {[styles.imageCard]}/>
                 <Text style = {[styles.textFruit, {color: theme.textPrimary}]}> Apple </Text>
                </Pressable>
                {/* Apple */}
                
                {/* Apricot */}
                <Pressable style = {[styles.itemCard, {borderColor: theme.border}]}
                onPress={() => {
                  setItemImage(require('../../../Images//apricot.jpg'))
                  setItemName("Apricot")
                  setItemPrice("400")
                  }}>
                 <Image source={require('../../../Images/apricot.jpg')} style = {[styles.imageCard]}/>
                 <Text style = {[styles.textFruit, {color: theme.textPrimary}]}> Apricot </Text>
                </Pressable>
                {/* Apricot */}

                {/* Banana */}
                 <Pressable style = {[styles.itemCard, {borderColor: theme.border}]}
                onPress={() => {
                  setItemImage(require('../../../Images/banana.jpg'))
                  setItemName("Banana")
                  setItemPrice("250")
                  }}>
                 <Image source={require('../../../Images/banana.jpg')} style = {[styles.imageCard]}/>
                 <Text style = {[styles.textFruit, {color: theme.textPrimary}]}> Banana </Text>
                </Pressable>
                {/* Banana */}

                {/* Blackberry */}
                   <Pressable style = {[styles.itemCard, {borderColor: theme.border}]}
                onPress={() => {
                  setItemImage(require('../../../Images/blackberry.jpg'))
                  setItemName("Blackberry")
                  setItemPrice("210")
                  }}>
                 <Image source={require('../../../Images/blackberry.jpg')} style = {[styles.imageCard]}/>
                 <Text style = {[styles.textFruit, {color: theme.textPrimary}]}> Blackberry </Text>
                </Pressable>
                {/* Blackberry */}

                {/* Blueberry */}
                 <Pressable style = {[styles.itemCard, {borderColor: theme.border}]}
                onPress={() => {
                  setItemImage(require('../../../Images/blueberry.jpg'))
                  setItemName("Blueberry")
                  setItemPrice("600")
                  }}>
                 <Image source={require('../../../Images/blueberry.jpg')} style = {[styles.imageCard]}/>
                 <Text style = {[styles.textFruit, {color: theme.textPrimary}]}> Blueberry </Text>
                </Pressable>
                {/* Blueberry */}
              </View>
              {/* Fruits overall Container */}

               {/* input Forms to buy Fruits*/}
              <View style = {[styles.inputContainer, {backgroundColor: theme.background}]}>

                {/* Name */}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]} 
                placeholder='type your name'
                value={name} 
                onChangeText={setName}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {errorMessageName && (
                  <Text style = {[styles.textErrorName, {color: errorMessageName ? theme.error : theme.textPrimary }]}>
                    {errorMessageName}
                  </Text>
                )}
                {/* Name */}

                {/* Age */}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                placeholder='type your age'
                value={age}
                onChangeText={setAge}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {errorMessageAge && (
                  <Text style = {[styles.textErrorAge, {color: errorMessageAge ? theme.error : theme.textPrimary}]}>
                    {errorMessageAge}
                  </Text>
                )}
                {/* Age */}

                {/* Address */}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                placeholder='type your address'
                value={address}
                onChangeText={setAddress}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {errorAddressMessage && (
                  <Text style = {[styles.textErrorAddress, {color: errorAddressMessage ? theme.error : theme.textPrimary}]}>
                    {errorAddressMessage}

                  </Text>
                )}

                {/* Item Name */}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                placeholder='Item Name'
                value={itemName}
                onChangeText={setItemName}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {errorItemName && (
                  <Text style = {[styles.textErrorItemName, {color: errorItemName ? theme.error : theme.textPrimary}]}>
                    {errorItemName}
                  </Text>
                )}
                {/* Item Name */}

                {/* Item Price*/}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                placeholder='Item Price'
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {/* Item Price*/}

                {/* Item Quantity*/}
                <TextInput style = {[styles.input, {borderColor: theme.border, color: theme.textPrimary}]}
                placeholder='Item Quantity'
                value={itemQuantity}
                onChangeText={setItemQuantity}
                placeholderTextColor={theme.textSecondary}
                cursorColor={theme.accent}/>
                {errorMessageItemQuantity && (
                  <Text style = {[styles.textErrorQuantity, {color: errorMessageItemQuantity? theme.error : theme.textPrimary}]}>
                    {errorMessageItemQuantity}
                  </Text>
                )}
                {/* Item Quantity*/}

                {/* Voucher Container*/}
                <View style = {[styles.voucherContainer, {backgroundColor: theme.background}]}>
                  <Text style = {[styles.textVoucher, {color: theme.textPrimary}]}>
                    Activate Voucher? {voucher ? "YES" : "NO"}
                  </Text>
                  <Switch value={voucher} onValueChange={setVoucher}/>
                </View>
                {/* Voucher Container*/}

                {/* Delivery Container*/}
                <View style = {[styles.deliveryContainer, {backgroundColor: theme.background}]}>
                  <Text style = {[styles.textDelivery, {color: theme.textPrimary}]}>
                    Delivery/Pickup: {delivery? "Delivery" : "Pickup"}
                  </Text>
                  <Switch value={delivery} onValueChange={setDelivery}/>
                </View>
                {/* Delivery Container*/}

                {/* Buy Button */}
                <Pressable 
                onPress={buyButton}
                style = {({pressed}) => [
                  styles.buyButton,
                  {borderColor: theme.accent, backgroundColor: theme.accent},
                  
                ]}
                android_ripple={{color: theme.ripple}}
                accessibilityRole='button'
                accessibilityLabel='buy button'>
                  <Text style = {[styles.textBuyButton, {color: theme.textPrimary}]}>
                    {loading ? "Processing..." : "Buy Item"}
                  </Text>
                </Pressable>
                {/* Buy Button */}
              </View>
              {/* input Forms to buy Fruits*/}

              {loading && (
                <>
                <ActivityIndicator size={'large'} color={theme.accent}/>
                <Text style = {[styles.textLoading, {color: theme.textPrimary}]}>
                  Processing your order... {seconds}s
                </Text>                
                </>
              )}

              {!loading && showReceipt && (
                <View style = {[styles.outputContainer, {backgroundColor: theme.background}]}>
                  <Image style = {[styles.imageOutput]} source={itemImage}/>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Customer Name: {saveName} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Customer Age: {saveAge} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Customer Address: {saveAddress} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Item Name: {saveItemName} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Item Price: {saveItemPrice} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Item Quantity: {saveItemQuantity} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Item Quantity: {saveItemQuantity} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Delivery/Pickup: {delivery ? "Delivery" : "Pickup"} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Time Purchase: {time} </Text>
                  <Text style = {[styles.textOutput, {color: theme.textPrimary}]}> Date of Purchase: {date} </Text>
                </View>
              )}
        </ScrollView>

      </KeyboardAvoidingView>
    
  )

};

const styles = StyleSheet.create({
  container: {

  },

  fruitTitleContainer: {
    margin: 40,
    width: 350,
    height: 100,
    alignItems: 'center',
    borderRadius: 10
    

  },

  textFruitTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 30,
  

  },

  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',

  },

  textDarkMode: {
    fontSize: 20,
    textAlign: 'center'

  },

  fruitImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    gap: 15,
    
    

  },

  itemCard: {
    borderWidth: 5,
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    
    

  },

  imageCard: {
    width: 120,
    height: 100,
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    

  },

  textFruit: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10

  },

  inputContainer: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 20,
    width: 300,
    height: 550

  },

  input: {
    borderWidth: 3,
    borderRadius: 20,
    fontSize: 18,
    width: '85%',
    margin: 5,
    fontWeight: 'bold',
    


  },

  textErrorName: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  textErrorAge: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize'


  },

  textErrorAddress: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize'

  },

  textErrorItemName: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize'


  },

  textErrorQuantity: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize'


  },

  voucherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  textVoucher: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  textDelivery: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  buyButton: {
  backgroundColor: "#2196F3",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 10,

  },

  textBuyButton: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  textLoading: {
    padding: 10,
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold'

  },

  outputContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10

  },

  imageOutput: {
    width: 300,
    height: 250,
    borderRadius: 20,
    resizeMode: 'cover',
    borderColor: '#ccc',


  },

  textOutput: {
    padding: 3,
    margin: 3,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900'

  }






})


