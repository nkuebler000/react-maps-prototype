import React, { Component } from 'react';
import FilterItem from './FilterItem';
import './Filter.scss';

class Filter extends Component {
  render() {

    const filterItems = window['FindAHospitalSettings']['HospitalTypes'];
    let filters = [];
    filterItems.forEach(filterItem => filters.push(<FilterItem filter={filterItem} />));

    return (
      <div className="fa-tabs">
        <ul className="nav nav-tabs" role="tablist">

          {filters}

        </ul>
      </div>
    );
  }
}

export default Filter;