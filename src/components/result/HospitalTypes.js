import React, { Component } from 'react';

class HospitalTypes extends Component {
  render() {
    return (
      <ul className="categories" aria-hidden="true">
        {this.props.types.map((typesItem,idx) => {
          return (
            <li key={idx}>
              <span className="fa-badge">{typesItem.DisplayValue}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default HospitalTypes;