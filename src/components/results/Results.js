import React, { Component } from 'react';
import './Results.scss';
import Result from '../result/Result';

class Results extends Component {
  render(){

    let results = [];
    for (let x = 1; x < 8; x++) {
      results.push(<Result key={x} idx={x}/>);
    }

    return(
      <div className="tab-content" aria-live="polite">
        <div role="tabpanel" className="tab-pane fade active in" id="fah-tabpanel0">
          <div className="location-list">
            {results}

            <div className="load-more">
              <a href="#">Load More +</a>
            </div>
            <div className="no-results">No results were found. Please try another location.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;