import AppText from "@/components/AppText";
import { API_CONSTANTS, IMAGE_BASE_API2 } from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [loading, setLoading] = useState(false);
  const [packageDetail, setPackageDetail] = useState<any>(null);
  const [addressDetail, setAddressDetail] = useState<any>(null);
  const { token } = useDetailHooks();

  /* ================= BACK HANDLER ================= */

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

  /* ================= FETCH CART ================= */

  const fetchCartList = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        API_CONSTANTS.cartList,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data, status } = response;
      const { data: mdata } = data || {};

      if (status === 200) {
        setAddressDetail(mdata?.address || null);
        setPackageDetail(mdata?.package || null);
      }
    } catch (error: any) {
      console.log("Cart Error:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= REMOVE CART ================= */

  const deleteCart = async () => {
    try {
      await axios.post(
        API_CONSTANTS.removeCart,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear UI immediately
      setPackageDetail(null);
      setAddressDetail(null);

      // Refetch to confirm
      fetchCartList();
    } catch (error: any) {
      console.log("Delete Cart Error:", error?.response?.data);
      Alert.alert("Error", "Unable to remove item.");
    }
  };

  /* ================= REFRESH ON TAB FOCUS ================= */

  useFocusEffect(
    useCallback(() => {
      fetchCartList();
    }, [token])
  );

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.safe}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable onPress={() => router.push("/settings")}>
              <Image
                source={require("../../assets/images/icons/menu.png")}
                style={styles.menuIcon}
              />
            </Pressable>

            <View style={styles.locationBox}>
              <AppText style={styles.deliverTo}>DELIVER TO</AppText>
              <AppText variant="medium" style={styles.locationText}>
                Home - {addressDetail?.address_line_1 || ""}
              </AppText>
            </View>
          </View>

          {/* TITLE */}
          <View style={styles.titleRow}>
            <Image
              source={require("../../assets/images/icons/cart-meal.png")}
              style={styles.cartTitleIcon}
            />
            <AppText variant="semiBold" style={styles.pageTitle}>
              My Cart
            </AppText>
          </View>

          {/* CART ITEM */}
          {packageDetail?.id ? (
            <>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: IMAGE_BASE_API2 + packageDetail?.image_path,
                  }}
                  style={styles.cardImage}
                />

                <View style={styles.cardBody}>
                  <AppText variant="semiBold" style={styles.planTitle}>
                    {packageDetail?.name}
                  </AppText>

                  <AppText style={styles.desc}>
                    {packageDetail?.description}
                  </AppText>

                  <View style={styles.metaRow}>
                    <AppText variant="semiBold" style={styles.price}>
                      {packageDetail?.price} QAR
                    </AppText>

                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color="#FF3B30"
                      onPress={deleteCart}
                    />
                  </View>
                </View>
              </View>

              {/* SUMMARY */}
              <View style={styles.summaryBox}>
                <View style={styles.addressHeader}>
                  <AppText style={styles.addressTitle}>
                    DELIVERY ADDRESS
                  </AppText>
                </View>

                <View style={styles.addressBox}>
                  <AppText style={styles.addressText}>
                    {addressDetail?.address_line_1},{" "}
                    {addressDetail?.address_line_2}
                  </AppText>
                </View>

                <View style={styles.totalRow}>
                  <AppText style={styles.totalLabel}>TOTAL:</AppText>
                  <AppText variant="semiBold" style={styles.totalPrice}>
                    {packageDetail?.price} QAR
                  </AppText>
                </View>

                <Pressable
                  style={styles.payBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/payment",
                      params: { price: packageDetail?.price },
                    })
                  }
                >
                  <AppText variant="medium" style={styles.payText}>
                    PROCEED TO PAY
                  </AppText>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.emptyBox}>
              <AppText style={{ color: Colors.textMuted2 }}>
                Your cart is empty.
              </AppText>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { paddingHorizontal: 16, paddingBottom: 32 },

  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  menuIcon: { width: 45, height: 45 },

  locationBox: { flex: 1, alignItems: "center" },
  deliverTo: { fontSize: 11, color: Colors.textMuted2 },
  locationText: { color: Colors.accent },

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
  planTitle: { fontSize: 16, color: Colors.textPrimary2 },
  desc: { fontSize: 12, color: Colors.textMuted2, marginVertical: 6 },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 18, color: Colors.textPrimary2 },

  summaryBox: {
    backgroundColor: "#F2F5EE",
    borderRadius: 18,
    padding: 16,
  },
  addressHeader: { marginBottom: 10 },
  addressTitle: { fontSize: 12, color: Colors.textPrimary2 },

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
    marginBottom: 16,
  },
  totalLabel: { fontSize: 12, color: Colors.textPrimary2 },
  totalPrice: { fontSize: 18, color: Colors.textPrimary2 },

  payBtn: {
    backgroundColor: "#0E1E24",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  payText: { color: "#fff", fontSize: 15 },

  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },
});
