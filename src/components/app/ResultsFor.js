
const ResultsFor = (props) => {
  let locality, administrative_area_level_1, country, postal_code;
  if (props.addressComponents) {
    props.addressComponents.forEach(addressComponent => {
      addressComponent.types.forEach(typeElement => {
        if (typeElement === 'locality') {
          locality = addressComponent.long_name;
        }
        if (typeElement === 'administrative_area_level_1') {
          administrative_area_level_1 = addressComponent.short_name;
        }
        if (typeElement === 'country') {
          country = addressComponent.long_name;
        }
        if (typeElement === 'postal_code') {
          postal_code = addressComponent.long_name;
        }
      });
    });
  }
  let components = [];
  if (locality) components.push(locality);
  if (administrative_area_level_1) components.push(administrative_area_level_1);
  if (postal_code) components.push(postal_code);
  if (country) components.push(country);

  return components.join(', ') || props.initialMarket;
};

export default ResultsFor;