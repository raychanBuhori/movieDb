import {
  GET_MOVIE_GENRE,
  GET_MOVIE_LIST,
  GET_MOVIE_DETAIL
} from '../action-types';

const initialState = {
  genreList: [],
  movieList: [],
  detail: {},
  currentPage: 1,
  totalPage: 1,
  totalResult: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_GENRE:
      return { ...state, genreList: action.payload }
    case GET_MOVIE_LIST:
      return {
        ...state,
        movieList: action.payload.movieList,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
        totalResult: action.payload.totalResult
      }
    case GET_MOVIE_DETAIL:
      return { ...state, detail: action.payload }
    default:
      return state;
  }
}

export default reducer;