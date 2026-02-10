import AppText from "@/components/AppText";
import PaginationDots from "@/components/PaginationDots";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export const unstable_settings = {
  headerShown: false,
};

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    title: "Fresh Meals\nEvery Day",
    description:
      "Enjoy chef-prepared meals made fresh daily and delivered straight to your doorstep.",
    image: require("../assets/images/onboarding-1.png"),
  },
  {
    title: "Shop Premium\nWellness Products",
    description:
      "Choose from categories like Clean and Lean, Nourish, or Athletic, and customize your plan to match your dietary preferences and goals.",
    image: require("../assets/images/onboarding-2.png"),
  },
  {
    title: "Nutrition On\nYour Schedule",
    description:
      "Choose from categories like Clean and Lean, Nourish, or Athletic, and customize your plan to match your dietary preferences and goals.",
    image: require("../assets/images/onboarding-3.png"),
  },
  {
    title: "More Than\nJust Meals",
    description:
      "Choose from categories like Clean and Lean, Nourish, or Athletic, and customize your plan to match your dietary preferences and goals.",
    image: require("../assets/images/onboarding-4.png"),
    isLast: true,
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/welcome");
    }
  };


  return (
    <View style={styles.container}>
      {/* SLIDER */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <ImageBackground
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            >
              <View style={styles.textContainer}>
                <AppText variant="bold" style={styles.title}>
                  {item.title}
                </AppText>

                <AppText style={styles.description}>
                  {item.description}
                </AppText>
              </View>
            </ImageBackground>
          </View>
        )}
      />

      {/* FIXED BOTTOM CONTROLS */}
      <View style={styles.bottomArea}>
        <PaginationDots
          total={SLIDES.length}
          activeIndex={activeIndex}
        />

        <Pressable
          style={[
            styles.button,
            SLIDES[activeIndex]?.isLast && styles.startButton,
          ]}
          onPress={handleNext}
        >
          <AppText
            variant="medium"
            style={[
              styles.buttonText,
              SLIDES[activeIndex]?.isLast && styles.startText,
            ]}
          >
            {SLIDES[activeIndex]?.isLast ? "Let’s Start" : "Next →"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120, // space for fixed bottom controls
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    color: Colors.white,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textMuted,
    maxWidth: "90%",
  },
  bottomArea: {
    position: "absolute",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.accent,
  },
  startButton: {
    backgroundColor: Colors.accent,
    borderRadius: 24,
    paddingHorizontal: 36,
    paddingVertical: 12,
  },
  startText: {
    color: "#1B1B1B",
    fontSize: 16,
  },
});
