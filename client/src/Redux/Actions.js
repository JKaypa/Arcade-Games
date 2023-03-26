import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const ALL_GAMES = "ALL_GAMES";
export const GAME_BY_ID = "GAME_BY_ID";
export const CRETATE_GAME = "CREATE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const RESTART = "RESTART";
export const RESTORE = "RESTORE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";


export const allGames = (name = "") => {
  return async function (dispatch) {
    const { data } = await axios(`/videogames?name=${name}`);
    dispatch({ type: ALL_GAMES, payload: data });
  };
};

export const gameById = (id) => {
  return async function (dispatch) {
    const { data } = await axios(`/videogames/${id}`);
    dispatch({ type: GAME_BY_ID, payload: data });
  };
};

export const createGame = (game) => {
  return async function (dispatch) {
    try {
      const {data} = await axios.post("/videogames", game);
      dispatch({ type: CRETATE_GAME, payload: data });
    } catch ({response}) {
      dispatch({ type: CRETATE_GAME, payload: response.data.error });
      console.log(response.data.error)
    }
  };
};

export const updateGame = (id, game) => {
  return async function (dispatch) {
    const { data } = await axios.put(`/videogames/${id}`, game);
    dispatch({ type: UPDATE_GAME, payload: data });
  };
};

export const deleteGame = (id) => {
  return async function (dispatch) {
    const { data } = await axios.delete(`/videogames/${id}`);
    dispatch({ type: DELETE_GAME, payload: data });
  };
};

export const restart = () => {
  return function (dispatch) {
    dispatch({ type: RESTART });
  };
};

export const restore = () => {
  return function (dispatch) {
    dispatch({ type: RESTORE, payload: "" });
  };
};

export const filter = (options) => {
  return function (dispatch) {
    dispatch({ type: FILTER, payload: options });
  };
};

export const order = (order) => {
  return function (dispatch) {
    dispatch({ type: ORDER, payload: order });
  };
};

