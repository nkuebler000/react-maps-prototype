import React, { Component } from 'react';
import './Result.scss';

class Result extends Component {
  render(){
    return (
      <div className="hospital-info-block">
        <div className="marker">
          <div className="cc-marker pin-location" > <span>{this.props.idx}</span> </div>
        </div>
        <div className="locale">
          <a href="/hospital">
            <h3>Hospital Name</h3>
          </a>
          <h5><a href="tel:555-444-3333">555-444-3333</a></h5>
          <p>Hospital Address 1</p>
          <p>Hospital Address 2 Hospital Zip code</p>
        </div>
        <div className="info">
          <p className="status closed">Closed</p>
          <table className="hours">
            <tbody>
              <tr>
                <td>M-F</td>
                <td>9AM to 9PM</td>
              </tr>
            </tbody>
          </table>
          <ul className="categories" aria-hidden="true">
            <li>
              <span className="fa-badge">P</span>
            </li>
            <li>
              <span className="fa-badge">B</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Result;