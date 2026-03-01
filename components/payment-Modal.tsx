import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Modal, TouchableOpacity } from "react-native";

export default function PaymentModal({
    visible,
    onClose,
    amount = "₹0",
    type,
    onRetry
}) {
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();
        if (visible) {
            if (type === 'paid') {
                const timer = setTimeout(onClose, 2500);
                return () => clearTimeout(timer);
            }
        }
    }, [visible]);

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.container}>
                <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
                    <Text style={styles.tick}>✕</Text>
                </Animated.View>
                {type == "paid" ? (
                    <>
                        <Text style={styles.title}>Payment Successful</Text>
                        <Text style={styles.subtitle}>
                            Your transaction has been completed successfully.
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Payment Failed</Text>

                        <Text style={styles.amount}>{amount}</Text>

                        <Text style={styles.message}>{"Payment could not be processed"}</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
                                <Text style={styles.retryText}>Retry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                                <Text style={styles.closeText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        // backgroundColor: "#16a34a",
        backgroundColor: "#ef4444",
        justifyContent: "center",
        alignItems: "center",
    },
    tick: {
        fontSize: 60,
        color: "#fff",
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        color: "#16a34a",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
        marginTop: 10,
    },
    amount: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    message: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
    },
    retryBtn: {
        backgroundColor: "#ef4444",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 10,
    },
    retryText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    closeBtn: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 10,
    },
    closeText: {
        fontWeight: "600",
        fontSize: 16,
    },
});