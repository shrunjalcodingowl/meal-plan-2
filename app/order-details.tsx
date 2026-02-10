import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/icons/back-2.png")}
              style={styles.backIcon}
            />
          </Pressable>

          <AppText variant="medium" style={styles.headerTitle}>
            Breakfast
          </AppText>

          <View style={{ width: 44 }} />
        </View>

        {/* ---------------- IMAGE ---------------- */}
        <Image
          source={require("../assets/images/plan-2-1.png")}
          style={styles.mainImage}
        />

        {/* ---------------- TITLE + ACTION ---------------- */}
        <View style={styles.titleRow}>
          <AppText variant="semiBold" style={styles.mealTitle}>
            Tiramisu Pudding
          </AppText>

          <Pressable style={styles.swapBtn}>
            <AppText style={styles.swapText}>Swap This Meal</AppText>
          </Pressable>
        </View>

        {/* ---------------- DESCRIPTION ---------------- */}
        <AppText style={styles.desc}>
          Focused On High-Protein And Low-Carb Ingredients To Jumpstart Your
          Metabolism And Support A Sustainable, Healthy Weight Loss Journey.
          Focused On High-Protein And Low-Carb Ingredients To Jumpstart Your
          Metabolism And Support A Sustainable, Healthy Weight Loss Journey.
        </AppText>

        {/* ---------------- NUTRITION ---------------- */}
        <View style={styles.nutritionBox}>
          <AppText variant="medium" style={styles.nutritionTitle}>
            NUTRITIONAL VALUES
          </AppText>

          <View style={styles.nutritionRow}>
            {[
              { label: "Calories", value: "480 Kcal" },
              { label: "Protein", value: "22 G" },
              { label: "Carbs", value: "55 G" },
              { label: "Fat", value: "18 G" },
              { label: "Fiber", value: "12 G" },
              { label: "Sugar", value: "8 G" },
            ].map((item) => (
              <View key={item.label} style={styles.nutritionItem}>
                <AppText style={styles.nutritionLabel}>
                  {item.label}
                </AppText>
                <AppText style={styles.nutritionValue}>
                  {item.value}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* ---------------- SPECIAL REQUEST ---------------- */}
        <View style={styles.requestHeader}>
          <Image
            source={require("../assets/images/icons/req.png")}
            style={styles.requestIcon}
          />
          <AppText style={styles.requestTitle}>
            Special Request
          </AppText>
        </View>

        <View style={styles.requestBox}>
          <TextInput
            placeholder="Have Any Special Requests For This Meal? Type Here..."
            placeholderTextColor={Colors.textMuted2}
            multiline
            style={styles.requestInput}
          />

          <Pressable style={styles.sendBtn}>
            <Image
              source={require("../assets/images/icons/send.png")}
              style={styles.sendIcon}
            />
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
  backIcon: { width: 44, height: 44 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: Colors.textPrimary2,
  },

  mainImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  mealTitle: {
    fontSize: 18,
    color: Colors.textPrimary2,
  },

  swapBtn: {
    backgroundColor: "#0E1E24",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  swapText: { fontSize: 12, color: "#fff" },

  desc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginBottom: 16,
  },

  nutritionBox: {
    backgroundColor: "#0E1E24",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  nutritionTitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13,
  },
  nutritionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nutritionItem: {
    width: "30%",
    backgroundColor: "#9DB8A0",
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  nutritionLabel: { fontSize: 11, color: Colors.textPrimary2 },
  nutritionValue: { fontSize: 11, color: Colors.textPrimary2 },

  requestHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requestIcon: { width: 16, height: 16, marginRight: 6 },
  requestTitle: { fontSize: 13, color: Colors.accent },

  requestBox: {
    backgroundColor: "#F2F5EE",
    borderRadius: 14,
    padding: 12,
    minHeight: 90,
    position: "relative",
  },
  requestInput: {
    fontSize: 12,
    color: Colors.textPrimary2,
    paddingRight: 40,
  },
  sendBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#0E1E24",
    padding: 8,
    borderRadius: 16,
  },
  sendIcon: { width: 14, height: 14, tintColor: "#fff" },
});
