import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import positionReducer from "./slices/positionSlice"

export const store = configureStore({
  reducer: {
    position: positionReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>