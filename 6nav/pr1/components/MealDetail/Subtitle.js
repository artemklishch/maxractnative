import { View, Text, StyleSheet } from "react-native";

function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}
export default Subtitle;

const styles = StyleSheet.create({
  subtitleContainer: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    margin: 4,
    padding: 6,
    marginHorizontal: 12,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
});
