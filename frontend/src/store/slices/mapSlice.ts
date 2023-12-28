import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Restaurant } from "../../model/restaurant";

export interface MapState {
  currentPosition: Coordinate | null;
  selectedRestaurant: Restaurant | null;
}

const initialState: MapState = {
  currentPosition: null,
  selectedRestaurant: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentPosition: (state, action: PayloadAction<Coordinate>) => {
      state.currentPosition = action.payload;
    },
    setSelectedRestaurant: (
      state,
      action: PayloadAction<Restaurant | null>,
    ) => {
      state.selectedRestaurant = action.payload;
    },
  },
});

export const { setCurrentPosition, setSelectedRestaurant } = mapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const selectPosition = (state: RootState) => state.map.currentPosition;
export const selectSelectedRestaurant = (state: RootState) =>
  state.map.selectedRestaurant;

export default mapSlice.reducer;
