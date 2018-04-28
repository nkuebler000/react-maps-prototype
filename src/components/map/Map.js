import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.FindAHospitalSettings.GMapsAPIKey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
);

class Map extends Component {
  render(){
    return (
      <div className="map-container">
        <button className="map-view-list animated">View List</button>
        <GMap className="gm-map"/>
      </div>
    );
  }
}

export default Map;