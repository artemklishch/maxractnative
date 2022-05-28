import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoriteContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);
  function addFavorite(id) {
    setFavoriteMealIds((prevIds) => [...prevIds, id]);
  }
  function removeFavorite(id) {
    setFavoriteMealIds((prevIds) =>
      prevIds.filter((identifier) => identifier !== id)
    );
  }
  return (
    <FavoritesContext.Provider
      value={{ ids: favoriteMealIds, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoriteContextProvider;
