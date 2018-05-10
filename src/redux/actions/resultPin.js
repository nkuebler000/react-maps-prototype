export const RESULT_PIN_CLICK = 'RESULT_PIN_CLICK';

const resultPinClickAc = (pinIndex) => {
  return {
    type: RESULT_PIN_CLICK,
    pinIndex
  }
};

const resultPinClick = resultPinClickParams => {
  return dispatch => {
    dispatch(resultPinClickAc(resultPinClickParams.index));
  };
};

export { resultPinClick };