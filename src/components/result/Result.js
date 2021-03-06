import React, { Component } from 'react';
import Hours from './Hours';
import HospitalTypes from './HospitalTypes';
import './Result.scss';
import { resultPinClick } from '../../redux/actions/resultPin';

class Result extends Component {
  render(){
    const hospital = this.props.hospital;
    return (
      <div className={`hospital-info-block hospital-info-block${this.props.idx}`}>
        <div className="marker">
          <div className="cc-marker pin-location" onClick={()=>{
            this.props.dispatch(resultPinClick({index: this.props.idx}));
          }}> <span>{this.props.idx}</span> </div>
        </div>
        <div className="locale">
          <a href={hospital.Url}>
            <h3>{hospital.Name}</h3>
          </a>
          <h5><a href={`tel:${hospital.Phone}`}>{hospital.Phone}</a></h5>
          <p>{hospital.AddressBlock1}</p>
          <p>{hospital.AddressBlock2} {hospital.Zipcode}</p>
        </div>
        <div className="info">
          <p className="status closed">{hospital.OpenStatusLabel}</p>
          <Hours hours={hospital.HoursOfOperation}/>
          <HospitalTypes types={hospital.HospitalTypesForDisplay} />
        </div>
      </div>
    );
  }
}


export default Result;