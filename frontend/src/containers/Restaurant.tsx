import { skipToken } from "@reduxjs/toolkit/query/react";

import RestaurantDrawer from "../components/Drawer";
import { selectPosition } from "../store/slices/mapSlice";
import { useAppSelector } from "../store/hooks";
import { useGetRestaurantByCoordQuery } from "../store/services/restaurant";

interface Props {
  apikey: string;
}

const Restaurant: React.FunctionComponent<Props> = ({ apikey }) => {
  const position = useAppSelector(selectPosition);
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
    />
  );
};

export default Restaurant;
