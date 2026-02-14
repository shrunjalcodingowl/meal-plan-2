import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------- ICON MAP ---------------- */

const ICONS = {
  help: require("../assets/images/icons/help-support.png"),
  orders: require("../assets/images/icons/help-support.png"),
  editProfile: require("../assets/images/icons/edit-profile.png"),
  address: require("../assets/images/icons/address-pin.png"),
  invitation: require("../assets/images/icons/invitation.png"),
  rate: require("../assets/images/icons/rate-star.png"),
  account: require("../assets/images/icons/account-user.png"),
  terms: require("../assets/images/icons/terms.png"),
  privacy: require("../assets/images/icons/privacy.png"),
  delete: require("../assets/images/icons/delete-account.png"),
  logout: require("../assets/images/icons/logout.png"),
};

/* ---------------- DATA ---------------- */

type ActionType = "orders" | "editProfile" | "logout" | "myAccount" | "address" | undefined;

const SETTINGS: {
  label: string;
  icon: any;
  action?: ActionType;
}[] = [
  { label: "Help & Support", icon: ICONS.help },
  { label: "My Orders", icon: ICONS.orders, action: "orders" },
  { label: "Edit Profile", icon: ICONS.editProfile, action: "editProfile"},
  { label: "My Addresses", icon: ICONS.address, action: "address" },
  { label: "Follow US", icon: ICONS.invitation },
  { label: "Rate Us", icon: ICONS.rate },
  { label: "About", icon: ICONS.account, action: "myAccount" },
  { label: "Terms & Conditions", icon: ICONS.terms },
  { label: "Privacy Policy", icon: ICONS.privacy },
  { label: "Delete Account", icon: ICONS.delete },
  { label: "Logout", icon: ICONS.logout, action: "logout" },
];

/* ---------------- SCREEN ---------------- */

export default function SettingsScreen() {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => router.replace("/welcome"),
        },
      ],
      { cancelable: true }
    );
  };

  const handlePress = (action?: ActionType) => {
    if (!action) return;

    if (action === "orders") {
      router.push("/my-orders");
      return;
    }
    if(action === "editProfile"){
      router.push("/editProfile")
      return;
    }
    
    if(action === "myAccount"){
      router.push("/myAccount")
      return;
    }
    
    if(action === "address"){
      router.push("/addressList")
      return;
    }

    if (action === "logout") {
      handleLogout();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/icons/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>

          <AppText variant="medium" style={styles.headerTitle}>
            Settings
          </AppText>
        </View>

        <View style={styles.list}>
          {SETTINGS.map((item, index) => (
            <Pressable
              key={index}
              style={styles.row}
              onPress={() => handlePress(item.action)}
            >
              <Image source={item.icon} style={styles.rowIcon} />
              <AppText style={styles.rowText}>{item.label}</AppText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    marginBottom: 10,
  },
  menuIcon: {
    width: 45,
    height: 45,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 19,
    color: Colors.textPrimary2,
  },

  list: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  rowIcon: {
    width: 26,
    height: 26,
    marginRight: 18,
    resizeMode: "contain",
  },
  rowText: {
    fontSize: 16,
    color: Colors.textPrimary2,
  },
});
