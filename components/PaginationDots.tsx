import Colors from "@/constants/colors";
import { StyleSheet, View } from "react-native";

interface Props {
  total: number;
  activeIndex: number;
}

export default function PaginationDots({ total, activeIndex }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex && styles.active,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dotInactive,
  },
  active: {
    backgroundColor: Colors.dotActive,
  },
});
