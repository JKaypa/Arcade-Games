import { configureStore } from "@reduxjs/toolkit";
import videogamesReducer from "./videogamesSlice";


export const store = configureStore({
  reducer: {
    videogames: videogamesReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>