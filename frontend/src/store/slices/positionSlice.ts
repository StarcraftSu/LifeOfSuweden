import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface Coordinate {
    lat: number;
    lng: number;
}

export interface PositionState {
    currentPosition: Coordinate;
}

const BROMMA_COORD = {
    lat: 59.358353,
    lng: 17.907425,
}

const initialState: PositionState = {
  currentPosition: BROMMA_COORD,
}

export const positionSlice = createSlice({
  name: "position",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentPosition: (state, action: PayloadAction<Coordinate>) => {
          state.currentPosition = action.payload;
    },
  },
})

export const { setCurrentPosition } = positionSlice.actions

// The function below is called a selector and allows us to select a value from
// the state.
export const selectPosition = (state: RootState) => state.position.currentPosition;

export default positionSlice.reducer