import { StyleSheet, View, Text } from "react-native";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";

import MealsList from "../components/MealsList/MealsList";

function FavoritesScreen() {
  const { ids } = useSelector((state) => state.favoriteMeals);
  // const favoritesMealsCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    // favoritesMealsCtx.ids.includes(meal.id)
    ids.includes(meal.id)
  );
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet</Text>
      </View>
    );
  }
  return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
