import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "../types";
import { allGames, gameById, createGame, updateGame, deleteGame } from "./actions";


const initialState: State = {
  videogames: [],
  videogamesBackup: [],
  videogameDetail: null,
  name: '',
  message: ''
}



export const videogamesSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    name: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    clean: state => {
      state.videogames = []
    },
    restart: state => {
      state.videogameDetail = null
    },
    restore: state => {
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(allGames.fulfilled, (state, action) => {
        state.videogames = [...state.videogames, ...action.payload];
        state.videogamesBackup = action.payload
      })

    builder.addCase(gameById.fulfilled, (state, action) => {
        state.videogameDetail = action.payload
      })

    builder.addCase(createGame.fulfilled, (state, action) => {
        state.message = action.payload
      })
    builder.addCase(updateGame.fulfilled, (state, action) => {
        state.message = action.payload
      })

    builder.addCase(deleteGame.fulfilled, (state, action) => {
        state.message = action.payload
      })

  }
})


export const { clean, name, restart, restore } = videogamesSlice.actions;
export default videogamesSlice.reducer;
