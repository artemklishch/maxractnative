import { MEALS, CATEGORIES } from "../data/dummy-data";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useLayoutEffect } from "react";
// import { useRoute } from '@react-navigation/native'

import MealItem from "../components/MealItem";

function MealsOverViewScreen({ navigation, route }) {
  // const routeData = useRoute()
  // console.log('rorouteData', routeData)
  const catId = route.params.categoryId;
  const displiedMeals = MEALS.filter((item) => {
    return item.categoryIds.indexOf(catId) >= 0;
  });
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((item) => item.id === catId).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);
  function renderMeakItem(itemData) {
    const mealItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      duration: itemData.item.duration,
      complexity: itemData.item.complexity,
      affordability: itemData.item.affordability,
    };
    return <MealItem {...mealItemProps} />;
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
