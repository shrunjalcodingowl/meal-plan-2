import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const { width, height } = Dimensions.get("window");

export default function AddAddressScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [form, setForm] = useState({
    address: "3235 Royal Ln. Mesa, New Jersey 34567",
    street: "Hason Nagar",
    postCode: "34567",
    apartment: "345",
    label: "Home",
  });
  const mapRef = useRef(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSelectLocation = (data, details) => {
    const location = details.geometry.location;

    const newRegion = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }
handleChange("address", data.description);
                handleChange("latitude", location.lat);
                handleChange("longitude", location.lng);
                
    // Extract postal code & street if available
    const components = details.address_components;

    components.forEach((comp) => {
      if (comp.types.includes("postal_code")) {
        handleChange("postCode", comp.long_name);
      }
      if (comp.types.includes("route")) {
        handleChange("street", comp.long_name);
      }
    });
  };

  const renderLabelButton = (value) => (
    <TouchableOpacity
      onPress={() => handleChange("label", value)}
      style={[
        styles.labelButton,
        form.label === value && styles.activeLabel,
      ]}
    >
      <Text
        style={[
          styles.labelText,
          form.label === value && styles.activeLabelText,
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Map Section */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={(reg) => setRegion(reg)}
            >
              <Marker
                coordinate={region}
                draggable
                onDragEnd={(e) =>
                  setRegion({
                    ...region,
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  })
                }
              />
            </MapView>

            <TouchableOpacity style={styles.backBtn}
            onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <View style={styles.mapHint}>
              <Text style={styles.mapHintText}>
                Move to edit location
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>ADDRESS</Text>
            <View style={styles.inputRow}>
              <Feather name="map-pin" size={18} color="#777" />
              <GooglePlacesAutocomplete
            placeholder="Search address"
            fetchDetails={true}
            debounce={300}
            minLength={2}
            enablePoweredByContainer={false}
            onPress={handleSelectLocation}
            query={{
              key: "YOUR_GOOGLE_API_KEY",
              language: "en",
            }}
            styles={{
              textInput: styles.input,
              listView: styles.listView,
            }}
          />
              {/* <TextInput
                style={styles.input}
                value={form.address}
                onChangeText={(text) => handleChange("address", text)}
              /> */}
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>STREET</Text>
                <TextInput
                  style={styles.inputBox}
                  value={form.street}
                  onChangeText={(text) =>
                    handleChange("street", text)
                  }
                />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.label}>POST CODE</Text>
                <TextInput
                  style={styles.inputBox}
                  value={form.postCode}
                  onChangeText={(text) =>
                    handleChange("postCode", text)
                  }
                />
              </View>
            </View>

            <Text style={styles.label}>APPARTMENT</Text>
            <TextInput
              style={styles.inputBox}
              value={form.apartment}
              onChangeText={(text) =>
                handleChange("apartment", text)
              }
            />

            <Text style={styles.label}>LABEL AS</Text>
            <View style={styles.labelRow}>
              {renderLabelButton("Home")}
              {renderLabelButton("Work")}
              {renderLabelButton("Other")}
            </View>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>SAVE LOCATION</Text>
            </TouchableOpacity>
          </View>
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

  mapContainer: {
    height: height * 0.38,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#333",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  mapHint: {
    position: "absolute",
    top: height * 0.15,
    alignSelf: "center",
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  mapHintText: {
    color: "#fff",
    fontSize: 12,
  },

  formContainer: {
    paddingHorizontal: width * 0.06,
    paddingTop: 20,
    paddingBottom: 40,
  },

  label: {
    fontSize: width * 0.035,
    color: "#555",
    marginBottom: 6,
    marginTop: 15,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEFF2",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    backgroundColor: "#EDEFF2",
  },

  inputBox: {
    backgroundColor: "#EDEFF2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },

  row: {
    flexDirection: "row",
  },

  labelRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  labelButton: {
    backgroundColor: "#EDEFF2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 12,
  },

  activeLabel: {
    backgroundColor: "#FF7A1A",
  },

  labelText: {
    color: "#555",
  },

  activeLabelText: {
    color: "#fff",
    fontWeight: "600",
  },

  saveBtn: {
    marginTop: 30,
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
  listView: {
    backgroundColor: "#fff",
    zIndex: 999,
  }
});
