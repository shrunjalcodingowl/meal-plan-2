import AppText from "@/components/AppText";
import {
  API_CONSTANTS,
  IMAGE_BASE_API2,
} from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------- SCREEN ---------------- */

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [is_cart, setCart] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<string>("");

  const { token } = useDetailHooks();

  /* ================= FETCH HOME ================= */

  const fetchHomeData = async () => {
    try {
      const response = await axios.post(API_CONSTANTS.homeData, {});
      const { data: mdata, status } = response || {};
      const { packages, is_cart } = mdata || {};

      if (status === 200) {
        setCart(is_cart === 0 ? false : true);
        setData(packages || []);
      }
    } catch (error: any) {
      console.log("HOME ERROR:", error?.response?.data);
    }
  };

  /* ================= FETCH ADDRESS ================= */

  const fetchAddress = async () => {
    try {
      const response = await axios.post(
        "https://api.egmealplan.com/api/mobile/address/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response || {};
      const addressList = data?.data || [];

      const defaultAddr = addressList.find(
        (addr: any) => addr.is_default === 1
      );

      if (defaultAddr) {
        setDefaultAddress(defaultAddr.address_line_1);
      }
    } catch (error: any) {
      console.log("ADDRESS ERROR:", error?.response?.data);
    }
  };

  /* ================= REFRESH ON TAB FOCUS ================= */

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
      if (token) {
        fetchAddress();
      }
    }, [token])
  );

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/settings")}>
            <Image
              source={require("../../assets/images/icons/menu.png")}
              style={styles.icon45}
            />
          </Pressable>

          <View style={styles.location}>
            <View style={styles.locationRow}>
              <Image
                source={require("../../assets/images/icons/location.png")}
                style={styles.icon15}
              />
              <AppText variant="semiBold" style={styles.homeText}>
                Location
              </AppText>
            </View>

            <AppText style={styles.addressText}>
              {defaultAddress || "Select Address"}
            </AppText>
          </View>

          <Pressable onPress={() => router.push("/(tabs)/cart")}>
            <Image
              source={require("../../assets/images/icons/cart.png")}
              style={styles.icon45}
            />
            {is_cart && (
              <View style={styles.badge}>
                <AppText style={styles.badgeText}></AppText>
              </View>
            )}
          </Pressable>
        </View>

        {/* SEARCH (COMMENTED AS REQUESTED) */}
        {/*
        <View style={styles.search}>
          <Image
            source={require("../../assets/images/icons/search.png")}
            style={styles.icon20}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="What do you want to have?"
            placeholderTextColor={Colors.textMuted2}
            style={styles.searchInput}
          />
        </View>
        */}

        {/* CHIPS (COMMENTED AS REQUESTED) */}
        {/*
        <View style={styles.chips}>
          <View style={[styles.chip, styles.chipActive]}>
            <AppText style={styles.chipActiveText}>Meal Plan</AppText>
          </View>
          <View style={styles.chip}>
            <AppText style={styles.chipText}>Shop</AppText>
          </View>
        </View>
        */}

        {/* BANNER */}
        <View style={styles.banner}>
          <Image
            source={require("../../assets/images/banner-1.png")}
            style={styles.bannerImg}
          />
        </View>

        {/* MEAL PLANS */}
        <View style={styles.sectionHeader}>
          <View>
            <AppText variant="semiBold" style={styles.titleText}>
              Your Organic Plans
            </AppText>
            <AppText style={styles.subtitleText}>
              Let’s explore the best plan for you!
            </AppText>
          </View>

          <Pressable onPress={() => router.push("/(tabs)/explore")}>
            <AppText style={styles.seeAll}>See all ›</AppText>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/plan-details",
                  params: { id: item.id },
                })
              }
              style={styles.planCard}
            >
              <Image
                source={{ uri: IMAGE_BASE_API2 + item.image }}
                style={styles.planImg}
              />
              <AppText style={styles.planName}>{item.name}</AppText>
              <AppText style={styles.planKcal}>{item.kcal}</AppText>
            </Pressable>
          )}
        />

        {/* NEW ARRIVALS */}
        <View style={[styles.sectionHeader, styles.newArrivalHeader]}>
          <AppText variant="semiBold" style={styles.titleText}>
            New Arrivals in shop
          </AppText>

          <Pressable onPress={() => router.push("/(tabs)/explore")}>
            <AppText style={styles.seeAll}>See all ›</AppText>
          </Pressable>
        </View>

        {data.map((item) => (
          <View key={item.id} style={styles.product}>
            <Image
              source={{ uri: IMAGE_BASE_API2 + item.image }}
              style={styles.productImg}
            />

            <View style={{ flex: 1 }}>
              <AppText variant="medium" style={styles.productName}>
                {item.name}
              </AppText>

              <AppText style={styles.productDesc}>
                {item.description || ""}
              </AppText>

              <View style={styles.productBottom}>
                <AppText style={styles.price}>
                  {item.price ? `${item.price} QAR` : ""}
                </AppText>

                <Pressable
                  style={styles.buyBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/plan-details",
                      params: { id: item.id },
                    })
                  }
                >
                  <AppText style={styles.buyText}>View</AppText>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES (UNCHANGED) ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingTop: 12,
  },

  location: { flex: 1, alignItems: "center" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 6 },

  homeText: { color: Colors.textPrimary2 },
  addressText: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginTop: 2,
    textAlign: "center",
  },

  icon45: { width: 45, height: 45 },
  icon20: { width: 20, height: 20 },
  icon15: { width: 15, height: 15 },

  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 10, color: "#fff" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "flex-end",
  },
  titleText: { color: Colors.textPrimary2 },
  subtitleText: { color: Colors.textMuted2 },
  seeAll: { color: Colors.textMuted2 },

  planCard: { marginRight: 12, width: 150 },
  planImg: { width: 140, height: 100, borderRadius: 14 },
  planName: { marginTop: 6, color: Colors.textPrimary2 },
  planKcal: { color: Colors.softPink },

  newArrivalHeader: { marginTop: 18 },

  banner: {
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },
  bannerImg: { width: "100%", height: "100%" },

  product: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginBottom: 14,
  },
  productImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  productName: { color: Colors.textPrimary2, marginBottom: 4 },
  productDesc: { color: Colors.textMuted2 },

  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: { color: Colors.softPink },
  buyBtn: {
    backgroundColor: Colors.softPink,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
  },
  buyText: { color: Colors.textPrimary2 },
});
