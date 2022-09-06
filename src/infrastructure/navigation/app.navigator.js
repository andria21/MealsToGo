import React, { useContext } from "react";

import { RestaurantNavigatior } from "./restaurants.navigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from "../../components/typography/text.component";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Ionicons } from '@expo/vector-icons';

import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { MapScreen } from "../../features/map/screens/map.screen";
import { Button } from "react-native";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextPovider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings"
};



const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings!</Text>
      <Button title="logout" onPress={() => onLogout()}>logout</Button>
    </SafeArea>
  );
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  }
}

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextPovider>
      <RestaurantsContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
          <Tab.Screen name="Restaurants" component={RestaurantNavigatior} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationContextPovider>
  </FavouritesContextProvider>
);