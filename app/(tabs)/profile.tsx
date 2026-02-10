import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
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
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/settings")}>
            <Image
              source={require("../../assets/images/icons/menu.png")}
              style={styles.menuIcon}
            />
          </Pressable>
          <AppText variant="medium" style={styles.headerTitle}>
            Profile
          </AppText>
        </View>

        {/* ---------------- USER INFO ---------------- */}
        <View style={styles.profileRow}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assets/images/profile-avatar.png")}
              style={styles.avatar}
            />
            <View style={styles.avatarEdit}>
              <Image
                source={require("../../assets/images/icons/edit.png")}
                style={styles.editIcon}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <AppText variant="semiBold" style={styles.userName}>
              Dhruv Shinde
            </AppText>

            <AppText style={styles.goalText}>
              Goal: <AppText style={styles.goalValue}>Lose Weight</AppText>
            </AppText>

            {/* <View style={styles.inviteChip}>
              <AppText style={styles.inviteText}>0 Invitations</AppText>
            </View> */}
          </View>
        </View>

        {/* ---------------- TARGET CARD ---------------- */}
        <View style={styles.card}>
          <AppText variant="medium" style={styles.cardTitle}>
            Your Target
          </AppText>
          <AppText style={styles.cardSub}>
            Reach your target by eating
          </AppText>

          <View style={styles.targetCircle}>
            <View style={styles.targetInner}>
              <Image
                source={require("../../assets/images/icons/target-fire.png")}
                style={styles.targetIcon}
              />
              <AppText variant="semiBold" style={styles.targetValue}>
                1763.5
              </AppText>
              <AppText style={styles.targetUnit}>
                Calories per day
              </AppText>
            </View>
          </View>
        </View>

        {/* ---------------- ALLERGIES ---------------- */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Allergies</AppText>
          <Image
            source={require("../../assets/images/icons/edit.png")}
            style={styles.sectionEdit}
          />
        </View>

        <View style={styles.emptyBox} />

        {/* ---------------- WALLET ---------------- */}
        <AppText style={styles.sectionTitle}>Wallet</AppText>

        <View style={styles.walletCard}>
          <View>
            <AppText style={styles.walletLabel}>
              Available Balance
            </AppText>
            <AppText variant="semiBold" style={styles.walletAmount}>
              5000.00 QAR
            </AppText>
          </View>

          <Image
            source={require("../../assets/images/wallet-illustration.png")}
            style={styles.walletImg}
          />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  /* ---------------- HEADER ---------------- */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  menuIcon: {
    width: 45,          // ❌ untouched
    height: 45,         // ❌ untouched
  },

  headerTitle: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.textPrimary2,
  },

  /* ---------------- PROFILE ROW ---------------- */

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  avatarWrapper: {
    marginRight: 18,
  },

  avatar: {
    width: 108,          // ⬆️ +50%
    height: 108,         // ⬆️ +50%
    borderRadius: 54,    // ⬆️ +50%
  },

  avatarEdit: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 40,           // ⬆️ +50%
    height: 40,          // ⬆️ +50%
    borderRadius: 20,
    backgroundColor: "#0E1E24",
    alignItems: "center",
    justifyContent: "center",
  },

  editIcon: {
    width: 24,           // ⬆️ +50%
    height: 24,          // ⬆️ +50%
  },

  userName: {
    fontSize: 16,
    color: Colors.textPrimary2,
  },

  goalText: {
    fontSize: 13,
    color: Colors.textMuted2,
    marginTop: 2,
  },

  goalValue: {
    color: Colors.softGreen,
  },

  inviteChip: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#F1F3ED",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },

  inviteText: {
    fontSize: 11,
    color: Colors.textMuted2,
  },

  /* ---------------- TARGET CARD ---------------- */

  card: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 22,
    backgroundColor: "#fff",
  },

  cardTitle: {
    fontSize: 14,
    color: Colors.softGreen,
  },

  cardSub: {
    fontSize: 11,
    color: Colors.textMuted2,
    marginBottom: 14,
  },

  targetCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: Colors.softPink,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  targetInner: {
    alignItems: "center",
  },

  targetIcon: {
    width: 37,          
    height: 37,         
    marginBottom: 6,
  },

  targetValue: {
    fontSize: 16,
    color: Colors.textPrimary2,
  },

  targetUnit: {
    fontSize: 10,
    color: Colors.textMuted2,
    marginTop: 2,
  },

  /* ---------------- ALLERGIES ---------------- */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    color: Colors.softGreen,
  },

  sectionEdit: {
    width: 32,
    height: 32,
  },

  emptyBox: {
    height: 74,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 22,
  },

  /* ---------------- WALLET ---------------- */

  walletCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },

  walletLabel: {
    fontSize: 12,
    color: Colors.textMuted2,
  },

  walletAmount: {
    fontSize: 18,
    color: Colors.softGreen,
    marginTop: 4,
  },

  walletImg: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
