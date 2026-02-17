import AppText from "@/components/AppText";
import { API_CONSTANTS, IMAGE_BASE_API2 } from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------- DATE SETUP ---------------- */

const today = new Date();
const minSelectableDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 2
);

const minDateStr = [
  minSelectableDate.getFullYear(),
  String(minSelectableDate.getMonth() + 1).padStart(2, "0"),
  String(minSelectableDate.getDate()).padStart(2, "0"),
].join("-");

/* ---------------- SCREEN ---------------- */

export default function PlanDetailsScreen() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [packageData, setPackageData] = useState<any>({});
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);

  const { token } = useDetailHooks();
  const params = useLocalSearchParams();
  const { id } = params;

  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: Colors.softPink,
      },
    };
  }, [selectedDate]);

  /* ---------------- FETCH PACKAGE DETAILS ---------------- */

  const packagesDetail = async () => {
    try {
      const response = await axios.post(
        API_CONSTANTS.exploreDetails,
        { package_id: Number(id) }
      );

      const { data, status } = response || {};
      const { data: mdata } = data || {};

      if (status === 200) {
        setPackageData(mdata || {});
      }
    } catch (error: any) {
      console.log("DETAIL ERROR:", error?.response?.data);
    }
  };

  /* ---------------- FETCH DEFAULT ADDRESS ---------------- */

  const fetchDefaultAddress = async () => {
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
        setDefaultAddressId(defaultAddr.id);
      } else {
        setDefaultAddressId(null);
      }
    } catch (error: any) {
      console.log("ADDRESS ERROR:", error?.response?.data);
      setDefaultAddressId(null);
    }
  };

  /* ---------------- ADD TO CART ---------------- */

  const addToCart = async () => {
    // 🚨 FIRST CHECK: TOKEN
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // 🚨 SECOND CHECK: DATE
      if (!selectedDate) {
        Alert.alert("Error", "Please select start date.");
        return;
      }

      // 🚨 THIRD CHECK: DEFAULT ADDRESS
      if (!defaultAddressId) {
        Alert.alert("Error", "No default address found.");
        return;
      }

      const requestBody = {
        package_id: Number(packageData.id),
        address_id: Number(defaultAddressId),
        start_date: selectedDate,
      };

      console.log("ADD TO CART BODY:", requestBody);

      const response = await axios.post(
        API_CONSTANTS.addToCart,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/(tabs)/cart");
      }
    } catch (error: any) {
      console.log("ADD TO CART ERROR:", error?.response?.data);
      Alert.alert("Error", "Unable to add to cart. Please try again.");
    }
  };

  /* ---------------- LIFECYCLE ---------------- */

  useEffect(() => {
    if (id) {
      packagesDetail();
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      fetchDefaultAddress();
    }
  }, [token]);

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/icons/back-2.png")}
              style={styles.headerIcon}
            />
          </Pressable>

          <AppText variant="medium" style={styles.headerTitle}>
            Details
          </AppText>

          <View style={{ width: 45 }} />
        </View>

        {/* IMAGE */}
        {packageData?.image && (
          <Image
            source={{ uri: IMAGE_BASE_API2 + packageData.image }}
            style={styles.planImage}
          />
        )}

        {/* CONTENT */}
        <View style={styles.body}>
          <AppText variant="semiBold" style={styles.planTitle}>
            {packageData?.name}
          </AppText>

          <AppText style={styles.desc}>
            {packageData?.description}
          </AppText>

          {/* CALENDAR */}
          <View style={styles.calendarHeader}>
            <AppText style={styles.calendarHeaderText}>
              CHOOSE THE START DATE
            </AppText>
          </View>

          <Calendar
            minDate={minDateStr}
            disableAllTouchEventsForDisabledDays
            markedDates={markedDates}
            onDayPress={(day) => {
              if (day.dateString < minDateStr) return;
              setSelectedDate(day.dateString);
            }}
            theme={{
              arrowColor: Colors.accent,
              todayTextColor: Colors.textMuted2,
              selectedDayBackgroundColor: Colors.softPink,
              selectedDayTextColor: Colors.textPrimary2,
            }}
          />

          {/* PRICE */}
          <View style={styles.bottomRow}>
            <AppText variant="semiBold" style={styles.price}>
              {packageData?.price} QAR
            </AppText>
          </View>

          {/* ADD TO CART */}
          <Pressable style={styles.addBtn} onPress={addToCart}>
            <AppText variant="medium" style={styles.addText}>
              ADD TO CART
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
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: Colors.textPrimary2,
  },
  headerIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  planImage: {
    marginHorizontal: 16,
    height: 200,
    borderRadius: 16,
  },

  body: { padding: 16 },

  planTitle: {
    fontSize: 18,
    color: Colors.textPrimary2,
    marginBottom: 6,
  },
  desc: {
    fontSize: 12,
    color: Colors.textMuted2,
    marginBottom: 12,
  },

  calendarHeader: {
    backgroundColor: Colors.softPink,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  calendarHeaderText: {
    fontSize: 13,
    color: Colors.textPrimary2,
  },

  bottomRow: {
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    color: Colors.textPrimary2,
  },

  addBtn: {
    marginTop: 20,
    backgroundColor: "#0E1E24",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 16 },
});
