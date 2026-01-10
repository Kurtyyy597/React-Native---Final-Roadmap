import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

type Shoe = {
  id: number;
  name: string;
  creator: string;
  image: any;
  favorite: boolean;
};

export default function MapQuiz10() {
  const [shoes, setShoes] = useState<Shoe[]>([
    {
      id: 1,
      name: "Air Jordan 1",
      creator: "Nike",
      image: require("../../../Images/airjordan.jpg"),
      favorite: false,
    },
    {
      id: 2,
      name: "Yeezy 350",
      creator: "Adidas",
      image: require("../../../Images/airmax.jpg"),
      favorite: true,
    },
    {
      id: 3,
      name: "Converse High",
      creator: "Converse",
      image: require("../../../Images/chuck.jpg"),
      favorite: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCreator, setEditCreator] = useState("");
  const [editFavorite, setEditFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (shoe: Shoe) => {
    setSelectedId(shoe.id);
    setEditName(shoe.name);
    setEditCreator(shoe.creator);
    setEditFavorite(shoe.favorite);
    setModalVisible(true);
  };

  const saveChanges = () => {
    setShoes(prev =>
      prev.map(shoe =>
        shoe.id === selectedId
          ? {
              ...shoe,
              name: editName,
              creator: editCreator,
              favorite: editFavorite,
            }
          : shoe
      )
    );

    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={modalVisible ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={styles.container}>
        {shoes.map(shoe => (
          <Pressable
            key={shoe.id}
            style={styles.card}
            onPress={() => openModal(shoe)}
          >
            <Image source={shoe.image} style={styles.image} />
            <Text style={styles.name}>{shoe.name}</Text>
            <Text style={styles.creator}>{shoe.creator}</Text>
            <Text style={styles.favorite}>
              {shoe.favorite ? "⭐ Favorite" : "Not Favorite"}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrapper}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Shoe</Text>

              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Edit Name"
              />

              <TextInput
                style={styles.input}
                value={editCreator}
                onChangeText={setEditCreator}
                placeholder="Edit Creator"
              />

              <View style={styles.switchRow}>
                <Text style={{ fontSize: 18 }}>Favorite</Text>
                <Switch
                  value={editFavorite}
                  onValueChange={setEditFavorite}
                />
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  creator: {
    fontSize: 15,
    color: "#555",
  },
  favorite: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },

  // MODAL
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  closeBtn: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
