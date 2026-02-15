import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Platform,
    Dimensions,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { API_CONSTANTS, IMAGE_BASE_API } from "@/constants/apiConstants";
import { router } from "expo-router";
import axios from "axios";
import { useDetailHooks } from "@/hooks/userHooks";

const { width, height } = Dimensions.get("window");
export default function ProfileScreen() {
    const [editable, setEditable] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const { token, userDetails } = useDetailHooks()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        weight: "",
        height: "",
        goal: "",
        activity: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await axios.post(API_CONSTANTS.getProfile, {}, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}
            setForm({
                firstName: mdata.first_name || "",
                lastName: mdata.last_name || "",
                email: mdata.email || "",
                phone: mdata.phone || "",
                gender: mdata.gender || "",
                dob: new Date(mdata.date_of_birth).toISOString().slice(0, 10) || "",
                weight: mdata.weight_kg || "",
                height: mdata.height_cm || "",
                goal: mdata.goal || "",
                activity: mdata.activity_level || "",
                image: mdata.image_path ? IMAGE_BASE_API + mdata.image_path : null,
            });
        } catch (e) {
            console.log("API error", e);
        }
    };

    const pickImage = async () => {
        if (!editable) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.canceled) {
            setForm({ ...form, image: result.assets[0].uri });
        }
    };

    const validate = () => {
        let err = {};

        if (!/^[A-Za-z]+$/.test(form.firstName))
            err.firstName = "Only characters allowed";

        if (!/^[A-Za-z]+$/.test(form.lastName))
            err.lastName = "Only characters allowed";

        if (!/\S+@\S+\.\S+/.test(form.email))
            err.email = "Invalid email";

        if (!/^[0-9]{7,15}$/.test(form.phone))
            err.phone = "Invalid phone number";

        if (!form.gender) err.gender = "Select gender";
        if (!form.goal) err.goal = "Select goal";
        if (!form.activity) err.activity = "Select activity";
        if (!form.dob) err.dob = "Select DOB";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const submit = async () => {
        if (!editable) return;
        if (!validate()) return;

        const formData = new FormData();
        setLoading(true);
        const fileName = form.image ? form.image.split('/').pop() : "";

        // get file extension
        const fileType = fileName.split('.').pop();
        formData.append("first_name", form.firstName);
        formData.append("last_name", form.lastName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("gender", form.gender);
        formData.append("date_of_birth", form.dob);
        formData.append("weight_kg", form.weight);
        formData.append("height_cm", form.height);
        formData.append("goal", form.goal);
        formData.append("activity_level", form.activity);

        formData.append("image", {
            uri: form.image,
            name: fileName,   // file name
            type: `image/${fileType}`,    // mime type
        });
        try {
            const response = await axios.post(
                API_CONSTANTS.saveProfile,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`, // if required
                    },
                }
            );

            const { data, status } = response || {}
            if (status === 200) {
                router.back()
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.response?.data || error.message);
        }
    };

    const renderInput = (label, key, keyboard = "default") => (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                editable={editable}
                style={styles.input}
                keyboardType={keyboard}
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

    const genderData = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const goalData = [
        { label: "Lose Weight", value: "weight_loss" },
        { label: "Gain Weight", value: "weight_gain" },
        { label: "Maintain Weight", value: "maintain_weight" },
        { label: "Gain Muscles", value: "gain_muscle" },
    ];

    const activityData = [
        { label: "Not Active (0-1 Day)", value: 1 },
        { label: "Active (1-3 Days)", value: 2 },
        { label: "Very Active (3-5 Days)", value: 3 },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex}
        >
            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                        <Ionicons name="chevron-back" size={22} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <TouchableOpacity onPress={() => setEditable(!editable)}>
                        <Text style={styles.editBtn}>
                            {editable ? "Done" : "Edit"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageWrapper}>
                    <Image source={{ uri: form.image }} style={styles.profileCircle} />
                    <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                        <Ionicons name="pencil" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>

                {renderInput("First Name", "firstName")}
                {renderInput("Last Name", "lastName")}
                {renderInput("Email", "email")}
                {renderInput("Phone Number", "phone", "number-pad")}

                <Text style={styles.label}>Gender</Text>
                <Dropdown
                    {...dropdownStyle}
                    data={genderData}
                    labelField="label"
                    valueField="value"
                    value={form.gender}
                    disable={!editable}
                    onChange={(item) => setForm({ ...form, gender: item.value })}
                />
                {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                    style={styles.input}
                    disabled={!editable}
                    onPress={() => setShowDate(true)}
                >
                    <Text>{form.dob || "Select date"}</Text>
                </TouchableOpacity>
                {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

                {showDate && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(e, date) => {
                            setShowDate(false);
                            if (date)
                                setForm({
                                    ...form,
                                    dob: date.toISOString().split("T")[0],
                                });
                        }}
                    />
                )}

                {renderInput("Weight (Kg)", "weight", "numeric")}
                {renderInput("Height (cm)", "height", "numeric")}

                <Text style={styles.label}>Goal</Text>
                <Dropdown
                    {...dropdownStyle}
                    data={goalData}
                    labelField="label"
                    valueField="value"
                    value={form.goal}
                    disable={!editable}
                    onChange={(item) => setForm({ ...form, goal: item.value })}
                />
                {errors.goal && <Text style={styles.error}>{errors.goal}</Text>}

                <Text style={styles.label}>Activity</Text>
                <Dropdown
                    {...dropdownStyle}
                    data={activityData}
                    labelField="label"
                    valueField="value"
                    value={form.activity}
                    disable={!editable}
                    onChange={(item) => setForm({ ...form, activity: item.value })}
                />
                {errors.activity && <Text style={styles.error}>{errors.activity}</Text>}

                <TouchableOpacity style={styles.saveBtn} onPress={submit}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>SAVE</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.02,
        marginBottom: height * 0.03,
        justifyContent: 'space-between'
    },
    editBtn: { color: "#ff7a1a", fontWeight: "bold", fontSize: 16 },
    flex: {
        flex: 1,
    },
    imageWrapper: {
        alignItems: "center",
        marginBottom: height * 0.04,
    },
    image: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#ddd" },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDEDED",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    label: { marginTop: 15, fontSize: 13, color: "#666" },
    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#e9edf2",
        padding: 14,
        borderRadius: 12,
        marginTop: 6,
    },
    editIcon: {
        position: "absolute",
        bottom: 10,
        right: width * 0.28,
        backgroundColor: "#FF7A1A",
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    profileCircle: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: (width * 0.35) / 2,
        backgroundColor: "#E6B199",
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

    error: { color: "red", fontSize: 12, marginTop: 4 },

    saveBtn: {
        backgroundColor: "#ff7a1a",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
        marginVertical: 30,
    },
});
