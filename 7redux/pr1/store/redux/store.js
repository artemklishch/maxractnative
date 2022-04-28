import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorires";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer,
  },
});
