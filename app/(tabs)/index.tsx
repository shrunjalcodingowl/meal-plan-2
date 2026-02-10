import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { useState } from "react";
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

/* ---------------- DATA ---------------- */

const MEAL_PLANS = [
  {
    id: "1",
    name: "Clean & Lean",
    kcal: "1200 Kcal",
    image: require("../../assets/images/plan-1.png"),
  },
  {
    id: "2",
    name: "Pure Nourish",
    kcal: "1800 Kcal",
    image: require("../../assets/images/plan-2.png"),
  },
  {
    id: "3",
    name: "Athletic Pro",
    kcal: "1500 Kcal",
    image: require("../../assets/images/plan-3.png"),
  },
];

const PRODUCTS = Array.from({ length: 5 }).map((_, i) => ({
  id: `${i}`,
  name: "Detox + Glow 1-Day Kit",
  price: "QAR 478",
  desc:
    "A concentrated one-day program combining detoxifying internal juices with external skin treatments.",
  image: require("../../assets/images/product-1.png"),
}));

/* ---------------- SCREEN ---------------- */

export default function HomeScreen() {
  const [search, setSearch] = useState("");

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
                Home
              </AppText>
            </View>
            <AppText style={styles.addressText}>
              Villa No 13, Oraiq Street, Al Wakrah, Doha - Qatar
            </AppText>
          </View>

          <Pressable onPress={() => router.push("/cart")}>
            <Image
              source={require("../../assets/images/icons/cart.png")}
              style={styles.icon45}
            />
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>2</AppText>
            </View>
          </Pressable>
        </View>

        {/* SEARCH */}
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
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Image
                source={require("../../assets/images/icons/close.png")}
                style={styles.icon20}
              />
            </Pressable>
          )}
        </View>

        {/* CHIPS */}
        <View style={styles.chips}>
          <View style={[styles.chip, styles.chipActive]}>
            <AppText style={styles.chipActiveText}>Meal Plan</AppText>
          </View>
          <View style={styles.chip}>
            <AppText style={styles.chipText}>Shop</AppText>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <Image
            source={require("../../assets/images/banner-1.png")}
            style={styles.bannerImg}
          />
          <View style={styles.bannerOverlay}>
            <AppText variant="bold" style={styles.bannerTitle}>
              Special Offer for Veganuary
            </AppText>
            <AppText style={styles.bannerDesc}>
              We are here with the Best Vegan Food in town.
            </AppText>
            <Pressable style={styles.bannerBtn}>
              <AppText style={styles.bannerBtnText}>
                Subscribe Now
              </AppText>
            </Pressable>
          </View>
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
          <AppText style={styles.seeAll}>See all ›</AppText>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MEAL_PLANS}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.planCard}>
              <Image source={item.image} style={styles.planImg} />
              <AppText style={styles.planName}>{item.name}</AppText>
              <AppText style={styles.planKcal}>{item.kcal}</AppText>
            </View>
          )}
        />

        {/* PRODUCTS */}
        <View style={[styles.sectionHeader, styles.newArrivalHeader]}>
          <AppText variant="semiBold" style={styles.titleText}>
            New Arrivals in shop
          </AppText>
          <AppText style={styles.seeAll}>See all ›</AppText>
        </View>

        {PRODUCTS.map((p) => (
          <View key={p.id} style={styles.product}>
            <Image source={p.image} style={styles.productImg} />
            <View style={{ flex: 1 }}>
              <AppText variant="medium" style={styles.productName}>
                {p.name}
              </AppText>
              <AppText style={styles.productDesc}>{p.desc}</AppText>
              <View style={styles.productBottom}>
                <AppText style={styles.price}>{p.price}</AppText>
                <Pressable style={styles.buyBtn}>
                  <AppText style={styles.buyText}>Buy Now</AppText>
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

/* ---------------- STYLES ---------------- */

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

  search: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchInput: { flex: 1, marginHorizontal: 8 },

  chips: { flexDirection: "row", gap: 12, marginBottom: 16 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Colors.chipBg,
  },
  chipActive: { backgroundColor: Colors.softPink },
  chipActiveText: { color: Colors.textPrimary2 },
  chipText: { color: Colors.textMuted2 },

  newArrivalHeader: {
    marginTop: 18, // 👈 gives breathing room above
  },

  banner: {
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },
  bannerImg: { width: "100%", height: "100%" },
  bannerOverlay: {
    position: "absolute",
    left: 16,
    bottom: 16,
    right: 16,
  },
  bannerTitle: { color: Colors.white, fontSize: 18 },
  bannerDesc: { color: Colors.white, fontSize: 12, marginVertical: 4 },
  bannerBtn: {
    backgroundColor: Colors.softPink,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: Colors.textPrimary2 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "flex-end",
  },
  titleText: { color: Colors.textPrimary2 },
  subtitleText: { color: Colors.textMuted2 },
  seeAll: { color: Colors.textMuted2 },

  planCard: { marginRight: 12 },
  planImg: { width: 140, height: 100, borderRadius: 14 },
  planName: { marginTop: 6, color: Colors.textPrimary2 },
  planKcal: { color: Colors.softPink },

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
