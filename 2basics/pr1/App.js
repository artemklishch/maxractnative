import { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./App.styles.js";
import GoalInput from "./components/GoalInput/index.js";
import GoalItem from "./components/GoalItem/index.js";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  // function goalInputHandler(enteredText) {
  //   setEnteredGoalText(enteredText);
  // }
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endGoalHandler() {
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prevGoals) => [
      ...prevGoals,
      // { text: enteredGoalText, key: Math.random().toString() },
      // key - зарезервированное название свойства, к-е компонент  FlatList проверяет по умолчани
      // и если находит присваивает ешл значение атрибуту key списка
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    // setModalIsVisible(false);

    endGoalHandler();
  }
  function deleteGoalHandker(id) {
    setCourseGoals((prevGoals) => prevGoals.filter((item) => item.id !== id));
  }
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoalHandler={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endGoalHandler}
        />

        {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={goalInputHandler}
        />
        <Button title="Add goal" onPress={addGoalHandler} />
      </View> */}
        <View style={styles.goalsContainer}>
          {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal, index) => (
            <View style={styles.goalItem} key={index}>
              <Text style={styles.goalText}>{goal}</Text>
             </View>
          ))}
        </ScrollView> */}
          {/* <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
              </View>
            );
          }}
          alwaysBounceVertical={false}
        /> */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                onDelete={() => deleteGoalHandker(itemData.item.id)}
                text={itemData.item.text}
              />
            )}
            keyExtractor={(item, index) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}
