import { combineReducers } from 'redux';
import geocode from './geocode';
import hospitals from './hospitals';
import resultPin from './resultPin';
import mapPin from './mapPin';

const rootReducer = combineReducers({
  geocode,
  hospitals,
  resultPin,
  mapPin
});

export default rootReducer;