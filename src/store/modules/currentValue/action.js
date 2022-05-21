import {
  SET_CURRENT_MOVIE,
  SET_CURRENT_KEY
} from '../action-types';

export const setCurrentMovie = id => async dispatch => {
  return dispatch({ type: SET_CURRENT_MOVIE, payload: id });
}

export const setCurrentKey = id => async dispatch => {
  return dispatch({ type: SET_CURRENT_KEY, payload: id });
}