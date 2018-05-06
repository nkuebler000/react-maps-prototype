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
      if (action.resultCount === 0) {
        return Object.assign({}, state, {
          isFetching: false,
          hospitalInfo: action.hospitalInfo
        });
      } else {

        let hospitalInfo = state.hospitalInfo;
        hospitalInfo.Hospitals = hospitalInfo.Hospitals.concat(action.hospitalInfo.Hospitals);

        let stateUpdate = {
          isFetching: false,
          hospitalInfo: hospitalInfo
        };

        return Object.assign({}, state, stateUpdate);
      }
    default:
      return state;
  }
};

export default hospitals;