import React, { useContext, useState } from "react";
//import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { FlatList, TouchableOpacity } from "react-native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { ActivityIndicator, Colors } from 'react-native-paper';

import { Search } from "../components/search.component";

import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";


const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  }
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;  

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  
  return (
    <>
      <SafeArea>
      {isLoading && (
          <LoadingContainer>
            <Loading
              size={50}
              animating={true}
              color={Colors.blue300}
            />
          </LoadingContainer>
        )}
        <Search isFavouritesToggled={isToggled} onFavouritesToggle={() => setIsToggled(!isToggled)} />
        {isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />}
        <RestaurantList 
          data={restaurants}
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
    </>
  );
}
