import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function MyAddressScreen() {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "HOME",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      icon: "home",
      color: "#3B82F6",
    },
    {
      id: "2",
      type: "WORK",
      address: "3891 Ranchview Dr. Richardson, California 62639",
      icon: "briefcase",
      color: "#A855F7",
    },
  ]);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <Feather name={item.icon} size={20} color={item.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}
        onPress={()=>{router.push("/addAddress")}}
        >
          <Feather name="edit-2" size={18} color="#FF7A1A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleDelete(item.id)}
        >
          <Feather name="trash-2" size={18} color="#FF4D4F" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.roundButton}
        onPress={()=>{router.back()}}
        >
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Address</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: height * 0.15 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "600",
  },

  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#EDEFF2",
    marginHorizontal: width * 0.06,
    marginBottom: height * 0.02,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftSection: {
    flexDirection: "row",
    flex: 1,
  },

  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  type: {
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: 4,
  },

  address: {
    fontSize: width * 0.035,
    color: "#777",
  },

  actions: {
    flexDirection: "row",
  },

  actionBtn: {
    marginLeft: 12,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#FF7A1A",
    width: width * 0.88,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
