import { START_GET_HOSPITALS, END_GET_HOSPITALS } from '../actions/hospitals';

const hospitals = (
  state={
    isFetching: false
  },action
) => {
  switch (action.type) {
    case START_GET_HOSPITALS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case END_GET_HOSPITALS:
      console.log('END_GET_HOSPITALS', action);
      return Object.assign({}, state, {
        isFetching: false,
        hospitalInfo: action.hospitalInfo
      });
    default:
      return state;
  }
};

export default hospitals;