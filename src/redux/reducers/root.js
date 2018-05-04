import { combineReducers } from 'redux';
import geocode from './geocode';
import hospitals from './hospitals';

const rootReducer = combineReducers({
  geocode,
  hospitals
});

export default rootReducer;