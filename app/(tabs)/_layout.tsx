import Colors from "@/constants/colors";
import { Tabs } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none", // ✅ IMPORTANT: no animation inside tabs
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

/* ---------------- CUSTOM TAB BAR ---------------- */

function CustomTabBar({ state, navigation }: any) {
  const tabs = [
    {
      name: "wishlist",
      label: "Wishlist",
      icon: require("../../assets/images/icons/heart.png"),
    },
    {
      name: "explore",
      label: "Explore",
      icon: require("../../assets/images/icons/bag.png"),
    },
    {
      name: "index",
      label: "Home",
      icon: require("../../assets/images/icons/home.png"),
      center: true,
    },
    {
      name: "cart",
      label: "Cart",
      icon: require("../../assets/images/icons/cart-2.png"),
    },
    {
      name: "profile",
      label: "Profile",
      icon: require("../../assets/images/icons/profile.png"),
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        const focused = state.index === index;

        return (
          <Pressable
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={[styles.tabItem, tab.center && styles.centerItem]}
          >
            <Image
              source={tab.icon}
              style={[
                tab.center ? styles.homeIcon : styles.icon,
                { tintColor: focused ? Colors.accent : Colors.softPink },
              ]}
            />

            <Text
              style={[
                styles.label,
                {
                  color: focused ? Colors.accent : Colors.softPink,
                  fontWeight: focused ? "600" : "400",
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: Colors.bg,
    borderTopWidth: 0.5,
    borderTopColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerItem: {},
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 2,
  },
  homeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
  },
});
