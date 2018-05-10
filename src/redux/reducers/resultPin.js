import { RESULT_PIN_CLICK } from '../actions/resultPin';

const resultPin = (
  state={},action
) => {
  switch (action.type) {
    case RESULT_PIN_CLICK:
      return Object.assign({}, state, {
        index: action.pinIndex
      });

    default:
      return state;
  }
};

export default resultPin;