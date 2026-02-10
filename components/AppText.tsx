import { Text, TextProps, StyleSheet } from "react-native";
import { Fonts } from "@/constants/fonts";
import Colors from "@/constants/colors";

interface Props extends TextProps {
  variant?: "regular" | "medium" | "semiBold" | "bold";
}

export default function AppText({
  variant = "regular",
  style,
  ...props
}: Props) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        { fontFamily: Fonts[variant] },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.textPrimary,
  },
});
