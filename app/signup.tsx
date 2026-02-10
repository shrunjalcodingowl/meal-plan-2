import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
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

export default function SignupScreen() {
  /* Handle Android hardware back */
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
            Sign Up
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
            autoFocus
            placeholder="Type your email"
            placeholderTextColor="#E9B1A0"
            style={styles.input}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Password</AppText>
          <TextInput
            placeholder="Type your password"
            placeholderTextColor="#E9B1A0"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Confirm Password</AppText>
          <TextInput
            placeholder="Type your password"
            placeholderTextColor="#E9B1A0"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* SIGN UP BUTTON */}
        <Pressable
          onPress={() => router.replace("/verify")}
          style={({ pressed }) => [
            styles.loginButton,
            {
              opacity: pressed ? 0.75 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <AppText variant="medium" style={styles.loginText}>
            Sign Up
          </AppText>
        </Pressable>

        {/* OR */}
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <AppText style={styles.orText}>OR</AppText>
          <View style={styles.orLine} />
        </View>

        {/* SOCIAL */}
        <Pressable
          style={({ pressed }) => [
            styles.socialButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.socialContent}>
            <Image
              source={require("../assets/images/icons/google.png")}
              style={styles.socialIcon}
            />
            <AppText style={styles.socialText}>
              Continue with Google
            </AppText>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.socialButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <View style={styles.socialContent}>
            <Image
              source={require("../assets/images/icons/fb.png")}
              style={styles.socialIcon}
            />
            <AppText style={styles.socialText}>
              Continue with Facebook
            </AppText>
          </View>
        </Pressable>

        {/* LOGIN LINK */}
        <View style={styles.registerRow}>
          <AppText style={styles.registerText}>
            Already have an account?
          </AppText>
          <Pressable
            onPress={() => router.replace("/login")}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <AppText style={styles.registerLink}> Login</AppText>
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

  /* LOGO */
  logoContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 48,
  },

  /* INPUTS */
  inputGroup: {
    marginBottom: 18,
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

  /* SIGN UP BUTTON */
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

  /* OR */
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: "#8E8E8E",
  },

  /* SOCIAL */
  socialButton: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 999,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  socialContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialText: {
    fontSize: 14,
    color: "#1B1B1B",
  },

  /* LOGIN LINK */
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    fontSize: 13,
    color: "#1B1B1B",
  },
  registerLink: {
    fontSize: 13,
    color: Colors.accent,
  },
});
