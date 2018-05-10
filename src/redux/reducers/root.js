import { combineReducers } from 'redux';
import geocode from './geocode';
import hospitals from './hospitals';
import resultPin from './resultPin';

const rootReducer = combineReducers({
  geocode,
  hospitals,
  resultPin
});

export default rootReducer;