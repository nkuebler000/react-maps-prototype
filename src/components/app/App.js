import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import './App.scss';
import FilterItem from '../filter/FilterItem';
import Result from '../result/Result';
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
    const isMobileBreakpoint = window.matchMedia('(max-width: 768px)');
    this.state = {
      searchValue: '',
      resultsFor: '',
      geocodeInfo: null,
      selectedFilters: [ window['FindAHospitalSettings']['AllHospitalsType'] ],
      clientHeight: { top: isMobileBreakpoint.matches ? `${document.documentElement.clientHeight+100}px` : 0 }
    };

    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
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

    //dispatch search action when the location changes
    const oldGeo = prevState.geocodeInfo;
    const newGeo = this.state.geocodeInfo;
    if (oldGeo && newGeo && oldGeo.place_id !== newGeo.place_id) {
      this.doSearch(newGeo.geometry.location.lat(), newGeo.geometry.location.lng(), 0);
    }
    if (!oldGeo && newGeo) {
      this.doSearch(newGeo.geometry.location.lat(), newGeo.geometry.location.lng(), 0);
    }

    //dispatch search action when the filters change
    const coordinates = this.getCurrentCoordinates();
    const newFilters = this.state.selectedFilters;
    const oldFilters = prevState.selectedFilters;
    if (newFilters.length !== oldFilters.length) {
      this.doSearch(coordinates.lat, coordinates.lng, 0);
    }
    if (newFilters.length === oldFilters.length && newFilters[0] !== oldFilters[0]) {
      this.doSearch(coordinates.lat, coordinates.lng, 0);
    }

    //scroll the hospital into view whose pin was clicked on the map
    const newMapPin = this.props.mapPin.index;
    const oldMapPin = prevProps.mapPin.index;
    if (newMapPin !== oldMapPin) {
      let hospitalInfoBlocks = document.getElementsByClassName(`hospital-info-block${newMapPin}`);
      if (hospitalInfoBlocks.length) {
        hospitalInfoBlocks[0].scrollIntoView({
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }

    const oldResultPin = this.props.resultPin.index;
    const newResultPin = prevProps.resultPin.index;
    const isMobileBreakpoint = window.matchMedia('(max-width: 768px)');
    if ((newResultPin !== oldResultPin) && isMobileBreakpoint) {
      this.setState({
        clientHeight: { top: `0px` }
      });
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

  getCurrentCoordinates() {
    let coordinates;
    const initialMarket = this.props.initialMarket;
    if (initialMarket) {
      coordinates = { lat: initialMarket.Latitude, lng: initialMarket.Longitude };
    }
    if (this.state.geocodeInfo) {
      const info = this.state.geocodeInfo;
      if (info.geometry && info.geometry.location) {
        const location = info.geometry.location;
        coordinates = { lat: location.lat(), lng: location.lng() };
      }
    }
    return coordinates;
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
        currentHospitalType: this.state.selectedFilters
      }));
    }
  }

  render() {

    let coordinates, addressComponents, hospitals;
    coordinates = this.getCurrentCoordinates();

    if (this.state.geocodeInfo) {
      const info = this.state.geocodeInfo;
      if (info.address_components) {
        addressComponents = this.state.geocodeInfo.address_components;
      }
    }

    const filterItems = window['FindAHospitalSettings']['HospitalTypes'];

    const hospitalsProp = this.props.hospitals;
    let totalResults = 0;
    hospitals=[];
    if (hospitalsProp && hospitalsProp.hospitalInfo) {
      hospitals = hospitalsProp.hospitalInfo.Hospitals;
      totalResults = hospitalsProp.hospitalInfo.TotalResults;
    }

    return (
      <div className="module">
        <header>
          <form onSubmit={this.searchOnSubmit}>
            <h1><label htmlFor="searchLocation">Find a hospital:</label>
              <p>Showing results for&nbsp;</p>
              <p className="zipcode-label"><ResultsFor addressComponents={addressComponents} initialMarket={this.props.initialMarket.Name} /></p>
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
            <button onClick={()=>{
              this.setState({
                clientHeight: { top: `0px` }
              });
            }}>View Map</button>
          </div>
          <div>
            <div className="fa-tabs">
              <ul className="nav nav-tabs" role="tablist">
                {filterItems.map((filterItem, idx) => {
                  return <FilterItem filter={filterItem} key={idx} selectedFilters={this.state.selectedFilters} onClick={(item)=>{

                    //when selecting the all hospitals filter deselect all the other filters
                    const allHospitalsId = window['FindAHospitalSettings']['AllHospitalsType'];
                    if (item.id === allHospitalsId) {
                      this.setState({
                        selectedFilters: [allHospitalsId]
                      });
                      return;
                    }

                    let filters = [].concat(this.state.selectedFilters);

                    if (item.id !== allHospitalsId) {
                      const allHospitalsIndex = filters.indexOf(allHospitalsId);
                      if (allHospitalsIndex !== -1) {
                        filters.splice(allHospitalsIndex, 1);
                      }
                    }

                    const index = filters.indexOf(item.id);
                    if (index === -1) {
                      filters.push(item.id);
                    } else {
                      if (filters.length !== 1) {
                        filters.splice(index, 1);
                      }
                    }

                    this.setState({
                      selectedFilters: filters
                    });
                    
                  }} />
                })}
              </ul>
            </div>
          </div>
        </header>
        <div className="app-container">
          <div className="app-map-container">
            <Map
              mapCenter={coordinates}
              hospitals={hospitals}
              resultPinClickedIndex={this.props.resultPin.index}
              dispatch={this.props.dispatch}
              clientHeight={this.state.clientHeight}
              onViewListClick={()=>{
                this.setState({
                  clientHeight: { top: `${document.documentElement.clientHeight+100}px` }
                });
              }}
            />
          </div>
          <div className="listing-container">
            <div className="tab-content" aria-live="polite">
              <div role="tabpanel" className="tab-pane fade active in" id="fah-tabpanel0">
                <div className="location-list">
                  {hospitals.map((item,idx)=>{
                      return <Result key={idx} idx={idx+1} hospital={item} dispatch={this.props.dispatch} />;
                    })}
                  <div className="load-more">
                    {hospitals.length < totalResults && <a href="#" onClick={(event) => {
                      event.preventDefault();
                      this.doSearch(coordinates.lat, coordinates.lng, hospitals.length);
                    }}>Load More +</a> }
                  </div>
                  {hospitals.length === 0 && <div className="no-results">No results were found. Please try another location.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geocode, hospitals, resultPin, mapPin } = state;
  return {
    geocode,
    hospitals,
    resultPin,
    mapPin
  }
};

export default connect(mapStateToProps)(initialMarketWithScript);
