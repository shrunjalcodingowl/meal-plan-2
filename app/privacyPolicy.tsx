import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RenderHTML from "react-native-render-html";

const { width, height } = Dimensions.get("window");
export default function PrivacyPolicyScreen() {

    const [html, setHtml] = useState(null);
    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            const res = await fetch(
                "https://www.evergreenorganics.qa/policies/privacy-policy"
            );
            const text = await res.text();
            const bodyContent = text.match(/<main[\s\S]*<\/main>/i);
            setHtml(bodyContent ? bodyContent[0] : text);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                    <Ionicons name="chevron-back" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy & Policy</Text>
            </View>
            <ScrollView>
                {!html ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <RenderHTML contentWidth={width} source={{ html }} />
                )}
            </ScrollView>
        </View>
    )
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
        flex: 1,
        textAlign: "center",
        fontSize: width * 0.05,
        fontWeight: "600",
    },
})