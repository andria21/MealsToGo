import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);

import { AuthenticationContext } from '../authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setfavourites] = useState([]);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)
    } catch (e) {
      console.log("Error storing", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`)
      if(value !== null) {
        setfavourites(JSON.parse(value));
      }
    } catch(e) {
      console.log("Error loading", e);
    }
  };

  const add = (restaurant) => {
    setfavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newfavourites = favourites.filter((x) => x.placeId !== restaurant.placeId);
    setfavourites(newfavourites);
  }

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};