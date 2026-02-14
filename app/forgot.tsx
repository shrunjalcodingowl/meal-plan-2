import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    BackHandler,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import axios from "axios";
import { API_CONSTANTS } from "@/constants/apiConstants";

export default function ForgotPasswordScreen() {
  const [Email, setEmail ] = useState("superadm0111@rumbl.app")
  /* Handle Android hardware back */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/login");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const onHandleSubmit = async () => {
    try {
      const params = {
        email: Email
      }

      const response = await axios.post(API_CONSTANTS.forgotPassword, params)
      const { data, status } = response || {}
      if (status == 200) {
        router.replace({pathname: "/verify", params: {email: Email, isForgot: true}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <ImageBackground
        source={require("../assets/images/header-bg.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.replace("/login")}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Image
              source={require("../assets/images/icons/back.png")}
              style={styles.backIcon}
            />
          </Pressable>

          <AppText variant="bold" style={styles.headerTitle}>
            Forgot Password
          </AppText>

          <View style={styles.headerRightSpacer} />
        </View>
      </ImageBackground>

      {/* MAIN */}
      <View style={styles.main}>
        {/* CONTENT CENTER (VISUALLY BALANCED) */}
        <View style={styles.centerContent}>
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo-1.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <AppText style={styles.label}>Email</AppText>
            <TextInput
              autoFocus
              placeholder="Type your email"
              placeholderTextColor="#E9B1A0"
              style={styles.input}
              onChangeText={setEmail}
            />
          </View>

          {/* SUBMIT BUTTON */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              {
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            onPress={onHandleSubmit}
          >
            <AppText variant="medium" style={styles.submitText}>
              Submit
            </AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* HEADER */
  header: {
    height: 110,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 22,
    color: "#1B1B1B",
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 28,
  },

  /* MAIN */
  main: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },

  centerContent: {
    flex: 1,
    paddingTop: 140, 
  },

  /* LOGO */
  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 180,
    height: 48,
  },

  /* INPUT */
  inputGroup: {
    marginBottom: 26,
  },
  label: {
    fontSize: 14,
    color: Colors.accent,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1B1B1B",
    borderWidth: 1,
    borderColor: "#F1E6E2",
  },

  /* SUBMIT BUTTON */
  submitButton: {
    backgroundColor: Colors.accent,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    color: "#1B1B1B",
  },
});
