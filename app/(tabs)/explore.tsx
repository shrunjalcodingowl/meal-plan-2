import AppText from "@/components/AppText";
import { API_CONSTANTS, IMAGE_BASE_API2 } from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ExploreScreen() {
  const [filter, setFilter] =
    useState<"all" | "weekly" | "monthly">("all");
  const [allData, setAllData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [defaultAddress, setDefaultAddress] = useState("");

  const { token } = useDetailHooks();

  /* ================= FETCH ADDRESS ================= */

  const fetchAddress = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        API_CONSTANTS.addressList,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addressList = response?.data?.data || [];
      const defaultAddr = addressList.find(
        (addr: any) => Number(addr.is_default) === 1
      );

      if (defaultAddr) {
        setDefaultAddress(defaultAddr.address_line_1);
      }
    } catch (error) {
      console.log("Address fetch error");
    }
  };

  /* ================= FETCH PACKAGES ================= */

  const fetchExploreData = async () => {
    try {
      const response = await axios.post(
        API_CONSTANTS.exploreData,
        {},
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      );

      const { data, status } = response || {};
      const mdata = data?.data || [];

      if (status === 200) {
        setAllData(mdata);
        setFilterData(mdata);
      }
    } catch (error: any) {
      console.log("Explore fetch error:", error?.response?.data);
    }
  };

  /* ================= WISHLIST TOGGLE ================= */

  const toggleWishlist = async (id: number) => {
    // 🔐 If guest → go to login
    if (!token) {
      router.push("/login");
      return;
    }

    // Instant UI toggle
    const updatedData = allData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          is_wishlist:
            Number(item.is_wishlist) === 1 ? 0 : 1,
        };
      }
      return item;
    });

    setAllData(updatedData);
    applyFilter(filter, updatedData);

    try {
      await axios.post(
        API_CONSTANTS.wishlistAdd,
        { package_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Wishlist toggle failed");
    }
  };

  /* ================= FILTER ================= */

  const applyFilter = (
    key: "all" | "weekly" | "monthly",
    sourceData = allData
  ) => {
    setFilter(key);

    switch (key) {
      case "weekly":
        setFilterData(
          sourceData.filter(
            (item) => item.type === "weekly"
          )
        );
        break;
      case "monthly":
        setFilterData(
          sourceData.filter(
            (item) => item.type === "monthly"
          )
        );
        break;
      default:
        setFilterData(sourceData);
    }
  };

  /* ================= LIFECYCLE ================= */

  useFocusEffect(
    useCallback(() => {
      fetchExploreData();
      fetchAddress();
    }, [token])
  );

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/settings")}>
            <Image
              source={require("../../assets/images/icons/menu.png")}
              style={styles.headerIcon}
            />
          </Pressable>

          <View style={styles.headerCenter}>
            <AppText style={styles.deliverTo}>
              Location
            </AppText>
            <AppText
              variant="medium"
              style={styles.locationText}
            >
              {token
                ? defaultAddress || "Select Address"
                : "Guest User"}
            </AppText>
          </View>

          <Pressable
            onPress={() => router.push("/(tabs)/cart")}
          >
            <Image
              source={require("../../assets/images/icons/cart.png")}
              style={styles.headerIcon}
            />
          </Pressable>
        </View>

        {/* SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <AppText
            variant="semiBold"
            style={styles.sectionTitle}
          >
            Your Organic Plans
          </AppText>
        </View>

        {/* FILTER CHIPS */}
        <View style={styles.chipsRow}>
          {[
            { key: "all", label: "All" },
            { key: "weekly", label: "Weekly" },
            { key: "monthly", label: "Monthly" },
          ].map((item) => {
            const active = filter === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() =>
                  applyFilter(item.key as any)
                }
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
              >
                {active && <View style={styles.dot} />}
                <AppText
                  variant="medium"
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {item.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        {/* PLANS */}
        {filterData.map((plan) => {
          const isWishlisted =
            Number(plan.is_wishlist) === 1;

          return (
            <Pressable
              key={plan.id}
              onPress={() =>
                router.push({
                  pathname: "/plan-details",
                  params: { id: plan.id },
                })
              }
              style={styles.planCard}
            >
              <View>
                <Image
                  source={{
                    uri:
                      IMAGE_BASE_API2 +
                      plan.image,
                  }}
                  style={styles.planImage}
                />

                {/* HEART ICON */}
                <Pressable
                  style={styles.heartIcon}
                  onPress={() =>
                    toggleWishlist(plan.id)
                  }
                >
                  <Ionicons
                    name={
                      isWishlisted
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={
                      isWishlisted
                        ? "red"
                        : "black"
                    }
                  />
                </Pressable>
              </View>

              <View style={styles.planBody}>
                <AppText
                  variant="semiBold"
                  style={styles.planTitle}
                >
                  {plan.name}
                </AppText>

                <AppText style={styles.planDesc}>
                  {plan.description}
                </AppText>

                <AppText style={styles.price}>
                  {plan.price} QAR
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

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
  locationText: {
    fontSize: 14,
    color: Colors.accent,
  },

  headerIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  sectionHeader: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    color: Colors.textPrimary2,
  },

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
  chipActive: {
    backgroundColor: Colors.softPink,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textMuted2,
  },
  chipTextActive: {
    color: Colors.textPrimary2,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#000",
  },

  planCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  planImage: {
    width: "100%",
    height: 160,
  },

  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },

  planBody: { padding: 14 },
  planTitle: {
    fontSize: 16,
    color: Colors.textPrimary2,
  },
  planDesc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginTop: 6,
  },

  price: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.softPink,
    fontWeight: "600",
  },
});
