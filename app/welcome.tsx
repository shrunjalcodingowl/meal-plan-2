import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppText from "@/components/AppText";
import Colors from "@/constants/colors";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/welcome.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* CONTENT WRAPPER */}
      <View style={styles.overlay}>
        {/* WELCOME TEXT */}
        <AppText variant="semiBold" style={styles.title}>
          Welcome
        </AppText>

        {/* ACTIONS */}
        <View style={styles.actions}>
          {/* Log In */}
          <Pressable
            onPress={() => router.push("/login")}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <AppText variant="medium" style={styles.primaryText}>
              Log In
            </AppText>
          </Pressable>

          {/* Sign Up */}
          <Pressable
            onPress={() => router.push("/signup")}
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <AppText variant="medium" style={styles.secondaryText}>
              Sign Up
            </AppText>
          </Pressable>

          {/* BIG GAP */}
          <View style={styles.socialSpacer} />

          {/* Google */}
          {/* <Pressable
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
          </Pressable> */}

          {/* Facebook */}
          {/* <Pressable
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
          </Pressable> */}
        </View>
      </View>
    </ImageBackground>
  );
}

/* Widths tuned from screenshot */
const AUTH_BUTTON_WIDTH = "72%";
const SOCIAL_BUTTON_WIDTH = "82%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Dark image already has fade; this just positions content */
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 42,
    alignItems: "center",
  },

  /* WELCOME */
  title: {
    fontSize: 32,
    color: Colors.white,
    marginBottom: 48,
  },

  /* BUTTON STACK */
  actions: {
    width: "100%",
    alignItems: "center",
  },

  /* Log In */
  primaryButton: {
    width: AUTH_BUTTON_WIDTH,
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 14,
  },
  primaryText: {
    fontSize: 16,
    color: "#1B1B1B",
  },

  /* Sign Up */
  secondaryButton: {
    width: AUTH_BUTTON_WIDTH,
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.6)",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
  },
  secondaryText: {
    fontSize: 16,
    color: Colors.white,
  },

  /* BIG GAP before social */
  socialSpacer: {
    height: 40,
  },

  /* Social buttons */
  socialButton: {
    width: SOCIAL_BUTTON_WIDTH,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 12,
  },
  socialContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: "contain",
  },
  socialText: {
    fontSize: 14,
    color: Colors.white,
  },
});
