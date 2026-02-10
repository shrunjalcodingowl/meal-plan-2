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
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------- DATE DATA ---------------- */

const DATES = [
  { day: "Tue", date: "06" },
  { day: "Tue", date: "07" },
  { day: "Wed", date: "08" },
  { day: "Thu", date: "09" },
  { day: "Fri", date: "10" },
  { day: "Sat", date: "11" },
  { day: "Sun", date: "12" },
  { day: "Mon", date: "13" },
  { day: "Tue", date: "14" },
  { day: "Wed", date: "15" },
];

/* ---------------- MEAL DATA ---------------- */

const MEALS: Record<
  string,
  {
    type: string;
    title: string;
    desc: string;
    image: any;
  }[]
> = {
  "09": [
    {
      type: "Breakfast",
      title: "Tiramisu Pudding",
      desc:
        "Focused On High-Protein And Low-Carb Ingredients To Jumpstart Your Metabolism And Support A Sustainable, Healthy Weight Loss Journey.",
      image: require("../assets/images/plan-2-1.png"),
    },
    {
      type: "Lunch",
      title: "Tiramisu Pudding",
      desc:
        "Focused On High-Protein And Low-Carb Ingredients To Jumpstart Your Metabolism And Support A Sustainable, Healthy Weight Loss Journey.",
      image: require("../assets/images/plan-1-1.png"),
    },
    {
      type: "Snacks",
      title: "Protein Bowl",
      desc:
        "A Balanced Snack Rich In Protein And Essential Nutrients.",
      image: require("../assets/images/plan-2-1.png"),
    },
  ],
};

/* ---------------- SCREEN ---------------- */

export default function OrderHistoryScreen() {
  const [activeDate, setActiveDate] = useState("09");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/icons/back-2.png")}
              style={styles.headerIcon}
            />
          </Pressable>

          <AppText variant="medium" style={styles.headerTitle}>
            Clean & Lean - Full Day
          </AppText>

          <View style={{ width: 44 }} />
        </View>

        {/* ---------------- BANNER ---------------- */}
        <View style={styles.banner}>
          <Image
            source={require("../assets/images/icons/food.png")}
            style={styles.bannerIcon}
          />
          <View>
            <AppText variant="semiBold" style={styles.bannerTitle}>
              Wow! You made it
            </AppText>
            <AppText style={styles.bannerText}>
              Manage your daily Meal plan Here. Enjoy!
            </AppText>
          </View>
        </View>

        {/* ---------------- DATE PICKER ---------------- */}
        <View style={styles.dateRow}>
          <Image
            source={require("../assets/images/icons/back.png")}
            style={styles.chevron}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATES}
            keyExtractor={(item) => item.date}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => {
              const active = item.date === activeDate;
              return (
                <Pressable
                  onPress={() => setActiveDate(item.date)}
                  style={[
                    styles.dateItem,
                    active && styles.dateActive,
                  ]}
                >
                  <AppText
                    style={[
                      styles.dayText,
                      active && styles.dayActive,
                    ]}
                  >
                    {item.day}
                  </AppText>
                  <AppText
                    variant="semiBold"
                    style={[
                      styles.dateText,
                      active && styles.dateActiveText,
                    ]}
                  >
                    {item.date}
                  </AppText>
                </Pressable>
              );
            }}
          />

          <Image
            source={require("../assets/images/icons/right.png")}
            style={styles.chevron}
          />
        </View>

        {/* ---------------- MEALS ---------------- */}
        <View style={styles.meals}>
          {(MEALS[activeDate] || []).map((meal, index) => (
            <Pressable
              key={index}
              onPress={() => router.push("/order-details")}
              style={styles.mealCard}
            >
              <View style={styles.mealImageBox}>
                <Image source={meal.image} style={styles.mealImage} />

                <Pressable style={styles.editBtn}>
                  <Image
                    source={require("../assets/images/icons/edit-2.png")}
                    style={styles.editIcon}
                  />
                </Pressable>

                <View style={styles.mealTag}>
                  <AppText style={styles.mealTagText}>
                    {meal.type}
                  </AppText>
                </View>
              </View>

              <View style={styles.mealBody}>
                <AppText variant="semiBold" style={styles.mealTitle}>
                  {meal.title}
                </AppText>
                <AppText style={styles.mealDesc}>{meal.desc}</AppText>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  headerIcon: { width: 44, height: 44 },
  headerTitle: { fontSize: 16, color: Colors.textPrimary2 },

  banner: {
    flexDirection: "row",
    backgroundColor: "#EC9B62",
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 16,
  },
  bannerIcon: { width: 40, height: 40, marginRight: 14 },
  bannerTitle: { color: "#fff", fontSize: 15 },
  bannerText: { color: "#fff", fontSize: 13, marginTop: 2 },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  chevron: { width: 20, height: 20 },

  dateItem: {
    width: 56,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  dateActive: { backgroundColor: "#EC9B62" },
  dayText: { fontSize: 12, color: Colors.textMuted2 },
  dayActive: { color: "#fff" },
  dateText: { fontSize: 17, color: Colors.textPrimary2 },
  dateActiveText: { color: "#fff" },

  meals: { paddingHorizontal: 16 },

  mealCard: { marginBottom: 20 },
  mealImageBox: { position: "relative" },
  mealImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
  },
  editBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  editIcon: { width: 14, height: 14 },

  mealTag: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mealTagText: { fontSize: 11, color: Colors.textPrimary2 },

  mealBody: { marginTop: 8 },
  mealTitle: { fontSize: 16, color: Colors.textPrimary2 },
  mealDesc: { fontSize: 12, color: Colors.textMuted2 },
});
