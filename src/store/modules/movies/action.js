import {
  GET_MOVIE_GENRE,
  GET_MOVIE_LIST,
  GET_MOVIE_DETAIL
} from '../action-types';
import movieDbAPI from 'utils/movieDbApi';

export const getGenreList = () => async dispatch => {
  await movieDbAPI({
    method: 'GET',
    url: 'genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49'
  }).then(resp => {
    const { data } = resp;
    dispatch({ type: GET_MOVIE_GENRE, payload: data.genres });
  }).catch(err => {
    console.log(err);
  })
}

export const getMovieList = (page = 1) => async dispatch => {
  await movieDbAPI({
    method: 'GET',
    url: `movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49&page=${page}`
  }).then(resp => {
    const { data } = resp;
    dispatch({ type: GET_MOVIE_LIST, payload: { movieList: data.results, currentPage: data.page, totalPage: data.total_pages, totalResult: data.total_results } });
  }).catch(err => {
    console.log(err);
  })
}

export const getMovieDetail = id => async dispatch => {
  await movieDbAPI({
    method: 'GET',
    url: `movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`
  }).then(resp => {
    const { data } = resp;
    dispatch({ type: GET_MOVIE_DETAIL, payload: data });
  }).catch(err => {
    console.log(err);
  })
}
