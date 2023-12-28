import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  convertJsonToRestaurant,
  type Restaurant,
} from "../../model/restaurant";

const suggestAPI = "https://autosuggest.search.hereapi.com/v1/autosuggest";

export interface GetSuggestQuery {
  apiKey: string;
  position: Coordinate;
}

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: suggestAPI }),
  endpoints: (builder) => ({
    getRestaurantByCoord: builder.query<Restaurant[], GetSuggestQuery>({
      query: ({ apiKey, position }) => ({
        url: "",
        params: {
          apiKey,
          at: `${position.lat},${position.lng}`,
          limit: 11,
          resultType: "city",
          q: "restaurant",
        },
      }),
      transformResponse: (data: { items: RestaurantJson[] }) =>
        // filter out the dummy data in the api
        data.items
          .map((item) => convertJsonToRestaurant(item))
          .filter(({ name }) => name !== "Restaurant"),
    }),
  }),
});

export const { useGetRestaurantByCoordQuery } = restaurantApi;
