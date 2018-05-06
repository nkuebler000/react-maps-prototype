import React, { Component } from 'react';
import './Results.scss';
import Result from '../result/Result';

class Results extends Component {
  render(){

    let results = [];

    if (this.props.hospitals) {
      this.props.hospitals.forEach((item,idx)=>{
        results.push(<Result key={idx} idx={idx+1} hospital={item} />);
      });
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