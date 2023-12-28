import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface MapState {
  currentPosition: Coordinate | null;
}

const initialState: MapState = {
  currentPosition: null,
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
  },
});

export const { setCurrentPosition } = mapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const selectPosition = (state: RootState) => state.map.currentPosition;

export default mapSlice.reducer;
