import PaymentModal from "@/components/payment-Modal";
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
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState("")
    const { price } = useLocalSearchParams()
    const { userDetails, token } = useDetailHooks();
    const { email, phone, first_name, last_name } = userDetails || {}

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
            if (type === 'failed') {
                setType("")
                setVisible(false)
            }
        } catch (error) {
            console.log(":err", error)
        }
    }

    useEffect(() => {
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
                {url && type === "" &&
                    <WebView
                        source={{ uri: url }}
                        onShouldStartLoadWithRequest={(navState) => {
                            const { loading } = navState || {}
                            if (navState.url.includes("Paid") && !loading) {
                                setType("paid")
                                setVisible(true)
                                return false;
                            }

                            if (navState.url.includes("Failed")) {
                                setType("failed")
                                setVisible(true)
                                return false
                            }
                            return true;
                        }}
                        startInLoadingState
                    />
                }
            </View>
            <PaymentModal
                visible={visible}
                type={type}
                amount={price}
                onClose={() => {
                    if (type === 'paid') {
                        router.replace('/(tabs)')
                    } else {
                        router.back()
                    }

                }}
                onRetry={() => {
                    setVisible(false)
                    fetchPaymentUrl()
                }}
            />
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