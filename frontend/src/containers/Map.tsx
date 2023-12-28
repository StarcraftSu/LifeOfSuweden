import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { selectPosition, setCurrentPosition } from "../store/slices/mapSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useGetRestaurantByCoordQuery } from "../store/services/restaurant";

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
      platform.current = new H.service.Platform({ apikey });
      const defaultLayers = platform.current.createDefaultLayers();

      const newMap = new H.Map(
        mapRef.current as HTMLElement,
        defaultLayers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio || 1,
          center: currentPosition,
          zoom: 12,
        },
      );

      // Add panning and zooming behavior to the map
      new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
      // Creates the default UI with controls
      H.ui.UI.createDefault(newMap, defaultLayers);

      map.current = newMap;

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
    if (restaurantList.length > 0 && map.current) {
      const markerList = restaurantList.map(
        ({ position }) => new H.map.Marker(position),
      );

        map.current?.addObjects(markerList);
        map.current.setZoom(13);
    }
  }, [restaurantList, map.current]);

  return <Box ref={mapRef} sx={{ width: "100vw", height: "100vh" }} />;
};

export default Map;
