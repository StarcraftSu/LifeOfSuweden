import { skipToken } from "@reduxjs/toolkit/query/react";

import RestaurantDrawer from "../components/Drawer";
import {
  selectPosition,
  selectSelectedRestaurant,
  setSelectedRestaurant,
} from "../store/slices/mapSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useGetRestaurantByCoordQuery } from "../store/services/restaurant";
import { Restaurant } from "../model/restaurant";

interface Props {
  apikey: string;
}

const Restaurant: React.FunctionComponent<Props> = ({ apikey }) => {
  const position = useAppSelector(selectPosition);
  const dispatch = useAppDispatch();
  const selectedRestaurant = useAppSelector(selectSelectedRestaurant);

  const handleClick = (restaurant: Restaurant | null) =>
    dispatch(setSelectedRestaurant(restaurant));

  const {
    data = [],
    isSuccess,
    isFetching,
    isLoading,
  } = useGetRestaurantByCoordQuery(
    position
      ? {
          apiKey: apikey,
          position,
        }
      : skipToken,
  );

  return (
    <RestaurantDrawer
      isLoading={!isSuccess || isFetching || isLoading}
      restaurantList={data}
      selectedRestaurant={selectedRestaurant}
      handleClick={handleClick}
    />
  );
};

export default Restaurant;
