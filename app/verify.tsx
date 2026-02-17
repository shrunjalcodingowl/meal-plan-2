import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import { useDispatch } from "react-redux";
import { isLogin, userDetail, userToken } from "@/Redux/Actions/UserAction";
import axios from "axios";
import { API_CONSTANTS } from "@/constants/apiConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

const OTP_LENGTH = 5;
const RESEND_SECONDS = 60;

export default function VerifyOtpScreen() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const dispatch = useDispatch()
  const params = useLocalSearchParams();
  // Destructure specific parameters, providing default values if needed
  const { email, isForgot } = params;
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={{
      width: '90%',
      backgroundColor: '#1E293B',
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 5,
      borderLeftColor: '#22C55E',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    }}>
      <Text style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
      }}>
        {text1}
      </Text>
      {text2 && (
        <Text style={{
          color: '#CBD5E1',
          marginTop: 4,
          fontSize: 14
        }}>
          {text2}
        </Text>
      )}
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View style={{
      width: '90%',
      backgroundColor: '#1E293B',
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 5,
      borderLeftColor: '#EF4444',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    }}>
      <Text style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
      }}>
        {text1}
      </Text>
      {text2 && (
        <Text style={{
          color: '#CBD5E1',
          marginTop: 4,
          fontSize: 14
        }}>
          {text2}
        </Text>
      )}
    </View>
  ),
};

  /* Android back → forgot */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/login");
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => sub.remove();
    }, [])
  );

  /* Countdown */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* Handle input */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;

    try {
      const params = {
        email: email
      }

      const response = await axios.post(API_CONSTANTS.resendOtp, params)
      
      const { status, data } = response || {};
      const { message } = data || {};
      if (status === 200) {
        Toast.show({
          type:'success',
          text1:"success",
          text2: "done",
          position:'bottom',
          visibilityTime: 2000
        })
        setTimer(RESEND_SECONDS);
      }
    } catch (error) {

    }

  };

  const handleSubmit = async () => {
    if (otp.filter(_item => _item !== "").length !== 5) {
      return;
    }
    const params = {
      email: email,
      otp: otp.join("")
    }
    try {
      const response = await axios.post(API_CONSTANTS.verifyOtp, params)
      const { data, status } = response || {}
      const { data: mdata, token } = data || {}
      if (status === 200) {
        if(isForgot){
          router.push({pathname: "/updatePassword", params:{isForgot: isForgot, token: token, data: mdata}} )
        }else{
        dispatch(userToken(token))
        dispatch(userDetail(mdata))
        dispatch(isLogin(true))
        await AsyncStorage.setItem("token", JSON.stringify(token))
        await AsyncStorage.setItem("isLogin", JSON.stringify(true));
        router.replace("/(tabs)")
        }
      }
    } catch (error) {
      Alert.alert("Something went wrong")
    }

  }
  return (
    <View style={styles.container}>
      <Toast config={toastConfig} />
      {/* HEADER */}
      <ImageBackground
        source={require("../assets/images/header-bg.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
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
            Verify OTP
          </AppText>

          <View style={styles.headerRightSpacer} />
        </View>
      </ImageBackground>

      {/* MAIN */}
      <View style={styles.main}>
        <View style={styles.centerContent}>
          <AppText style={styles.infoText}>
            Enter your OTP which has been sent to your email and complete verification of your account.
          </AppText>

          {/* OTP INPUTS */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputsRef.current[index] = ref; }}
                value={digit}
                onChangeText={(v) => handleChange(v, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpInput}
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* RESEND */}
          <View style={styles.resendContainer}>
            <AppText style={styles.resendInfo}>
              A code has been sent to your email
            </AppText>

            <Pressable onPress={resendOtp} disabled={timer > 0}>
              <AppText
                style={[
                  styles.resendText,
                  timer > 0 && { opacity: 0.6 },
                ]}
              >
                {timer > 0
                  ? `Resend in 00:${timer.toString().padStart(2, "0")}`
                  : "Resend OTP"}
              </AppText>
            </Pressable>
          </View>

          {/* CONFIRM */}
          <Pressable
            style={({ pressed }) => [
              styles.confirmButton,
              {
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            onPress={handleSubmit}
          >
            <AppText variant="medium" style={styles.confirmText}>
              Confirm
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
  },
  headerRightSpacer: {
    width: 28,
  },

  /* MAIN */
  main: {
    flex: 1,
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 140,
  },

  infoText: {
    fontSize: 14,
    color: "#3A3A3A",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 20,
  },

  /* OTP */
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderBottomWidth: 1.5,
    borderColor: "#1B1B1B",
    fontSize: 20,
    textAlign: "center",
    color: Colors.accent,
  },

  /* RESEND */
  resendContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  resendInfo: {
    fontSize: 13,
    color: "#6A6A6A",
    marginBottom: 6,
  },
  resendText: {
    fontSize: 14,
    color: Colors.accent,
  },

  /* CONFIRM */
  confirmButton: {
    backgroundColor: Colors.accent,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
