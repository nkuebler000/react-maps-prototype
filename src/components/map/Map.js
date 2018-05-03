import React, { Component } from 'react';
import './Map.scss';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.FindAHospitalSettings.GMapsAPIKey}`,
    loadingElement: <div />,
    containerElement: <div className="gm-map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }} >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
);

class Map extends Component {
  render(){
    return (
      <div className="map-container">
        <button className="map-view-list animated">View List</button>
        <GMap />
      </div>
    );
  }
}

export default Map;