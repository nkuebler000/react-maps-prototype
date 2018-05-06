import { searchParams } from '../../utils/searchParams';

export const START_GET_HOSPITALS = 'START_GET_HOSPITALS';
export const END_GET_HOSPITALS = 'END_GET_HOSPITALS';

const startGetHospitals = () => {
  return {
    type: START_GET_HOSPITALS
  }
};

const endGetHospitals = (hospitalInfo) => {
  return {
    type: END_GET_HOSPITALS,
    hospitalInfo
  }
};


const getHospitals = (params) => {
  return dispatch => {
    dispatch(startGetHospitals());

    let formData = {
      MinLatitude: params.minLatitude,
      MaxLatitude: params.maxLatitude,
      MinLongitude: params.minLongitude,
      MaxLongitude: params.maxLongitude,
      CorpCountry: params.corpCountry,
      GetMoreCount: params.getMoreCount,
      ResultCount: params.resultCount
    };
    for (let x = 0; x < params.currentHospitalType.length; x++) {
      formData[`CurrentHospitalType[${x}]`] = params.currentHospitalType[x];
    }

    return fetch('/api/Search/HospitalSearch/GetHospitals', {
      body: searchParams(formData),
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    }).then(response => response.json())
      .then(json => dispatch(endGetHospitals(json)));
  };
};

export { getHospitals };