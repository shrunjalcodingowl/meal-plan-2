import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

/* ---------------- DATA ---------------- */

const PLANS = [
  {
    id: "1",
    title: "Clean & Lean",
    kcal: "1200Kcal",
    rating: "4.7",
    delivery: "Free",
    time: "20 min",
    image: require("../../assets/images/plan-1-1.png"),
  },
  {
    id: "2",
    title: "Pure Nourish",
    kcal: "1800Kcal",
    rating: "4.7",
    delivery: "Free",
    time: "20 min",
    image: require("../../assets/images/plan-2-1.png"),
  },
  {
    id: "3",
    title: "Clean & Lean",
    kcal: "1500Kcal",
    rating: "4.7",
    delivery: "Free",
    time: "20 min",
    image: require("../../assets/images/plan-3-1.png"),
  },
];

export default function WishlistScreen() {
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all");
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/settings")}>
            <Image
              source={require("../../assets/images/icons/menu.png")}
              style={styles.headerIcon}
            />
          </Pressable>

          {/* CENTER */}
          <View style={styles.headerCenter}>
            <AppText style={styles.deliverTo}>DELIVER TO</AppText>
            <View style={styles.locationRow}>
              <AppText variant="medium" style={styles.locationText}>
                Home - Al Wakrah
              </AppText>
              <Image
                source={require("../../assets/images/icons/chevron-down.png")}
                style={styles.icon12}
              />
            </View>
          </View>

          {/* CART */}
          <Pressable style={styles.cartWrapper}>
            <Image
              source={require("../../assets/images/icons/cart.png")}
              style={styles.headerIcon}
            />
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>2</AppText>
            </View>
          </Pressable>
        </View>

        {/* ---------------- SECTION HEADER ---------------- */}
        <View style={styles.sectionHeader}>
          <AppText variant="semiBold" style={styles.sectionTitle}>
            Your Wishlist
          </AppText>
        </View>

        {/* ---------------- PLANS ---------------- */}
        {PLANS.map((plan) => (
          <Pressable
            key={plan.id}
            onPress={() => router.push("/plan-details")}
            style={styles.planCard}
          >
            <Image source={plan.image} style={styles.planImage} />

            <View style={styles.planBody}>
              <AppText variant="semiBold" style={styles.planTitle}>
                {plan.title}{" "}
                <AppText style={styles.kcal}>{plan.kcal}</AppText>
              </AppText>

              <AppText style={styles.planDesc}>
                Focused on high-protein and low-carb ingredients to jumpstart
                your metabolism and support sustainable weight loss.
              </AppText>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Image
                    source={require("../../assets/images/icons/star.png")}
                    style={styles.metaIcon}
                  />
                  <AppText style={styles.metaText}>{plan.rating}</AppText>
                </View>

                <View style={styles.metaItem}>
                  <Image
                    source={require("../../assets/images/icons/delivery.png")}
                    style={styles.metaIcon}
                  />
                  <AppText style={styles.metaText}>{plan.delivery}</AppText>
                </View>

                <View style={styles.metaItem}>
                  <Image
                    source={require("../../assets/images/icons/clock.png")}
                    style={styles.metaIcon}
                  />
                  <AppText style={styles.metaText}>{plan.time}</AppText>
                </View>

                <Pressable style={styles.detailsBtn}>
                  <AppText style={styles.detailsText}>Remove</AppText>
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 49,
    marginBottom: 12,
  },

  headerCenter: { flex: 1, alignItems: "center" },
  deliverTo: { fontSize: 11, color: Colors.textMuted2 },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: { fontSize: 14, color: Colors.accent },

  greeting: {
    fontSize: 16,
    color: Colors.textPrimary2,
    marginBottom: 12,
  },

  cartWrapper: { position: "relative" },

  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 10, color: "#fff" },

  headerIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: Colors.textPrimary2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, color: Colors.textPrimary2 },

  chipsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFEFEF",
    gap: 10,
  },
  chipActive: { backgroundColor: Colors.softPink },
  chipText: { fontSize: 14, color: Colors.textMuted2 },
  chipTextActive: { color: Colors.textPrimary2 },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#000",
  },

  chooseTitle: {
    fontSize: 18,
    color: Colors.textPrimary2,
    marginBottom: 12,
  },

  planCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  planImage: { width: "100%", height: 160 },

  planBody: { padding: 14 },
  planTitle: { fontSize: 16, color: Colors.textPrimary2 },
  kcal: { color: Colors.softPink },

  planDesc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginVertical: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: { width: 16, height: 16, resizeMode: "contain" },
  metaText: { fontSize: 12, color: Colors.textPrimary2 },

  detailsBtn: {
    marginLeft: "auto",
    backgroundColor: Colors.softGreen,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsText: { fontSize: 12, color: Colors.textPrimary2 },

  icon20: { width: 20, height: 20 },
  icon18: { width: 18, height: 18 },
  icon16: { width: 16, height: 16 },
  icon12: { width: 12, height: 12 },
});
