import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import mapReducer from "./slices/mapSlice";
import { restaurantApi } from "./services/restaurant";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
