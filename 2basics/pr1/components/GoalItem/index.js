import styles from "./GoalItem.styles";
import { View, Text, Pressable } from "react-native";

function GoalItem({ text, onDelete }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={onDelete}
        style={({ pressed }) => pressed && styles.pressedItem }
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
}
export default GoalItem;
