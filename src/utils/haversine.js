
const toRad = (num) => {
  return num * Math.PI / 180;
};

const haversine = (startLat,startLng,endLat,endLng,unit)=>{
  const radii = {
    km: 6371,
    mile: 3960,
    meter: 6371000
  }

  let R = radii.km;
  if (unit) {
    R = radii[unit];
  }

  let dLat = toRad(endLat - startLat);
  let dLon = toRad(endLng - startLng);
  let lat1 = toRad(startLat);
  let lat2 = toRad(endLat);

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c;
};

export  { haversine };