
const getBounds = (lat,lng,radius) => {
  const circleData = {
    center: { lat, lng },
    radius: radius * 1609.34
  };

  if (window['google']) {
    return new window['google'].maps.Circle(circleData).getBounds();
  }

};

export { getBounds };