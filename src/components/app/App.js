import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Filter from '../filter/Filter';
import Results from '../results/Results';
import ResultsFor from './ResultsFor';
import Map from '../map/Map';
import { geocode } from '../../redux/actions/geocode';
import { haversine } from '../../utils/haversine';

const initialMarket = (AppComponent) => {
  const userLat = window['FindAHospitalSettings']['UserLat'];
  const userLng = window['FindAHospitalSettings']['UserLng'];
  const majorMarkets = window['FindAHospitalSettings']['MajorMarkets'];
  let initialMarket = majorMarkets[0];
  initialMarket['distance'] = 9999;

  majorMarkets.forEach(majorMarket => {
    const distanceFromMajorMarket = haversine(userLat, userLng, majorMarket['Latitude'], majorMarket['Longitude'], 'mile');
    if (distanceFromMajorMarket < initialMarket['distance']) {
      initialMarket = majorMarket;
      initialMarket['distance'] = distanceFromMajorMarket;
    }
  });
  return props => <AppComponent {...props} initialMarket = {initialMarket} />;
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      resultsFor: '',
      geocodeInfo: null
    };

    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.geocode && nextProps.geocode.geocodeInfo) {
      return { geocodeInfo: nextProps.geocode.geocodeInfo };
    }
    return null;
  }

  searchOnSubmit(event) {
    event.preventDefault();
    this.props.dispatch(geocode({
      address: this.state.searchValue,
      componentRestrictions: {
        country: window['FindAHospitalSettings']['Country']
      }
    }));
  }

  searchOnChange(event) {
    this.setState({searchValue: event.target.value});
  }

  render() {

    let coordinates, addressComponents;
    const initialMarket = this.props.initialMarket;
    if (initialMarket) {
      coordinates = { lat: initialMarket.Latitude, lng: initialMarket.Longitude };
    }
    if (this.state.geocodeInfo) {
      const info = this.state.geocodeInfo;
      if (info.address_components) {
        addressComponents = this.state.geocodeInfo.address_components;
      }
      if (info.geometry && info.geometry.location) {
        const location = info.geometry.location;
        coordinates = { lat: location.lat(), lng: location.lng() };
      }
    }

    return (
      <div className="module">
        <header>
          <form onSubmit={this.searchOnSubmit}>
            <h1><label htmlFor="searchLocation">Find a hospital:</label>
              <p>Showing results for&nbsp;</p>
              <p className="zipcode-label"><ResultsFor addressComponents={addressComponents} initialMarket={initialMarket.Name} /></p>
            </h1>
            <div className="form-group search-group">
              <input
                name="searchLocation"
                className="form-control search"
                type="text"
                placeholder="enter address, city or postal code"
                value={this.state.searchValue}
                onChange={this.searchOnChange}
              />
              <i className="fa fa-search"></i>
            </div>
          </form>
          <div className="form-group search-group view-map">
            <button>View Map</button>
          </div>
          <div>
            <Filter/>
          </div>
        </header>
        <div className="app-container">
          <div className="app-map-container">
            <Map mapCenter={coordinates} />
          </div>
          <div className="listing-container">
            <Results/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geocode } = state;
  return {
    geocode
  }
};

export default connect(mapStateToProps)(initialMarket(App));
