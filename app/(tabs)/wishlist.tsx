import AppText from "@/components/AppText";
import { API_CONSTANTS, IMAGE_BASE_API2 } from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

const { height } = Dimensions.get("window");

export default function WishlistScreen() {
  const [allData, setAllData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useDetailHooks();

  /* ================= FETCH ================= */

  const fetchWishList = async () => {
    if (!token) {
      setAllData([]);
      return;
    }

    try {
      setRefreshing(true);
      setLoading(true);

      const response = await axios.post(
        API_CONSTANTS.wishlist,
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
        setAllData(mdata || []);
      }
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  /* ================= REMOVE ================= */

  const onChangeWishList = async (key: number) => {
    try {
      await axios.post(
        API_CONSTANTS.wishlistAdd,
        { package_id: key },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWishList();
    } catch (error) {
      console.log("Remove Error:", error);
    }
  };

  /* ================= REFRESH ON FOCUS ================= */

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchWishList();
      }
    }, [token])
  );

  /* ================= RENDER ITEM ================= */

  const renderItem = ({ item }: any) => (
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
        source={{ uri: IMAGE_BASE_API2 + item.image_path }}
        style={styles.planImage}
      />

      <View style={styles.planBody}>
        <AppText variant="semiBold" style={styles.planTitle}>
          {item.name}
        </AppText>

        <AppText style={styles.planDesc}>
          {item.description}
        </AppText>

        <View style={styles.metaRow}>
          <Pressable
            style={styles.detailsBtn}
            onPress={() => onChangeWishList(item?.id)}
          >
            <AppText style={styles.detailsText}>
              Remove
            </AppText>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  /* ================= HEADER ================= */

  const Header = () => (
    <View style={styles.header}>
      <Pressable onPress={() => router.push("/settings")}>
        <Image
          source={require("../../assets/images/icons/menu.png")}
          style={styles.headerIcon}
        />
      </Pressable>

      <View style={styles.headerCenter}>
        <AppText variant="semiBold" style={styles.sectionTitle}>
          Wishlist
        </AppText>
      </View>

      <Pressable onPress={() => router.push("/(tabs)/cart")}>
        <Image
          source={require("../../assets/images/icons/cart.png")}
          style={styles.headerIcon}
        />
      </Pressable>
    </View>
  );

  /* ================= LOGIN REQUIRED VIEW ================= */

  if (!token) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header />
        <View style={styles.loginContainer}>
          <AppText style={styles.loginText}>
            Please login to view your wishlist
          </AppText>

          <Pressable
            style={styles.loginBtn}
            onPress={() => router.push("/login")}
          >
            <AppText style={styles.loginBtnText}>
              Login
            </AppText>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* ================= RETURN ================= */

  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={allData}
          keyExtractor={(item) =>
            item?.id?.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: height * 0.15,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchWishList}
            />
          }
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <AppText>No items in wishlist</AppText>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 49,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  headerCenter: { flex: 1, alignItems: "center" },

  headerIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  sectionTitle: {
    fontSize: 18,
    color: Colors.textPrimary2,
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

  planBody: { padding: 14 },

  planTitle: {
    fontSize: 16,
    color: Colors.textPrimary2,
  },

  planDesc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginVertical: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailsBtn: {
    marginLeft: "auto",
    backgroundColor: Colors.softGreen,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  detailsText: {
    fontSize: 12,
    color: Colors.textPrimary2,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  loginText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: Colors.textPrimary2,
  },

  loginBtn: {
    backgroundColor: Colors.softPink,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },

  loginBtnText: {
    fontSize: 14,
    color: Colors.textPrimary2,
  },
});
