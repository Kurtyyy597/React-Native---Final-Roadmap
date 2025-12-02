import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Switch, ActivityIndicator, Alert, Pressable, ScrollView} from 'react-native';

export default function ActivityIndicatorTask5() {
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [saveName, setSavedName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [saveAddress, setSavedAddress] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [availableItem, setAvailableItems] = useState<string>("");
  const [delivery, setDelivery] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [saveItemname, setSavedItemName] = useState<string>("");
  const [savePrice, setSavedPrice] = useState<string>("");
  const [saveQty, setSavedQty] = useState<string>("");
 

  const buyItem = () => {
    if (!name.trim() || !address.trim() || !itemName.trim() || !qty.trim()) {
      Alert.alert(`Please fill in all fields to buy item!`);
      return;
    };

    if (isNaN(Number(price)) || isNaN(Number(qty))) {
      Alert.alert(`Price and quantity should contain numbers only!`);
      return;
    }

    const availableItemforShop = ["Nike", "Adidas", "Puma", "Under Armour", "Skechers", "Gucci", "Vans", "New Balance"];
    if (!availableItemforShop.includes(itemName)) {
      Alert.alert(`Shoes brand is not avaiable`);
      setAvailableItems("Available brands:\nNike\nAdidas\nPuma\nUnder Armour\nSkechers\nGucci\nVans\nNew Balance");
      setShowProfile(false);
      return;
    };
    
    const numPrice = Number(price);
    const numQty = Number(qty);
    const calculate = numPrice * numQty
    setTotalPrice(calculate.toString());

    setLoading(true);
    setShowProfile(false);
    setSeconds(5);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);

          setLoading(false);
          setShowProfile(true);
          setSavedName(name);
          setSavedAddress(address);
          setSavedItemName(itemName);
          setSavedPrice(price);
          setSavedQty(qty);
          setName("");
          setAddress("");
          setPrice("");
          setQty("");
          setDelivery(false);
          if (delivery) {
            setMessage('🚚This item is for delivery, thanks for purchasing to our shop!');
          } else {
            setMessage('🏬This item is pickup, thanks for purchasing to our shop!');
          }
          return 0
        } else {
          return prev - 1
        }
      })
    }, 1000);
};

  const clearAllInput = () => {
    setAddress("");
    setItemName("");
    setLoading(false);
    setShowProfile(false);
    setName("");
    setPrice("");
    setQty("");
    setMessage("");
    setSavedAddress("");
    setSavedItemName("");
    setSeconds(0);
    setAvailableItems("");
};


  return (
    <ScrollView
     style={styles.container}
    contentContainerStyle={{alignItems: 'center', flexGrow: 1}}>
      <Text style = {styles.titleTextShop}> Shoe Shop Order  </Text>

      <View style = {styles.inputForm}>
        <TextInput style = {styles.input} placeholder='Type Your Name' value={name} onChangeText={setName}/>
        <TextInput style = {styles.input} placeholder='Type Your Address' value={address} onChangeText={setAddress}/>
        <TextInput style = {styles.input} placeholder='Item Name' value={itemName} onChangeText={setItemName}/>
        <TextInput style = {styles.input} placeholder='Price' value={price} onChangeText={setPrice}/>
        <TextInput style = {styles.input} placeholder='Quantity' value={qty} onChangeText={setQty}/>
        
        <View style = {styles.switchContainer}> 
          <Text style = {styles.textSwitch}> {delivery ? "Delivery" : "Pickup"} </Text>
          <Switch value = {delivery} onValueChange={setDelivery}/>
        </View>
        
        <View style = {styles.buttonContainer}> 
        <Pressable onPress={buyItem} style={({pressed}) => [
          styles.buttonBuyItem,
          {backgroundColor: pressed ? '#1322ffff' : '#fff'}
        ]}>
          <Text style = {styles.textBuyItem}> Buy Item </Text>
        </Pressable>
        <Pressable onPress={clearAllInput} style = {({pressed}) => [
          styles.buttonClearAll,
          {backgroundColor: pressed ? '#1322ffff' : '#fff'}
        ]}>
        <Text style = {styles.textClearAll}> Clear Input </Text>
        </Pressable>
        </View>
      
      </View>

      

      {loading && (
        <View style = {styles.loadingView}>
          <ActivityIndicator size={'large'} color={'#2e0ceaff'}/>
          <Text style = {styles.textLoading}> Loading... {seconds}s </Text>
          </View>
      )}

      {!loading && showProfile && (
        <View style = {styles.outputContainer}>
          <Text style = {styles.textOutput}> 👤Name: {saveName} </Text>
          <Text style = {styles.textOutput}> 🏠Address {saveAddress} </Text>
          <Text style = {styles.textOutput}> 👟Item Name: {saveItemname} </Text>
          <Text style = {styles.textOutput}> 💰Price: {savePrice} </Text>
          <Text style = {styles.textOutput}> 📦Quantity: {saveQty} </Text>
          <Text style = {styles.textOutput}> 🧾Total: ₱{totalPrice}</Text>
          <Text style = {styles.textOutput}> {message} </Text>
          </View>
      )}

      {availableItem !== "" && (
        <View style={styles.outputViewError}>
          <Text style={styles.textError}>{availableItem}</Text>
        </View>
      )}

    
    </ScrollView> 
  );
}


const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#fff'
  


  },

  titleTextShop: {
    
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold'

  },

  inputForm: {
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    height: 400,
    alignItems: 'center',

  },

  input: {
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    width: '85%',
    padding: 10

  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  


  },

  textSwitch: {
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 'bold'

  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10

  },

  buttonBuyItem: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 40

  },

  textBuyItem: {
    fontSize: 16,
    marginTop: 6

  },

  buttonClearAll: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',

  },

  textClearAll: {
    fontSize: 16,
    marginTop: 6

  },

  loadingView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50

  },

  textLoading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10

  },

  outputContainer: {
    borderWidth: 2,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
    width: 200,
    marginBottom: 60

  },

  textOutput: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'

  },

  textError: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },

  outputViewError: {
    alignItems: 'center',
    flex: 1

  }




})
