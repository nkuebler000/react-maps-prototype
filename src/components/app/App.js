import React, { Component } from 'react';
import './App.scss';
import Filter from '../filter/Filter';
import Results from '../results/Results';
import Map from '../map/Map';

class App extends Component {
  render() {
    return (
      <div className="module">
        <header>
        <form>
             <h1><label htmlFor="searchLocation">Find a hospital:</label>
               <p>Showing results for </p>
               <p className="zipcode-label"></p>
             </h1>
             <div className="form-group search-group">
               <input name="searchLocation" className="form-control search" type="text" placeholder="enter address, city or postal code" />
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

export default App;
