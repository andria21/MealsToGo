import React, { createContext, useState, useEffect } from "react";
 
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextPovider = ({ children}) => {
  const [location, setLocation] = useState(null);
  const [keyword, setkeyword] = useState("San Francisco");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setkeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    locationRequest(keyword.toLowerCase())
    .then(locationTransform)
    .then((result) => {
      setIsLoading(false);
      setLocation(result);
    }).catch(err => {
      setIsLoading(false);
      setError(err);
    })
  }, [keyword])

  return (
    <LocationContext.Provider
    value={{
      isLoading,
      error,
      location,
      search: onSearch,
      keyword,
    }}
    >
      {children}
    </LocationContext.Provider>
  )
}