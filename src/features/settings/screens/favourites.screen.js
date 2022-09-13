import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { SafeArea } from '../../../components/utility/safe-area.component';

import { FlatList, TouchableOpacity } from "react-native";

import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';

import { FavouritesContext } from '../../../services/favourites/favourites.context';

import { Text } from '../../../components/typography/text.component';


const FavouritesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <FavouritesList 
          data={favourites}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail",{
                restaurant: item,
                  })
                }
              >
                <RestaurantInfoCard restaurant={item} />
              </TouchableOpacity>
            )}}
          keyExtractor={(item) => item.name}
        />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>Add favourite restaurants to see them here!</Text>
    </NoFavouritesArea>
  );
};