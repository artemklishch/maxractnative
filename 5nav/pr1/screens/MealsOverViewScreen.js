import { MEALS } from "../data/dummy-data";
import { View, StyleSheet, FlatList, Text } from "react-native";
// import { useRoute } from '@react-navigation/native'

import MealItem from "../components/MealItem";

function MealsOverViewScreen({ navigation, route }) {
  // const routeData = useRoute()
  // console.log('rorouteData', routeData)
  const catId = route.params.categoryId;
  const displiedMeals = MEALS.filter((item) => {
    return item.categoryIds.indexOf(catId) >= 0;
  });
  function renderMeakItem(itemData) {
    return <MealItem title={itemData.item.title} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={displiedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMeakItem}
      />
    </View>
  );
}
export default MealsOverViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
