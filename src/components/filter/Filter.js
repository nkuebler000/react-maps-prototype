import React, { Component } from 'react';
import './Filter.scss';

class Filter extends Component {
  render() {
    return (
      <div className="fa-tabs">
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation">
            <a href="#" className="trigger-click" role="tab" aria-expanded="true">
              <span className="fa-badge" aria-hidden="true" role="presentation">A</span>
              <span className="fa-text">All Hospitals</span>
            </a>
          </li>
          <li role="presentation">
            <a href="#" className="trigger-click" role="tab" aria-expanded="true">
              <span className="fa-badge" aria-hidden="true" role="presentation">A</span>
              <span className="fa-text">All Hospitals</span>
            </a>
          </li>
          <li role="presentation">
            <a href="#" className="trigger-click" role="tab" aria-expanded="true">
              <span className="fa-badge" aria-hidden="true" role="presentation">A</span>
              <span className="fa-text">All Hospitals</span>
            </a>
          </li>
          <li role="presentation">
            <a href="#" className="trigger-click" role="tab" aria-expanded="true">
              <span className="fa-badge" aria-hidden="true" role="presentation">A</span>
              <span className="fa-text">All Hospitals</span>
            </a>
          </li>
          <li role="presentation">
            <a href="#" className="trigger-click" role="tab" aria-expanded="true">
              <span className="fa-badge" aria-hidden="true" role="presentation">A</span>
              <span className="fa-text">All Hospitals</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Filter;