import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "ongoing" | "history";

export default function MyOrdersScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("ongoing");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/icons/back-2.png")}
              style={styles.backIcon}
            />
          </Pressable>

          <AppText variant="medium" style={styles.headerTitle}>
            My Orders
          </AppText>

          <View style={{ width: 45 }} />
        </View>

        {/* SEGMENTS */}
        <View style={styles.tabs}>
          <Pressable style={styles.tab} onPress={() => setActiveTab("ongoing")}>
            <AppText
              style={[
                styles.tabText,
                activeTab === "ongoing" && styles.tabTextActive,
              ]}
            >
              Ongoing
            </AppText>
            {activeTab === "ongoing" && <View style={styles.tabLine} />}
          </Pressable>

          <Pressable style={styles.tab} onPress={() => setActiveTab("history")}>
            <AppText
              style={[
                styles.tabText,
                activeTab === "history" && styles.tabTextActive,
              ]}
            >
              History
            </AppText>
            {activeTab === "history" && <View style={styles.tabLine} />}
          </Pressable>
        </View>

        <AppText variant="medium" style={styles.sectionTitle}>
          Subscription & Shop
        </AppText>

        {/* ---------------- ONGOING ---------------- */}
        {activeTab === "ongoing" && (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image
                source={require("../assets/images/plan-1.png")}
                style={styles.planImg}
              />

              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <AppText variant="medium" style={styles.planTitle}>
                    Clean & Lean 1200Kcal
                  </AppText>
                  <AppText style={styles.orderId}>#162432</AppText>
                </View>

                <AppText style={styles.price}>
                  4998.0 QAR{" "}
                  <AppText style={styles.meta}>| 02 Items</AppText>
                </AppText>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.primaryBtn}
                onPress={() => router.push("../order-history")}
              >
                <AppText style={styles.primaryText}>Track Order</AppText>
              </Pressable>

              <Pressable style={styles.outlineBtn}>
                <AppText style={styles.outlineText}>Cancel</AppText>
              </Pressable>
            </View>
          </View>
        )}

        {/* ---------------- HISTORY ---------------- */}
        {activeTab === "history" && (
          <>
            <View style={styles.card}>
              <View style={styles.row}>
                <Image
                  source={require("../assets/images/plan-1.png")}
                  style={styles.planImg}
                />

                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <AppText variant="medium" style={styles.planTitle}>
                      Clean & Lean 1200Kcal
                    </AppText>
                    <AppText style={styles.orderId}>#162432</AppText>
                  </View>

                  <AppText style={styles.price}>
                    4998.0 QAR{" "}
                    <AppText style={styles.meta}>
                      | Ordered on 07/01/2026
                    </AppText>
                  </AppText>
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={[styles.primaryBtn, styles.darkBtn]}
                  onPress={() => router.push("../order-history")}
                >
                  <AppText style={[styles.primaryText, styles.darkText]}>
                    Check Order
                  </AppText>
                </Pressable>

                <Pressable style={styles.outlineBtn}>
                  <AppText style={styles.outlineText}>Rate</AppText>
                </Pressable>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.row}>
                <Image
                  source={require("../assets/images/plan-2.png")}
                  style={styles.planImg}
                />

                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <AppText variant="medium" style={styles.planTitle}>
                      Detox + Glow 1-Day Kit
                    </AppText>
                    <AppText style={styles.orderId}>#242432</AppText>
                  </View>

                  <AppText style={styles.price}>
                    196.0 QAR{" "}
                    <AppText style={styles.meta}>
                      | Ordered on 07/01/2026
                    </AppText>
                  </AppText>
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={[styles.primaryBtn, styles.darkBtn]}
                  onPress={() => router.push("../order-history")}
                >
                  <AppText style={[styles.primaryText, styles.darkText]}>
                    Check Order
                  </AppText>
                </Pressable>

                <Pressable style={styles.outlineBtn}>
                  <AppText style={styles.outlineText}>Rate</AppText>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { paddingHorizontal: 16, paddingBottom: 32 },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backIcon: { width: 45, height: 45 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textPrimary2,
  },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    marginBottom: 18,
  },
  tab: { flex: 1, alignItems: "center", paddingBottom: 10 },
  tabText: { color: Colors.textMuted2 },
  tabTextActive: { color: Colors.accent },
  tabLine: {
    marginTop: 6,
    width: 40,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },

  sectionTitle: {
    fontSize: 14,
    color: Colors.textPrimary2,
    marginBottom: 14,
  },

  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  row: { flexDirection: "row", marginBottom: 14 },
  planImg: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  planTitle: { fontSize: 14, color: Colors.textPrimary2 },
  orderId: { fontSize: 12, color: Colors.textMuted2 },

  price: { fontSize: 13, color: Colors.textPrimary2 },
  meta: { fontSize: 12, color: Colors.textMuted2 },

  actions: { flexDirection: "row", justifyContent: "space-between" },
  primaryBtn: {
    flex: 1,
    backgroundColor: Colors.softGreen,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  darkBtn: { backgroundColor: "#0E1E24" },
  primaryText: { color: Colors.textPrimary2, fontSize: 14 },
  darkText: { color: "#fff" },

  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0E1E24",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  outlineText: { fontSize: 14, color: Colors.textPrimary2 },
});
