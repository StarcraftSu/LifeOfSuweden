import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  selectPosition,
  setCurrentPosition,
} from "../../store/slices/mapSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useGetRestaurantByCoordQuery } from "../../store/services/restaurant";
import LoadingContainer from "../../components/common/LoadingContainer";
import { addMarker, initializeMap } from "./helper";

interface Props {
  apikey: string;
}

const BROMMA_COORD = {
  lat: 59.358353,
  lng: 17.907425,
};

const Map: React.FunctionComponent<Props> = ({ apikey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<H.Map | null>(null);
  const platform = useRef<H.service.Platform | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentPosition = useAppSelector(selectPosition);
  const dispatch = useAppDispatch();

  const { data: restaurantList = [] } = useGetRestaurantByCoordQuery(
    currentPosition
      ? {
          apiKey: apikey,
          position: currentPosition,
        }
      : skipToken,
  );

  // Get current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        dispatch(setCurrentPosition({ lat, lng }));
      },
      () => {
        dispatch(setCurrentPosition(BROMMA_COORD));
      },
    );
  }, []);

  // Init Map
  useEffect(() => {
    if (!map.current && currentPosition) {
      const newMap = initializeMap(apikey, platform, mapRef, currentPosition);
      map.current = newMap;
      setIsInitialized(true);

      window.addEventListener("resize", () => newMap.getViewPort().resize());
    }
  }, [apikey, currentPosition]);

  // Recenter if user allow the browser getting the current position
  useEffect(() => {
    if (map.current && currentPosition) {
      map.current.setCenter(currentPosition);
    }
  }, [currentPosition]);

  useEffect(() => {
    addMarker(restaurantList, currentPosition, map);
  }, [restaurantList, currentPosition, map.current]);

  return (
    <Box sx={{ flex: "100vw", height: "100vh", position: "relative" }}>
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
      <Box
        ref={mapRef}
        sx={{
          width: "100%",
          height: "100%",
          opacity: isInitialized ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />
    </Box>
  );
};

export default Map;
