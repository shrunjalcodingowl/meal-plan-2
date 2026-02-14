import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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
} from "react-native";

import AppText from "@/components/AppText";
import Colors from "@/constants/colors";
import axios from 'axios';
import { API_CONSTANTS } from "@/constants/apiConstants";
import { TOKEN, userDetail, userToken } from "@/Redux/Actions/UserAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

export default function UpdatePassword() {
    /* Handle Android hardware back */
    const params = useLocalSearchParams();
    const dispatch = useDispatch()
    // Destructure specific parameters, providing default values if needed
    const { token, data, isForgot } = params;
    const [form, setForm] = useState({
        oldPassword: "",
        password: ""
    })
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

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const onSubmitHandler = async () => {

        try {
            const params = {
                "new_password": form.password
            }
            if(!isForgot){
                params["old_password"] = form.oldPassword
            }
            console.log("Token", token, params)
            // const response = await fetch(API_CONSTANTS.updatePassword, requestOptions);
            const response = await axios.post(API_CONSTANTS.updatePassword, params, { headers: { Authorization: "Bearer " + token } })

            const { data, status } = response || {}
            if (status == 200) {
                dispatch(userToken(token))
                dispatch(userDetail(data))
                await AsyncStorage.setItem("isLogin", JSON.stringify(true));
                router.replace("/(tabs)")
            }
        } catch (error) {
            console.log(error)
            Alert.alert("something went wrong")
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

                    {/* Spacer to balance center alignment */}
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
                    <AppText style={styles.label}>New Password</AppText>
                    <TextInput
                        autoFocus
                        placeholder="Type your password"
                        placeholderTextColor="#E9B1A0"
                        style={styles.input}
                        onChangeText={(text) =>
                            handleChange("password", text)
                        }
                    />
                </View>



                {/* LOGIN BUTTON */}
                <Pressable
                    onPress={onSubmitHandler}
                    style={({ pressed }) => [
                        styles.loginButton,
                        {
                            opacity: pressed ? 0.75 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }],
                        },
                    ]}
                >
                    <AppText variant="medium" style={styles.loginText}>
                        Submit
                    </AppText>
                </Pressable>

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

    /* FORGOT */
    forgotRow: {
        alignItems: "flex-end",
        marginBottom: 22,
    },
    forgotText: {
        fontSize: 13,
        color: Colors.accent,
    },

    /* LOGIN BUTTON */
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

    /* REGISTER */
    registerRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
    },
    registerText: {
        fontSize: 13,
        color: "#1B1B1B",
        textDecorationLine: 'underline'
    },
    registerLink: {
        fontSize: 13,
        color: Colors.accent,
    },
});
