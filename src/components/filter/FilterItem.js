import React, { Component } from 'react';

class FilterItem extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event){
    event.preventDefault();
    this.props.onClick(this.props.filter);
  }

  render(){
    const filter = this.props.filter;
    return (
      <li role="presentation" className={this.props.selectedFilters.indexOf(this.props.filter.id) > -1 ? "active" : ""}>
        <a href="#" className="trigger-click" role="tab" aria-expanded="true" onClick={this.onClick}>
          <span className="fa-badge" aria-hidden="true" role="presentation">{filter.badge}</span>
          <span className="fa-text">{filter.text}</span>
        </a>
      </li>
    );
  }
}


export default FilterItem;