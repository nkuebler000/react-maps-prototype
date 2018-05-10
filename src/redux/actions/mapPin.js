export const MAP_PIN_CLICK = 'MAP_PIN_CLICK';

const mapPinClickAc = (pinIndex) => {
  return {
    type: MAP_PIN_CLICK,
    pinIndex
  }
};

const mapPinClick = mapPinClickParams => {
  return dispatch => {
    dispatch(mapPinClickAc(mapPinClickParams.index));
  };
};

export { mapPinClick };