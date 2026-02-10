import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [qty, setQty] = useState(1);

  useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      router.replace("/(tabs)");
      return true; 
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [])
);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/settings")}>
            <Image
              source={require("../../assets/images/icons/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>

          <View style={styles.locationBox}>
            <AppText style={styles.deliverTo}>DELIVER TO</AppText>
            <View style={styles.locationRow}>
              <AppText variant="medium" style={styles.locationText}>
                Home - Al Wakrah
              </AppText>
              <Image
                source={require("../../assets/images/icons/chevron-down.png")}
                style={styles.chevron}
              />
            </View>
          </View>
        </View>

        {/* ---------------- TITLE ---------------- */}
        <View style={styles.titleRow}>
          <Image
            source={require("../../assets/images/icons/cart-meal.png")}
            style={styles.cartTitleIcon}
          />
          <AppText variant="semiBold" style={styles.pageTitle}>
            My Cart
          </AppText>
        </View>

        {/* ---------------- CART ITEM ---------------- */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/plan-1-1.png")}
            style={styles.cardImage}
          />

          <View style={styles.cardBody}>
            <View style={styles.planTitleRow}>
              <AppText variant="semiBold" style={styles.planTitle}>
                Clean & Lean{" "}
                <AppText style={styles.kcal}>1200Kcal</AppText>
              </AppText>

              <AppText style={styles.period}>QR / Monthly</AppText>
            </View>

            <AppText style={styles.desc}>
              Focused On High-Protein And Low-Carb Ingredients To Jumpstart Your
              Metabolism And Support A Sustainable, Healthy Weight Loss Journey.
            </AppText>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Image
                  source={require("../../assets/images/icons/delivery.png")}
                  style={styles.metaIcon}
                />
                <AppText style={styles.metaText}>Free</AppText>
              </View>

              <AppText variant="semiBold" style={styles.price}>
                2499.0 QAR
              </AppText>

              {/* SAME QTY AS PLAN DETAILS */}
              <View style={styles.qtyBox}>
                <Pressable
                  onPress={() => setQty((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  <AppText style={styles.qtyBtnText}>−</AppText>
                </Pressable>

                <AppText style={styles.qtyText}>{qty}</AppText>

                <Pressable
                  onPress={() => setQty((q) => q + 1)}
                  style={styles.qtyBtn}
                >
                  <AppText style={styles.qtyBtnText}>+</AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* ---------------- SUMMARY ---------------- */}
        <View style={styles.summaryBox}>
          <View style={styles.addressHeader}>
            <AppText style={styles.addressTitle}>DELIVERY ADDRESS</AppText>
            <AppText style={styles.editText}>EDIT</AppText>
          </View>

          <View style={styles.addressBox}>
            <AppText style={styles.addressText}>
              Villa No- 13, Al - Al Wakrah
            </AppText>
          </View>

          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>TOTAL:</AppText>

            <View style={styles.totalRight}>
              <AppText variant="semiBold" style={styles.totalPrice}>
                4998.0 QAR
              </AppText>
              <AppText style={styles.breakdown}>Breakdown ›</AppText>
            </View>
          </View>

          <Pressable style={styles.payBtn}>
            <AppText variant="medium" style={styles.payText}>
              PROCEED TO PAY
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { paddingHorizontal: 16, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  menuIcon: { width: 45, height: 45 },

  locationBox: { flex: 1, alignItems: "center" },
  deliverTo: { fontSize: 11, color: Colors.textMuted2 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  locationText: { color: Colors.accent },
  chevron: { width: 12, height: 12 },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  cartTitleIcon: { width: 22, height: 22 },
  pageTitle: { fontSize: 20, color: Colors.textPrimary2 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 18,
  },

  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  cardBody: { padding: 14 },

  planTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  planTitle: { fontSize: 16, color: Colors.textPrimary2 },
  kcal: { color: Colors.softPink },
  period: { fontSize: 12, color: Colors.textMuted2 },

  desc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginVertical: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaIcon: { width: 16, height: 16 },
  metaText: { fontSize: 12, color: Colors.textPrimary2 },

  price: { fontSize: 18, color: Colors.textPrimary2 },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E1E24",
    borderRadius: 22,
    paddingHorizontal: 12,
    height: 40,
  },
  qtyBtn: { paddingHorizontal: 10 },
  qtyBtnText: { color: "#fff", fontSize: 18 },
  qtyText: { color: "#fff", fontSize: 14, marginHorizontal: 8 },

  summaryBox: {
    backgroundColor: "#F2F5EE",
    borderRadius: 18,
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addressTitle: { fontSize: 12, color: Colors.textPrimary2 },
  editText: { fontSize: 12, color: Colors.accent },

  addressBox: {
    backgroundColor: "#EFF3F8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  addressText: { fontSize: 13, color: Colors.textMuted2 },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  totalLabel: { fontSize: 12, color: Colors.textPrimary2 },
  totalRight: { alignItems: "flex-end" },
  totalPrice: { fontSize: 18, color: Colors.textPrimary2 },
  breakdown: { fontSize: 12, color: Colors.textMuted2, marginTop: 2 },

  payBtn: {
    backgroundColor: "#0E1E24",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  payText: { color: "#fff", fontSize: 15 },
});
