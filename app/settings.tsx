import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import { userDataClear } from "@/Redux/Actions/UserAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_CONSTANTS } from "@/constants/apiConstants";

/* ---------------- ICON MAP ---------------- */

const ICONS = {
  help: require("../assets/images/icons/help-support.png"),
  editProfile: require("../assets/images/icons/edit-profile.png"),
  address: require("../assets/images/icons/address-pin.png"),
  // orders: require("../assets/images/icons/help-support.png"),
  terms: require("../assets/images/icons/terms.png"),
  privacy: require("../assets/images/icons/privacy.png"),
  delete: require("../assets/images/icons/delete-account.png"),
  logout: require("../assets/images/icons/logout.png"),
};

/* ---------------- SCREEN ---------------- */

export default function SettingsScreen() {
  const { isLogin, token } = useDetailHooks();
  const dispatch = useDispatch();

  const SETTINGS = [

    { label: "Profile", icon: ICONS.editProfile, action: "Profile", visible: isLogin },

    { label: "My Addresses", icon: ICONS.address, action: "address", visible: isLogin },

    // { label: "My Orders", icon: ICONS.orders, action: "orders", visible: isLogin },

    { label: "Help & Support", icon: ICONS.help, action: "support", visible: true },

    { label: "Terms & Conditions", icon: ICONS.terms, action: "condition", visible: true },

    { label: "Privacy Policy", icon: ICONS.privacy, action: "policy", visible: true },

    { label: "Delete Account", icon: ICONS.delete, action: "delete", visible: isLogin },

    // Show Logout if logged in
    { label: "Logout", icon: ICONS.logout, action: "logout", visible: isLogin },

    // Show Login if NOT logged in
    { label: "Login", icon: ICONS.logout, action: "login", visible: !isLogin },
  ];

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(userDataClear());
            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  /* ---------------- DELETE ACCOUNT ---------------- */

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.post(
                API_CONSTANTS.deleteUser || "https://api.egmealplan.com/api/mobile/auth/delete-user",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              await AsyncStorage.clear();
              dispatch(userDataClear());

              router.replace("/login");
            } catch (error: any) {
              console.log("DELETE ERROR:", error?.response?.data);
              Alert.alert("Error", "Unable to delete account. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  /* ---------------- HANDLE PRESS ---------------- */

  const handlePress = async (action?: string) => {
    if (!action) return;

    if (action === "Profile") {
      router.push("/profile");
      return;
    }

    if (action === "condition") {
      router.push("/termsAndCondition");
      return;
    }

    if (action === "support") {
      const url = "https://wa.me/+97433964245?text=Hi!%20I%20need%20support";
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed/Supported");
      }
      return;
    }

    if (action === "address") {
      router.push("/addressList");
      return;
    }

    if (action === "policy") {
      router.push("/privacyPolicy");
      return;
    }

    if (action === "logout") {
      handleLogout();
      return;
    }

    if (action === "login") {
      router.push("/login");
      return;
    }

    if (action === "delete") {
      handleDeleteAccount();
      return;
    }
  };

  /* ---------------- UI ---------------- */

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
          {SETTINGS.map(
            (item, index) =>
              item.visible && (
                <Pressable
                  key={index}
                  style={styles.row}
                  onPress={() => handlePress(item.action)}
                >
                  <Image source={item.icon} style={styles.rowIcon} />
                  <AppText style={styles.rowText}>{item.label}</AppText>
                </Pressable>
              )
          )}
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
