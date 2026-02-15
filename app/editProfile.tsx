import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import { API_CONSTANTS, BASE_API, IMAGE_BASE_API } from "@/constants/apiConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useDetailHooks } from "@/hooks/userHooks";

const { width, height } = Dimensions.get("window");

export default function EditProfileScreen() {

    const { token, userDetails } = useDetailHooks()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        bio: "",
        image: ""
    })
    const profileData = useRef(null);
    useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = async () => {
        try {
            const response = await axios.post(API_CONSTANTS.getProfile, {}, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })

            const { status, data } = response || {}
            const { data: mdata } = data || {}

            if (status === 200) {
                profileData.current = mdata;
                setForm({
                    ...form,
                    ["firstName"]: mdata.first_name,
                    ["lastName"]: mdata.last_name,
                    ["email"]: mdata.email,
                    ["number"]: mdata.phone,
                    ["image"]: mdata.image_path,
                    ["bio"]: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitHandler = async () => {

        const formData = new FormData();

        const fileName = form.image ? form.image.split('/').pop() : "";

        // get file extension
        const fileType = fileName.split('.').pop();
        formData.append("first_name", "");
        formData.append("last_name", "");
        formData.append("email", "");
        formData.append("phone", "");
        formData.append("gender", "");
        formData.append("date_of_birth", "");
        formData.append("weight_kg", "");
        formData.append("height_cm", "");
        formData.append("goal", "");
        formData.append("activity_level", "");

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

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            handleChange("image", result.assets[0])
        }
    };

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={22} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Profile</Text>
                    </View>

                    {/* Profile Image */}
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: IMAGE_BASE_API + form.image }} style={styles.profileCircle} />
                        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                            <Ionicons name="pencil" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>FULL NAME</Text>
                        <TextInput
                            placeholder="Vishal Khadok"
                            style={styles.input}
                            value={(form.firstName ? form.firstName : "") + " " + (form.lastName ? form.lastName : "")}
                            onChangeText={(text) =>
                                handleChange("firstName", text)
                            }
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>EMAIL</Text>
                        <TextInput
                            placeholder="hello@halallab.co"
                            style={styles.input}
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) =>
                                handleChange("email", text)
                            }
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>PHONE NUMBER</Text>
                        <TextInput
                            placeholder="408-841-0926"
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={form.number}
                            onChangeText={(text) =>
                                handleChange("number", text)
                            }
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>BIO</Text>
                        <TextInput
                            placeholder="I love fast food"
                            style={[styles.input, styles.bioInput]}
                            multiline
                            value={form.bio}
                            onChangeText={(text) =>
                                handleChange("bio", text)
                            }
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={onSubmitHandler}>
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
        paddingHorizontal: width * 0.06,
        paddingBottom: 40,
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
    imageWrapper: {
        alignItems: "center",
        marginBottom: height * 0.04,
    },
    profileCircle: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: (width * 0.35) / 2,
        backgroundColor: "#E6B199",
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
    inputGroup: {
        marginBottom: height * 0.025,
    },
    label: {
        fontSize: width * 0.035,
        letterSpacing: 1,
        marginBottom: 6,
        color: "#555",
    },
    input: {
        backgroundColor: "#EDEFF2",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: width * 0.04,
    },
    bioInput: {
        height: height * 0.12,
        textAlignVertical: "top",
    },
    saveButton: {
        marginTop: height * 0.03,
        backgroundColor: "#FF7A1A",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontSize: width * 0.045,
        fontWeight: "600",
        letterSpacing: 1,
    },
});
