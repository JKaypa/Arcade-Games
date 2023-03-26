import {
  ALL_GAMES,
  CRETATE_GAME,
  DELETE_GAME,
  FILTER,
  GAME_BY_ID,
  ORDER,
  RESTART,
  RESTORE,
  UPDATE_GAME,
} from "./Actions";

const initState = {
  videogames: [],
  videogamesBackUp: [],
  videogameDetail: {},
  message: "",
};

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ALL_GAMES:
      return {
        ...state,
        videogames: [...payload],
        videogamesBackUp: [...payload],
      };
    case GAME_BY_ID:
      return {
        ...state,
        videogameDetail: payload,
      };
    case CRETATE_GAME:
      return {
        ...state,
        message: payload,
      };
    case UPDATE_GAME:
      return {
        ...state,
        message: payload,
      };
    case DELETE_GAME:
      return {
        ...state,
        message: payload,
      };
    case RESTART:
      return {
        ...state,
        videogameDetail: {},
      };
    case RESTORE:
      return {
        ...state,
        message: "",
      };
    case FILTER:
      if (payload.value === "All") {
        return {
          ...state,
          videogames: state.videogamesBackUp,
        };
      } else if (payload.name === "genres" || payload.name === "platforms") {
        const game = state.videogamesBackUp.filter((game) =>
          game[payload.name].find((name) => name === payload.value)
        );
        if (!game.length) {
          return {
            ...state,
            videogames: [],
          };
        } else {
          return { ...state, videogames: game};
        }
      } else if (payload.value === "database") {
        return {
          ...state,
          videogames: state.videogamesBackUp.filter((game) =>
            uuidRegex.test(game.id)
          ),
        };
      } else if (payload.value === "api") {
        return {
          ...state,
          videogames: state.videogamesBackUp.filter(
            (game) => !uuidRegex.test(game.id)
          ),
        };
      }
    case ORDER:
      if (payload === "ascending") {
        return {
          ...state,
          videogames: state.videogames.sort((a, b) => a.rating - b.rating),
        };
      } else if (payload === "descending") {
        return {
          ...state,
          videogames: state.videogames.sort((a, b) => b.rating - a.rating),
        };
      } else if (payload === "a-z") {
        return {
          ...state,
          videogames: state.videogames.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          }),
        };
      } else if (payload === "z-a") {
        return {
          ...state,
          videogames: state.videogames.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
          }),
        };
      }
    default:
      return state;
  }
};

export default reducer;
