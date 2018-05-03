import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Filter from '../filter/Filter';
import Results from '../results/Results';
import Map from '../map/Map';
import { geocode } from '../../redux/actions/geocode';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ''};

    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  componentWillMount() {

  }

  searchOnSubmit(event) {
    event.preventDefault();
    console.log('searchOnSubmit', this.state.searchValue);
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
    return (
      <div className="module">
        <header>
          <form onSubmit={this.searchOnSubmit}>
            <h1><label htmlFor="searchLocation">Find a hospital:</label>
              <p>Showing results for </p>
              <p className="zipcode-label"></p>
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
            <Map/>
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

export default connect(mapStateToProps)(App);
