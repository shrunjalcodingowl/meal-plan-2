import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Dimensions,
    Alert,
    RefreshControl,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import { API_CONSTANTS } from "@/constants/apiConstants";
import { useDetailHooks } from "@/hooks/userHooks";
import { useDispatch } from "react-redux";
import { selectedAdress } from "@/Redux/Actions/UserAction";

const { width, height } = Dimensions.get("window");

export default function MyAddressScreen() {
    const { token } = useDetailHooks()
    const [addresses, setAddresses] = useState([]);
    const dispatch = useDispatch();

    const fetchAddressList = async () => {
        try {
            const response = await axios.post(API_CONSTANTS.addressList, {}, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}
            if (status === 200) {
                if (mdata.length !== 0) {
                    setAddresses(mdata)
                    const select_address = mdata.filter(item => item.is_default == 1);
                    if (select_address.length !== 0) {
                        dispatch(selectedAdress(select_address[0]))
                    } else {
                        dispatch(selectedAdress(mdata[0]))
                    }
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchAddressList()
    }, [])

    const handleDelete = async (id) => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const params = {
                                "address_id": id
                            }
                            await axios.post(API_CONSTANTS.deleteAddress, params, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })

                            fetchAddressList()
                        } catch (error) {

                        }
                    },
                },
            ],
            { cancelable: true }
        );

    };

    const setDefaultAddress = async (id) => {
        try {
            const params = {
                "address_id": id
            }
            await axios.post(API_CONSTANTS.defaultAddress, params, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })

            fetchAddressList()
        } catch (error) {

        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.leftSection}>
                <View style={styles.iconCircle}>
                    <Feather name={"briefcase"} size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.type}>{"WORK"}</Text>
                    <Text style={styles.address}>{`${item.address_line_1} ${item.address_line_2} ${item.landmark}`}</Text>
                    <View style={{ marginTop: 5 }}>
                        {item.is_default ? <Text style={{ color: 'green' }}>Default</Text> : <TouchableOpacity onPress={() => setDefaultAddress(item.id)}><Text style={{ color: "orange" }}>Set Default</Text></TouchableOpacity>}
                    </View>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}
                    onPress={() => { router.push({ pathname: "/addAddress", params: { data: JSON.stringify(item), isEdit: true } }) }}
                >
                    <Feather name="edit-2" size={18} color="#FF7A1A" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(item.id)}
                >
                    <Feather name="trash-2" size={18} color="#FF4D4F" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.roundButton}
                    onPress={() => { router.back() }}
                >
                    <Ionicons name="chevron-back" size={22} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>My Address</Text>

                <View style={{ width: 40 }} />
            </View>

            {/* Address List */}
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: height * 0.15 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={fetchAddressList} />
                }
            />

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => router.push("/addAddress")}
                >
                    <Text style={styles.addText}>ADD NEW ADDRESS</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.06,
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
    },

    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: "600",
    },

    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        backgroundColor: "#EDEFF2",
        marginHorizontal: width * 0.06,
        marginBottom: height * 0.02,
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    leftSection: {
        flexDirection: "row",
        flex: 1,
    },

    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },

    type: {
        fontSize: width * 0.04,
        fontWeight: "600",
        marginBottom: 4,
    },

    address: {
        fontSize: width * 0.035,
        color: "#777",
    },

    actions: {
        flexDirection: "row",
    },

    actionBtn: {
        marginLeft: 12,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    addButton: {
        backgroundColor: "#FF7A1A",
        width: width * 0.88,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },

    addText: {
        color: "#fff",
        fontSize: width * 0.045,
        fontWeight: "600",
        letterSpacing: 1,
    },
});
