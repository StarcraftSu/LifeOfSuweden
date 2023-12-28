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
  const mapEvents = new H.mapevents.MapEvents(newMap);
  new H.mapevents.Behavior(mapEvents);
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

export const calculateRoute = (
  platform: React.MutableRefObject<H.service.Platform | null>,
  map: React.MutableRefObject<H.Map | null>,
  start: Coordinate,
  destination: Coordinate,
  restaurantList: Restaurant[],
) => {
  if (!platform.current || !map.current) return;

  const routeResponseHandler = (
    response: H.service.RoutingService.RoutingServiceResult,
  ) => {
    const sections = response.routes[0].sections;
    const lineStrings: H.geo.LineString[] = [];
    sections.forEach((section) => {
      // convert Flexible Polyline encoded string to geometry
      lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
    });
    const multiLineString = new H.geo.MultiLineString(lineStrings);
    multiLineString.getBoundingBox();

    // Create the polyline for the route
    const routePolyline = new H.map.Polyline(multiLineString, {
      style: {
        lineWidth: 5,
        lineDash: [1, 2],
        lineCap: "round",
      },
    });

    addMarker(restaurantList, start, map);
    map.current!.addObject(routePolyline);
  };

  // Get an instance of the H.service.RoutingService8 service
  const router = platform.current.getRoutingService(undefined, 8);

  // Define the routing service parameters
  const routingParams = {
    origin: `${start.lat},${start.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    transportMode: "car",
    return: "polyline",
  };
  // Call the routing service with the defined parameters
  router.calculateRoute(routingParams, routeResponseHandler, console.error);
};
