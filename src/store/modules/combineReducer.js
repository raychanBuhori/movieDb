import { combineReducers } from 'redux';

import currentReducer from './currentValue/reducer';
import movieReducer from './movies/reducer';

const reducer = combineReducers({
	current: currentReducer,
	movie: movieReducer
});

export default reducer;
