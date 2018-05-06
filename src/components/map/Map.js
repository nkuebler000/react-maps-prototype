import React, { Component } from 'react';
import './Map.scss';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';




class MapComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      hospitals:[]
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.hospitals && this.props.hospitals.length > 0) {

      const bounds = new window['google'].maps.LatLngBounds();
      this.props.hospitals.forEach(hospital => {
        bounds.extend(new window['google'].maps.LatLng(
          Number(hospital.Latitude), Number(hospital.Longitude)
        ));
      });
      this.refs.map.fitBounds(bounds);

      let isSame = true;
      if (this.props.hospitals.length !== this.state.hospitals.length) {
        isSame = false;
      }
      for (let x = 0; x < this.props.hospitals.length; x++) {
        if (!this.state.hospitals[x]) {
          isSame = false;
          break;
        }
        if (this.state.hospitals[x].Url !== this.props.hospitals[x].Url) {
          isSame = false;
          break;
        }
      }
      if (!isSame) {
        let hospitals = [];
        this.props.hospitals.forEach(hospital => {
          hospitals.push({
            Url: hospital.Url,
            iwOpen: false
          });
        });
        this.setState({hospitals});
      }
    }
  }

  render(){
    return (
      <div>
        <button className="map-view-list animated">View List</button>
        <GoogleMap
          defaultZoom={8}
          center={this.props.mapCenter}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false }}
          ref="map" >
          {this.props.hospitals.map((hospitalItem,idx) => {
            return (
              <Marker
                key={idx}
                label={{text: (idx+1).toString(), color: '#fff'}}
                icon="/Includes/_images/custom-map-pin.png"
                position={{
                  lat: Number(hospitalItem.Latitude),
                  lng: Number(hospitalItem.Longitude) }}
                onClick={() => {
                  let hospitals = this.state.hospitals;
                  hospitals.forEach(hospital => hospital.iwOpen = false);
                  hospitals[idx].iwOpen = true;
                  this.setState({ hospitals });
                }}
              >
                {this.state.hospitals[idx] && this.state.hospitals[idx].iwOpen &&
                  <InfoWindow key={idx}>
                    <div>
                      <div>{hospitalItem.Name}</div>
                      <div>{hospitalItem.AddressBlock1}</div>
                      <div>{hospitalItem.AddressBlock2} {hospitalItem.Zipcode}</div>
                      <div><a href={`tel:${hospitalItem.Phone}`}>{hospitalItem.Phone}</a></div>
                      <div>{hospitalItem.OpenStatusLabel}</div>
                    </div>
                  </InfoWindow>}
              </Marker>
            );
          })}
        </GoogleMap>
      </div>
    );
  }
}

const Map = compose(
  withProps({
    containerElement: <div className="map-container" />,
    mapElement: <div className="gm-map" />
  }),
  withGoogleMap
)(MapComponent);

export default Map;