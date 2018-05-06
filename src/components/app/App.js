import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import './App.scss';
import Filter from '../filter/Filter';
import Results from '../results/Results';
import ResultsFor from './ResultsFor';
import Map from '../map/Map';
import { geocode } from '../../redux/actions/geocode';
import { getHospitals } from '../../redux/actions/hospitals';
import { haversine } from '../../utils/haversine';
import { getBounds } from '../../utils/getBounds';

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

const initialMarketWithScript = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${window.FindAHospitalSettings.GMapsAPIKey}`,
    loadingElement: <div />,
  }),
  withScriptjs,
)((props) => {
  return initialMarket(App)(props);
});


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
    this.doSearch = this.doSearch.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.geocode && nextProps.geocode.geocodeInfo) {
      return { geocodeInfo: nextProps.geocode.geocodeInfo };
    }
    return null;
  }

  componentDidMount(){
    const market = this.props.initialMarket;
    this.doSearch(market.Latitude, market.Longitude, 0);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const oldGeo = prevState.geocodeInfo;
    const newGeo = this.state.geocodeInfo;
    if (oldGeo && newGeo && oldGeo.place_id !== newGeo.place_id) {
      this.doSearch(newGeo.geometry.location.lat(), newGeo.geometry.location.lng(), 0);
    }
    if (!oldGeo && newGeo) {
      this.doSearch(newGeo.geometry.location.lat(), newGeo.geometry.location.lng(), 0);
    }
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

  doSearch(lat, lng, resultCount){
    const bounds = getBounds(lat, lng, window['FindAHospitalSettings']['MaximumRadius']);
    if (bounds) {
      this.props.dispatch(getHospitals({
        minLatitude: bounds.getNorthEast().lat(),
        maxLatitude: bounds.getSouthWest().lat(),
        minLongitude: bounds.getNorthEast().lng(),
        maxLongitude: bounds.getSouthWest().lng(),
        corpCountry: window['FindAHospitalSettings']['CorpCountry'],
        getMoreCount: window['FindAHospitalSettings']['GetMoreCount'],
        resultCount: resultCount,
        currentHospitalType: [window['FindAHospitalSettings']['HospitalTypes'][0].id]
      }));
    }

  }

  render() {

    let coordinates, addressComponents, hospitals;
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

    const hospitalsProp = this.props.hospitals;
    hospitals=[];
    if (hospitalsProp && hospitalsProp.hospitalInfo) {
      hospitals = hospitalsProp.hospitalInfo.Hospitals;
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
            <Map mapCenter={coordinates} hospitals={hospitals} />
          </div>
          <div className="listing-container">
            <Results hospitals={hospitals} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geocode, hospitals } = state;
  return {
    geocode,
    hospitals
  }
};

export default connect(mapStateToProps)(initialMarketWithScript);
