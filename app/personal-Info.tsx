import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function PersonalInfoScreen() {
  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconCircle}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="chevron-back" size={22} onPress={()=> router.back()} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Personal Info</Text>

          <TouchableOpacity onPress={()=> router.push("/editProfile")}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        {/* User Section */}
        <View style={styles.userSection}>
          <View style={styles.avatar} />

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>Vishal Khadok</Text>
            <Text style={styles.userBio}>I love fast food</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <InfoRow
            label="FULL NAME"
            value="Vishal Khadok"
            icon={<Feather name="user" size={18} color="#FF6A3D" />}
          />

          <InfoRow
            label="EMAIL"
            value="hello@halallab.co"
            icon={<Feather name="mail" size={18} color="#5A67FF" />}
          />

          <InfoRow
            label="PHONE NUMBER"
            value="408-841-0926"
            icon={<Feather name="phone" size={18} color="#3B82F6" />}
          />
        </View>
      </ScrollView>
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
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "600",
  },

  editText: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#FF7A1A",
  },

  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.06,
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
  },

  avatar: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: "#E6B199",
  },

  userName: {
    fontSize: width * 0.05,
    fontWeight: "600",
  },

  userBio: {
    fontSize: width * 0.035,
    color: "#888",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#EDEFF2",
    borderRadius: 18,
    paddingVertical: 10,
    marginHorizontal: width * 0.06,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  label: {
    fontSize: width * 0.035,
    letterSpacing: 1,
    color: "#777",
  },

  value: {
    fontSize: width * 0.04,
    marginTop: 3,
  },
});
