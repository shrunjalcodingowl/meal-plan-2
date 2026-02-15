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

export default function SettingsScreen() {

  const { isLogin } = useDetailHooks();
  const SETTINGS = [
    { label: "Help & Support", icon: ICONS.help, action: "support", visible: true },
    { label: "My Orders", icon: ICONS.orders, action: "orders", visible: isLogin },
    { label: "Profile", icon: ICONS.editProfile, action: "Profile", visible: isLogin },
    { label: "My Addresses", icon: ICONS.address, action: "address", visible: isLogin },
    // { label: "Follow US", icon: ICONS.invitation },
    // { label: "Rate Us", icon: ICONS.rate },
    // { label: "About", icon: ICONS.account, action: "myAccount" },
    { label: "Terms & Conditions", icon: ICONS.terms, action: "condition", visible: true },
    { label: "Privacy Policy", icon: ICONS.privacy, action: "policy", visible: true },
    { label: "Delete Account", icon: ICONS.delete, visible: isLogin },
    { label: "Logout", icon: ICONS.logout, action: "logout", visible: isLogin },
  ];
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear()
            dispatch(userDataClear())
            router.replace("/login")
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handlePress = async (action?: ActionType) => {
    if (!action) return;

    if (action === "orders") {
      router.push("/my-orders");
      return;
    }

    if (action === "Profile") {
      router.push("/profile")
      return;
    }

    if (action === "condition") {
      router.push("/termsAndCondition")
      return;
    }

    if (action === "myAccount") {
      router.push("/myAccount")
      return;
    }

    if (action === "support") {
      const url = "https://wa.me/+97433964245?text=Hi!%20I%20need%20support"
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed/Supported");
      }
    }

    if (action === "address") {
      router.push("/addressList")
      return;
    }

    if (action === "policy") {
      router.push("/privacyPolicy")
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
            item.visible && (<Pressable
              key={index}
              style={styles.row}
              onPress={() => handlePress(item.action)}
            >
              <Image source={item.icon} style={styles.rowIcon} />
              <AppText style={styles.rowText}>{item.label}</AppText>
            </Pressable>)
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
