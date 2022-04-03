import { View, TextInput, Button, Modal, Image } from "react-native";
import { useState } from "react";
import styles from "./GoalInput.styles";

function GoalInput({ addGoalHandler, visible, onCancel }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  function addGoal() {
    addGoalHandler(enteredGoalText);
    setEnteredGoalText("");
  }
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/img1.jpg")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonConteiner}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Add goal" onPress={addGoal} color="#5e0cc" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GoalInput;
