import { Restaurant } from "../../model/restaurant";

import ninja from "../../images/ninja.svg";
import restaurant from "../../images/restaurant.svg";

export const initializeMap = (
  apikey: string,
  platform: React.MutableRefObject<H.service.Platform | null>,
  mapRef: React.RefObject<HTMLDivElement>,
  currentPosition: Coordinate,
): H.Map => {
  platform.current = new H.service.Platform({ apikey });
  const defaultLayers = platform.current.createDefaultLayers();

  const newMap = new H.Map(
    mapRef.current as HTMLElement,
    defaultLayers.vector.normal.map,
    {
      pixelRatio: window.devicePixelRatio || 1,
      center: currentPosition,
      zoom: 14,
    },
  );

  // Add panning and zooming behavior to the map
  new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
  // Creates the default UI with controls
  H.ui.UI.createDefault(newMap, defaultLayers);

  return newMap;
};

export const addMarker = (
  restaurantList: Restaurant[],
  currentPosition: Coordinate | null,
  map: React.MutableRefObject<H.Map | null>,
) => {
  if (map.current && restaurantList.length > 0 && currentPosition) {
    const markerList = restaurantList.map(
      ({ position }) =>
        new H.map.Marker(position, { icon: new H.map.Icon(restaurant) }),
    );

    const iAmNinja = new H.map.Marker(currentPosition, {
      icon: new H.map.Icon(ninja),
    });

    map.current.removeObjects(map.current.getObjects());
    map.current.addObject(iAmNinja);
    map.current.addObjects(markerList);
  }
};
