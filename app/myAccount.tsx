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
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function MyAccountScreen() {
  const MenuItem = ({ icon, title, iconColor = "#333", onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconCircle]}>
        {icon}
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.roundButton} onPress={()=>{router.back()}}>
            <Ionicons name="chevron-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity style={styles.roundButton}>
            <Feather name="more-horizontal" size={20} />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>Vishal Khadok</Text>
            <Text style={styles.userBio}>I love fast food</Text>
          </View>
        </View>

        {/* Card Section 1 */}
        <View style={styles.card}>
          <MenuItem
            title="Personal Info"
            icon={<Feather name="user" size={18} color="#FF6A3D" />}
            onPress={()=>{router.push("/personal-Info")}}
          />
          <MenuItem
            title="Addresses"
            icon={<Feather name="map" size={18} color="#5A67FF" />}
            onPress={()=>router.push("/addressList")}
          />
        </View>

        {/* Card Section 2 */}
        <View style={styles.card}>
          <MenuItem
            title="Cart"
            icon={<Feather name="shopping-bag" size={18} color="#4A90E2" />}
          />
          <MenuItem
            title="Favourite"
            icon={<Feather name="heart" size={18} color="#A855F7" />}
          />
          <MenuItem
            title="Notifications"
            icon={<Feather name="bell" size={18} color="#F59E0B" />}
          />
          <MenuItem
            title="Payment Method"
            icon={<Feather name="credit-card" size={18} color="#3B82F6" />}
          />
        </View>

        {/* Card Section 3 */}
        <View style={styles.card}>
          <MenuItem
            title="FAQs"
            icon={<Feather name="help-circle" size={18} color="#FF6A3D" />}
          />
          <MenuItem
            title="User Reviews"
            icon={<Feather name="grid" size={18} color="#14B8A6" />}
          />
          <MenuItem
            title="Settings"
            icon={<Feather name="settings" size={18} color="#6366F1" />}
          />
        </View>

        {/* Logout */}
        <View style={styles.card}>
          <MenuItem
            title="Log Out"
            icon={<MaterialIcons name="logout" size={18} color="#EF4444" />}
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
    marginBottom: height * 0.025,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  menuText: {
    flex: 1,
    fontSize: width * 0.04,
  },
});
