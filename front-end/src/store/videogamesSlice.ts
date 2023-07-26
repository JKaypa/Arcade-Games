import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, Options } from "../types";
import { allGames, gameById, createGame, updateGame, deleteGame } from "./actions";


const initialState: State = {
  videogames: [],
  videogamesBackup: [],
  videogameDetail: null,
  message: ''
}



export const videogamesSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    restart: state => {
      state.videogameDetail = null
    },
    restore: state => {
      state.message = ''
    },
    filter: (state, action: PayloadAction<Options>) => {
      if(action.payload.value === 'All') 
          state.videogames = state.videogamesBackup

      else if(action.payload.name === 'genres' || action.payload.name === 'platforms') {
        state.videogames = state.videogamesBackup.filter(game => {
          type key = keyof typeof game;
          const prop = action.payload.name as key
          const value = game[prop]
          return Array.isArray(value)
          && value.find(name => name === action.payload.value)
        })        
      }
      else if(action.payload.value === 'database')
          state.videogames = state.videogamesBackup.filter(game => typeof game.id === 'string')

      else 
          state.videogames = state.videogamesBackup.filter(game => typeof game.id === 'number')
    },
    order: (state, action: PayloadAction<string>) => {
      if(action.payload === 'ascending') 
          state.videogames.sort((a, b) => parseInt(a.rating) - parseInt(b.rating))

      else if(action.payload === 'descending')
          state.videogames.sort((a, b) => parseInt(b.rating) - parseInt(a.rating))

      else if(action.payload === 'a-z')
          state.videogames.sort((a, b) => a.name > b.name ? 1 : -1)

      else if(action.payload === 'z-a')
          state.videogames.sort((a, b) => a.name < b.name ? 1 : -1)
    }
  },
  extraReducers: builder => {
    builder.addCase(allGames.fulfilled, (state, action) => {
        state.videogames = action.payload;
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


export const { restart, restore, filter, order } = videogamesSlice.actions;
export default videogamesSlice.reducer;
