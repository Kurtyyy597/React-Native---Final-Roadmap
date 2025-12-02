import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {View, Text, TextInput, Alert, StyleSheet, Switch, Pressable, Image} from 'react-native';

export default function SwitchTask6() {
  const [itemName, setItemName] = useState<string>("");
  
  const [qty, setQty] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [summaryMessage, setSummaryMessage] = useState<string>("");
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  React.useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  })();
}, []);

  const pickImage = async () => {
  // Launch image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

  const calculateButton = () => {
  if (!itemName.trim() || !qty.trim() || !price.trim()) {
    Alert.alert(`Please fill in all fields to calculate!`);
    return;
  };

  if (!/^[A-Za-z\s]+$/.test(itemName) ) {
        Alert.alert(`Name should not contain numbers!`);
        return;
      };
  const availableItem = ["bag", "wallet", "shoes", "ballpen", "Water bottle", "Backpack", "Smartphone", "Umbrella", "Coffee mug"];
  if (!availableItem.includes(itemName.toLowerCase())) {
    Alert.alert(`Item not available`);
    setMessage(`List of items: \n ${availableItem}`);
    setShowResult(false);
    return;
    
  }

  const qtyNum = Number(qty);
  const priceNum = Number(price);
  if (isNaN(qtyNum) || isNaN(priceNum)) {
    Alert.alert(`Enter valid Price!`);
    return;
  };
  const calculatePrice = qtyNum * priceNum
  const finalPrice = applyDiscount ? calculatePrice * 0.9 : calculatePrice;


  
 
  setSummaryMessage(`You bought item "${itemName}",\n Quantity: ${qty}\n Discount: ${applyDiscount ? ('with discount') : "Not applied"}\n Total Price: ${finalPrice}`);
  setShowResult(true);
  setMessage("");
  };

  return (
    <View style = {[styles.container, {backgroundColor: applyDiscount ? '#747dfbff' : '#f1fdedff'}]}>
      <Text style = {styles.textTitle}> HELLO WELCOME TO OUR SHOP! </Text>

      <View style = {styles.shopForm}>
        <TextInput style = {styles.input} placeholder='enter Item name' value={itemName} onChangeText={setItemName}/>
        <TextInput style = {styles.input} placeholder='Enter quantity' value={qty} onChangeText={setQty} keyboardType='numeric'/>
        <TextInput style = {styles.input} placeholder='type Price' value={price} onChangeText={setPrice} keyboardType='numeric'/>

        <View style = {styles.discountForm}>
          <Text style = {[styles.textDiscount, {color: applyDiscount ? '#82f005ff' : '#444'}]}> Apply Discount? {applyDiscount ? "YES" : "NO"} </Text>
          <Switch value={applyDiscount} onValueChange={()=>setApplyDiscount(!applyDiscount)}/>
        </View>

        <Pressable
        onPress={calculateButton}
        style={({pressed}) => [
          styles.calculateButton,
          {backgroundColor: pressed ? '#1233d7ff' : '#87abe3ff'}
        ]}>
          <Text style = {styles.calculateButtonText}> Calculate </Text>
        </Pressable>

        <Pressable
        onPress={pickImage}
        style={({pressed}) => [
          styles.buttonImage,
          {backgroundColor: pressed? '#80ff1fff' : '#fff'}
        ]}>
          <Text style = {styles.imageText}> Capture </Text>
        </Pressable>
        {selectedImage && (
        <Image
        source={{ uri: selectedImage }}
        style={{ width: 120, height: 120, borderRadius: 15, marginTop: 10 }}/>
        )}
        </View>

        {showResult ? (
          <View style  = {styles.outputContainer}>
            <Text style = {styles.textOutput}> {summaryMessage} </Text>
          </View>
        ) : (
          <Text style = {styles.textMessage}> {message} </Text>
        )}

      
    </View>
  )
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    color: '#0c0505ff',
   
    

    

  },

  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    includeFontPadding: true,
    textTransform: 'capitalize',
    


  },

  shopForm: {
    borderWidth: 1,
    marginTop: 20,
    width: '85%',
    height: 330,
    borderRadius: 30,
    borderStyle: 'solid',
    alignItems: 'center'

  },

  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 1,
    fontSize: 16,
    borderColor: '#17f6ebff'

  },

  discountForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
   

  },

  textDiscount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 1,

    

  },

  calculateButton: {
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: '#ffff',
    width: '85%',
    alignItems: 'center',
    borderRadius: 30,
    
    
   

  },

 

  calculateButtonText: {
    fontSize: 16,
    fontWeight: 'bold'

  },

  buttonImage: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#9efa15ff',
    marginTop: 100,
    width: 80,
    height: 80,
    alignItems: 'center',
    alignContent: 'center',



  },

  imageText: {
    fontSize: 16,
    marginTop: 20,
    
    
    
  },

  outputContainer: {
    flex: 1,

  },

  textOutput: {
    fontSize: 14,
    fontStyle: 'italic',
    

  },

  textMessage: {
    color: '#444',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',

  },


})