export const START_GET_HOSPITALS = 'START_GET_HOSPITALS';
export const END_GET_HOSPITALS = 'END_GET_HOSPITALS';

const startGetHospitals = () => {
  return {
    type: START_GET_HOSPITALS
  }
};

const endGetHospitals = (geocodeInfo, status) => {
  return {
    type: END_GET_HOSPITALS,
    geocodeInfo,
    status
  }
};


const getHospitals = (params) => {
  return dispatch => {
    dispatch(startGetHospitals());

    let formData = new FormData();
    formData.append('MinLatitude', params.minLatitude);
    formData.append('MaxLatitude', params.maxLatitude);
    formData.append('MinLongitude', params.minLongitude);
    formData.append('MaxLongitude', params.maxLongitude);
    formData.append('CorpCountry', params.corpCountry);
    formData.append('GetMoreCount', params.getMoreCount);
    formData.append('ResultCount', params.resultCount);
    for (let x = 0; x < params.currentHospitalType.length; x++) {
      formData.set(`CurrentHospitalType[${x}]`, params.currentHospitalType[x]);
    }

    return fetch('/api/Search/HospitalSearch/GetHospitals', {
      body: formData,
      method: 'POST'
    }).then(response => response.json())
      .then(json => dispatch(endGetHospitals(json)));
  };
};

export default getHospitals;