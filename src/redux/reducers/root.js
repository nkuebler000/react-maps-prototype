import { combineReducers } from 'redux';
import geocode from './geocode';

const rootReducer = combineReducers({
  geocode
});

export default rootReducer;