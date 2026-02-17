import AppText from "@/components/AppText";
import { API_CONSTANTS, IMAGE_BASE_API2 } from "@/constants/apiConstants";
import Colors from "@/constants/colors";
import { useDetailHooks } from "@/hooks/userHooks";
import axios from "axios";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [qty, setQty] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [packageData, setPackageData] = useState<object | undefined>({});
  const { token, selectedAddress } = useDetailHooks()
  const params = useLocalSearchParams()
  const { id } = params
  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: Colors.softPink,
      },
    };
  }, [selectedDate]);


  const packagesDetail = async () => {
    try {
      const params = {
        "package_id": Number(id)
      }
      const response = await axios.post(API_CONSTANTS.exploreDetails, params,
        {
          headers: {
            Authorization: `Bearer ${token}`, // if required
          },
        }
      )
      const { data, status } = response || {}
      const { data: mdata } = data || {}
      
      if (status == 200) {
        if (mdata && mdata.length !== 0) {
          setPackageData(mdata)
        } else {
          setPackageData([])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async () => {
    try {
      const params = {
        "package_id": packageData.id,
        "address_id": selectedAddress.id,
        "start_date": selectedDate
      }
      
      const response = await axios.post(API_CONSTANTS.addToCart, params,
        {
          headers: {
            Authorization: `Bearer ${token}`, // if required
          },
        }
      )
      const { data, status } = response || {}
      const { data: mdata } = data || {}
      if (status == 200) {
        router.push('/(tabs)/cart')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    packagesDetail()
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ---------------- HEADER ---------------- */}
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

          <View style={styles.cartWrapper}>
            <Image
              source={require("../assets/images/icons/cart.png")}
              style={styles.headerIcon}
            />
            {/* <View style={styles.badge}>
              <AppText style={styles.badgeText}></AppText>
            </View> */}
          </View>
        </View>

        {/* ---------------- IMAGE ---------------- */}
        <Image
          source={{ uri: IMAGE_BASE_API2 + packageData?.image }}
          style={styles.planImage}
        />

        {/* ---------------- CONTENT ---------------- */}
        <View style={styles.body}>
          {/* TITLE */}
          <AppText variant="semiBold" style={styles.planTitle}>
            {packageData.name}
          </AppText>

          {/* DESCRIPTION */}
          <AppText style={styles.desc}>
            {packageData.description}
          </AppText>

          {/* META */}
          {/* <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Image
                source={require("../assets/images/icons/star.png")}
                style={styles.metaIcon}
              />
              <AppText style={styles.metaText}>4.7</AppText>
            </View>

            <View style={styles.metaItem}>
              <Image
                source={require("../assets/images/icons/delivery.png")}
                style={styles.metaIcon}
              />
              <AppText style={styles.metaText}>Free</AppText>
            </View>

            <View style={styles.metaItem}>
              <Image
                source={require("../assets/images/icons/clock.png")}
                style={styles.metaIcon}
              />
              <AppText style={styles.metaText}>20 min</AppText>
            </View>
          </View> */}

          {/* ---------------- CALENDAR ---------------- */}
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
              // extra safety: block anything before min date
              if (day.dateString < minDateStr) return;
              setSelectedDate(day.dateString);
            }}
            theme={{
              arrowColor: Colors.accent,
              todayTextColor: Colors.textMuted2,
              selectedDayBackgroundColor: Colors.softPink,
              selectedDayTextColor: Colors.textPrimary2,
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />


          {/* ---------------- PRICE + QTY ---------------- */}
          <View style={styles.bottomRow}>
            <AppText variant="semiBold" style={styles.price}>
              {packageData.price} QAR
            </AppText>

            {/* <View style={styles.qtyBox}>
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
            </View> */}
          </View>

          {/* ---------------- ADD TO CART ---------------- */}
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

  metaRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: { width: 16, height: 16 },
  metaText: { fontSize: 12, color: Colors.textPrimary2 },

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    color: Colors.textPrimary2,
  },

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

  addBtn: {
    marginTop: 20,
    backgroundColor: "#0E1E24",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 16 },
});
