import { API_CONSTANTS } from "@/constants/apiConstants";
import { useDetailHooks } from "@/hooks/userHooks";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get("window");

export default function paymentScreen() {
    const [url, setUrl] = useState("")
    const { price } = useLocalSearchParams()
    const { userDetails, token } = useDetailHooks();
    const { email, phone, first_name, last_name } = userDetails || {}

    useEffect(() => {

        const fetchPaymentUrl = async () => {

            try {

                const params = {
                    "amount": price,
                    "first_name": first_name,
                    "last_name": last_name,
                    "phone": phone,
                    "email": email,
                    "country": "QA"
                }

                const respo = await axios.post(API_CONSTANTS.paymentInit, params, { headers: { Authorization: `Bearer ${token}` } })

                const { data } = respo || {};
                const { data: mdata } = data || {};
                const { gateway_response } = mdata || {};
                const { resultObj } = gateway_response || {};
                const { payUrl } = resultObj || {};
                setUrl(payUrl)
            } catch (error) {
                console.log(":err", error)
            }
        }
        fetchPaymentUrl()

    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name="chevron-back" size={22} onPress={() => router.back()} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Payment</Text>
            </View>
            <View style={{ flex: 1 }}>
                {url &&
                    <WebView
                        source={{ uri: url }}
                        onShouldStartLoadWithRequest={(navState) => {
                            const { loading } = navState || {}
                            if (navState.url.includes("Paid") && !loading) {
                                router.replace('/(tabs)')
                                return false;
                            }

                            if (navState.url.includes("payment-failure")) {
                                router.back()
                                return false
                            }
                            return true;
                        }}
                        startInLoadingState
                    />
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: width * 0.06,
        marginTop: height * 0.02,
    },
    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: "600",
        marginLeft: 20
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        alignItems: "center",
        justifyContent: "center",
    },
})