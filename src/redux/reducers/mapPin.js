import { MAP_PIN_CLICK } from '../actions/mapPin';

const mapPin = (
  state={},action
) => {
  switch (action.type) {
    case MAP_PIN_CLICK:
      return Object.assign({}, state, {
        index: action.pinIndex
      });

    default:
      return state;
  }
};

export default mapPin;