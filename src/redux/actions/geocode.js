export const START_GEOCODE = 'START_GEOCODE';
export const END_GEOCODE = 'END_GEOCODE';

const startGeocode = () => {
  return {
    type: START_GEOCODE
  }
};

const endGeocode = (geocodeInfo, status) => {
  return {
    type: END_GEOCODE,
    geocodeInfo,
    status
  }
};

const geocode = geocodeParams => {

  return dispatch => {
    dispatch(startGeocode());
    const google = window['google'];
    if (google) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(geocodeParams, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const place = results[0];
          dispatch(endGeocode(place, 'SUCCESS'));
        } else {
          if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
            dispatch(endGeocode(null, 'ZERO_RESULTS'));
          }else {
            dispatch(endGeocode(null, status));
          }
        }
      });
    }
  };
};

export { geocode };

