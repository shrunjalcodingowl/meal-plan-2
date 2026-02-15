import { API_CONSTANTS } from "@/constants/apiConstants";
import { useDetailHooks } from "@/hooks/userHooks";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function AddAddressScreen() {
    const { data, isEdit } = useLocalSearchParams();

    const product = JSON.parse(data);

    const { address_line_1, address_line_2, landmark, city_id, zone_id, district_id, id } = product || {};
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        address1: address_line_1 || "",
        address2: address_line_2 || "",
        landmark: landmark || "",
        city: city_id || "",
        zone: zone_id || "",
        district: district_id || "",
    });
    const [cityList, setCityList] = useState([])
    const [zoneList, setZoneList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const { token } = useDetailHooks()

    const textOnly = /^[A-Za-z\s]+$/;

    const validate = () => {
        let err = {};

        if (!textOnly.test(form.address1))
            err.address1 = "Only characters allowed";

        if (!textOnly.test(form.address2))
            err.address2 = "Only characters allowed";

        if (!textOnly.test(form.landmark))
            err.landmark = "Only characters allowed";

        if (!form.city) err.city = "Select city";
        if (!form.zone) err.zone = "Select zone";
        if (!form.district) err.district = "Select district";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const submit = async () => {
        if (!validate()) return;
        try {
            const params = {
                "address_line_1": form.address1,
                "address_line_2": form.address2,
                "landmark": form.landmark,
                "city_id": form.city,
                "zone_id": form.zone,
                "district_id": form.district
            }
            if(isEdit){
                params["id"] = id
            }
            const response = await axios.post(API_CONSTANTS.addAddress, params, { headers: { Authorization: `Bearer ${token}` } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}

            if (status === 200) {
                router.back()
            }
        } catch (error) {
            console.log(error)
        }

    };

    const fetchZoneList = async (id) => {
        try {
            const params = {
                "city_id": id
            }
            const response = await axios.post(API_CONSTANTS.zonesList, params, { headers: { Authorization: `Bearer ${token}` } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}
            if (mdata.length !== 0) {
                setZoneList(mdata.map((_item) => { return { ["label"]: _item.name, ["value"]: _item.id } }))
            } else {
                setZoneList([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDistrictList = async (id) => {
        try {
            const params = {
                "zone_id": id
            }
            const response = await axios.post(API_CONSTANTS.districtList, params, { headers: { Authorization: `Bearer ${token}` } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}
            if (mdata.length !== 0) {
                setDistrictList(mdata.map((_item) => { return { ["label"]: _item.name, ["value"]: _item.id } }))
            } else {
                setDistrictList([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCityList = async () => {
        try {
            const response = await axios.post(API_CONSTANTS.cityList, {}, { headers: { Authorization: `Bearer ${token}` } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}
            if (mdata.length !== 0) {
                setCityList(mdata.map((_item) => { return { ["label"]: _item.name, ["value"]: _item.id } }))
            } else {
                setCityList([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderInput = (label, key) => (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={form[key]}
                onChangeText={(text) => setForm({ ...form, [key]: text })}
            />
            {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
        </>
    );

    const dropdownStyle = {
        style: styles.dropdown,
        placeholderStyle: styles.placeholder,
        selectedTextStyle: styles.selectedText,
    };

    useState(() => {
        fetchCityList()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={22} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Add Address</Text>
                    </View>

                    {renderInput("Address Line 1", "address1")}
                    {renderInput("Address Line 2", "address2")}
                    {renderInput("Landmark", "landmark")}

                    <Text style={styles.label}>City</Text>
                    <Dropdown
                        {...dropdownStyle}
                        data={cityList}
                        labelField="label"
                        valueField="value"
                        value={form.city}
                        placeholder="Select City"
                        onChange={(item) => {
                            setForm({ ...form, city: item.value })
                            fetchZoneList(item.value)
                        }}
                    />
                    {errors.city && <Text style={styles.error}>{errors.city}</Text>}

                    <Text style={styles.label}>Zone</Text>
                    <Dropdown
                        {...dropdownStyle}
                        data={zoneList}
                        labelField="label"
                        valueField="value"
                        value={form.zone}
                        placeholder="Select Zone"
                        onChange={(item) => {
                            setForm({ ...form, zone: item.value })
                            fetchDistrictList(item.value)
                        }}
                    />
                    {errors.zone && <Text style={styles.error}>{errors.zone}</Text>}

                    <Text style={styles.label}>District</Text>
                    <Dropdown
                        {...dropdownStyle}
                        data={districtList}
                        labelField="label"
                        valueField="value"
                        value={form.district}
                        placeholder="Select District"
                        onChange={(item) => setForm({ ...form, district: item.value })}
                    />
                    {errors.district && <Text style={styles.error}>{errors.district}</Text>}

                    <TouchableOpacity style={styles.saveBtn} onPress={submit}>
                        <Text style={styles.saveText}>SAVE</Text>
                    </TouchableOpacity>
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.02,
        marginBottom: height * 0.03,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: "600",
    },

    label: {
        marginTop: 15,
        fontSize: 13,
        color: "#666",
    },

    input: {
        backgroundColor: "#e9edf2",
        padding: 14,
        borderRadius: 12,
        marginTop: 6,
    },

    dropdown: {
        backgroundColor: "#e9edf2",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginTop: 6,
    },

    placeholder: { color: "#999" },
    selectedText: { color: "#000" },

    error: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },

    saveBtn: {
        backgroundColor: "#ff6b2c",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 30,
        marginBottom: 40,
    },

    saveText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
