import { START_GEOCODE, END_GEOCODE } from '../actions/geocode';

const geocode = (
  state={
   geocode: {
     isFetching: false
   }
  },action
) => {
  switch (action.type) {
    case START_GEOCODE:
      return Object.assign({}, state, {
        geocode: {
          isFetching: true
        }
      });
    case END_GEOCODE:
      return Object.assign({}, state, {
        geocode: {
          isFetching: false,
          geocodeInfo: action.geocodeInfo,
          status: action.status
        }
      });
    default:
      return state;
  }
};