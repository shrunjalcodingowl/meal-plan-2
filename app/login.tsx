import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";

import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import axios from "axios";
import { API_CONSTANTS } from "@/constants/apiConstants";

export default function LoginScreen() {
  /* ================= STATE ================= */

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE ANDROID BACK ================= */

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/welcome");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  /* ================= HANDLE INPUT CHANGE ================= */

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    let newErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Enter valid email address";
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const onSubmitHandler = async () => {
    if (loading) return;

    if (!validateForm()) return;

    try {
      setLoading(true);

      const params = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const response = await axios.post(API_CONSTANTS.login, params);

      const { data, status } = response;

      if (status === 200) {
        router.replace({
          pathname: "/verify",
          params: { email: form.email },
        });
      }
    } catch (error: any) {
      console.log("STATUS:", error?.response?.status);
      console.log("ERROR DATA:", error?.response?.data);

      const apiMessage =
        error?.response?.data?.message || "Something went wrong. Please try again.";

      Alert.alert("Login Failed", apiMessage);
    }
    finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

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
            onPress={() => router.replace("/welcome")}
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
            Log In
          </AppText>

          <View style={styles.headerRightSpacer} />
        </View>
      </ImageBackground>

      {/* MAIN */}
      <View style={styles.main}>
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
            value={form.email}
            autoFocus
            placeholder="Type your email"
            placeholderTextColor="#E9B1A0"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => handleChange("email", text)}
          />
          {errors.email && (
            <AppText style={styles.errorText}>{errors.email}</AppText>
          )}
        </View>

        {/* PASSWORD */}
        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Password</AppText>
          <TextInput
            value={form.password}
            placeholder="Type your password"
            placeholderTextColor="#E9B1A0"
            secureTextEntry
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(text) => handleChange("password", text)}
          />
          {errors.password && (
            <AppText style={styles.errorText}>{errors.password}</AppText>
          )}
        </View>

        {/* FORGOT */}
        <View style={styles.forgotRow}>
          <Pressable
            onPress={() => router.push("/forgot")}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <AppText style={styles.forgotText}>Forgot password?</AppText>
          </Pressable>
        </View>

        {/* LOGIN BUTTON */}
        <Pressable
          onPress={onSubmitHandler}
          disabled={loading}
          style={({ pressed }) => [
            styles.loginButton,
            {
              opacity: pressed || loading ? 0.75 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <AppText variant="medium" style={styles.loginText}>
              Log In
            </AppText>
          )}
        </Pressable>

        {/* REGISTER */}
        <View style={styles.registerRow}>
          <AppText style={styles.registerText}>
            Don't have an account?
          </AppText>
          <Pressable
            onPress={() => router.replace("/signup")}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <AppText style={styles.registerLink}> Register</AppText>
          </Pressable>
        </View>

        <View style={styles.registerRow}>
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <AppText style={styles.registerText}>
              Continue as a guest
            </AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  backBtn: { padding: 8 },
  backIcon: { width: 20, height: 20, resizeMode: "contain" },
  headerTitle: {
    fontSize: 22,
    color: "#1B1B1B",
    textAlign: "center",
  },
  headerRightSpacer: { width: 28 },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  logo: { width: 180, height: 48 },
  inputGroup: { marginBottom: 18 },
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
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.accent,
  },
  loginButton: {
    backgroundColor: Colors.accent,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
  },
  loginText: {
    fontSize: 16,
    color: "#1B1B1B",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    fontSize: 13,
    color: "#1B1B1B",
    textDecorationLine: "underline",
  },
  registerLink: {
    fontSize: 13,
    color: Colors.accent,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
