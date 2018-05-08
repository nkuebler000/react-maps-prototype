import React, { Component } from 'react';

class FilterItem extends Component {
  render(){
    const filter = this.props.filter;
    return (
      <li role="presentation">
        <a href="#" className="trigger-click" role="tab" aria-expanded="true" onClick={this.props.onClick}>
          <span className="fa-badge" aria-hidden="true" role="presentation">{filter.badge}</span>
          <span className="fa-text">{filter.text}</span>
        </a>
      </li>
    );
  }
}


export default FilterItem;