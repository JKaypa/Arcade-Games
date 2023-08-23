import { createAsyncThunk } from "@reduxjs/toolkit"
import { Videogame } from "../types"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/videogames";

export const allGames = createAsyncThunk('get/videogames', async({name = '', genre = '', platform = '', page = 1}: {name?: string, genre?: string, platform?: string, page?: number}, thunkApi) => {
  try {
    const {data} = await axios<{rows: Videogame[]}>(`/?name=${name}&genre=${genre}&platform=${platform}&page=${page}`)
    return data.rows
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const gameById = createAsyncThunk('getById/videogames', async(id: string, thunkApi) => {
  try {
    const {data} = await axios<Videogame>(`/${id}`)
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const createGame = createAsyncThunk('create/videogames', async(game: FormData, thunkApi) => {
  try {
    const {data} = await axios.post<string>('/', game)
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const updateGame = createAsyncThunk('update/videogames', async({id, game}: {id: string, game: FormData}, thunkApi) => {
  try {
    const {data} = await axios.put<string>(`/${id}`, game)
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const deleteGame = createAsyncThunk('delete/videogames', async(id: string, thunkApi) => {
  try {
    const {data} = await axios.delete<string>(`/${id}`)
    return data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})